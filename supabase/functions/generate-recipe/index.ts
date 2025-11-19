import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients, cuisine, preference, mode, foodName } = await req.json();
    console.log('Received request:', { ingredients, cuisine, preference, mode, foodName });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Determine which cuisines to generate
    const cuisines = cuisine === 'auto' 
      ? ['north', 'south'] 
      : [cuisine];

    // Determine which dietary preferences to generate
    const preferences = preference === 'both' 
      ? ['veg', 'non-veg'] 
      : [preference];

    // Generate all combinations
    const recipesToGenerate: Array<{ cuisine: string; preference: string }> = [];
    for (const c of cuisines) {
      for (const p of preferences) {
        recipesToGenerate.push({ cuisine: c, preference: p });
      }
    }

    const systemPrompt = `You are an expert Indian chef specializing in both North and South Indian cuisine. Generate a detailed recipe with:
1. A creative and authentic recipe title
2. The regional style (North Indian Style or South Indian Style)
3. Detailed step-by-step cooking instructions (at least 6-8 steps)
4. Accurate nutrition information (calories, protein, fat, carbs)
5. A healthiness assessment

Return the response as a JSON object with this exact structure:
{
  "title": "Recipe Name",
  "region": "North Indian Style" or "South Indian Style",
  "instructions": ["step 1", "step 2", ...],
  "nutrition": {
    "calories": number,
    "protein": number,
    "fat": number,
    "carbs": number
  },
  "healthiness": "description of healthiness"
}`;

    const recipes = [];

    // Generate each recipe with retry logic
    for (const config of recipesToGenerate) {
      const cuisineStyle = config.cuisine === 'north' ? 'North Indian' : 'South Indian';
      const dietaryPref = config.preference === 'veg' ? 'vegetarian' : 'non-vegetarian';

      let userPrompt = '';
      if (mode === 'food' && foodName) {
        userPrompt = `Generate a detailed ${dietaryPref} recipe for ${foodName} in ${cuisineStyle} style. IMPORTANT: The recipe MUST be strictly ${dietaryPref} with NO ${config.preference === 'veg' ? 'meat, chicken, fish, or eggs' : 'restriction on meat'}.`;
      } else {
        userPrompt = `Generate a detailed ${dietaryPref} recipe using these ingredients: ${ingredients}. Make it ${cuisineStyle} style. IMPORTANT: The recipe MUST be strictly ${dietaryPref} with NO ${config.preference === 'veg' ? 'meat, chicken, fish, or eggs' : 'restriction on meat'}.`;
      }

      // Retry logic for transient failures
      let response;
      let lastError;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${LOVABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
              ],
              response_format: { type: "json_object" }
            }),
          });

          // If successful or specific error, break retry loop
          if (response.ok || response.status === 429 || response.status === 402) {
            break;
          }

          lastError = `AI Gateway returned ${response.status}`;
          console.log(`Attempt ${attempt} failed with status ${response.status}, retrying...`);
          
          // Wait before retry (exponential backoff)
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        } catch (e) {
          lastError = e instanceof Error ? e.message : 'Network error';
          console.error(`Attempt ${attempt} failed:`, lastError);
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
      }

      if (!response) {
        console.error('All retry attempts failed:', lastError);
        return new Response(
          JSON.stringify({ 
            error: 'AI service temporarily unavailable. Please try again in a moment.' 
          }), 
          {
            status: 503,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      if (!response.ok) {
        if (response.status === 429) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        if (response.status === 402) {
          return new Response(JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }), {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const errorText = await response.text().catch(() => 'Unable to read error');
        console.error('AI Gateway error after retries:', response.status, errorText);
        
        return new Response(
          JSON.stringify({ 
            error: response.status === 500 
              ? 'AI service temporarily unavailable. Please try again in a moment.' 
              : `AI service error (${response.status}). Please try again.` 
          }), 
          {
            status: response.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      const data = await response.json();
      console.log(`AI response received for ${cuisineStyle} ${dietaryPref}`);

      // Robustly parse JSON content and normalize fields
      let content: unknown = data?.choices?.[0]?.message?.content;
      if (typeof content !== 'string') {
        try {
          content = JSON.stringify(content);
        } catch {
          content = '';
        }
      }

      let cleaned = (content as string).trim();
      if (cleaned.startsWith('```')) {
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start !== -1 && end !== -1) cleaned = cleaned.slice(start, end + 1);
      }

      let parsed: any = {};
      try {
        parsed = JSON.parse(cleaned);
      } catch (e) {
        console.error('Failed to parse JSON content, using fallback. Raw:', cleaned);
        parsed = {};
      }

      const recipe = {
        title: typeof parsed.title === 'string' && parsed.title.trim() ? parsed.title : (foodName ? `${foodName} (AI Recipe)` : 'AI Recipe'),
        region: cuisineStyle + ' Style',
        instructions: Array.isArray(parsed.instructions)
          ? parsed.instructions.filter((s: unknown) => typeof s === 'string' && s.trim()).slice(0, 20)
          : ['Prepare ingredients', 'Cook as appropriate', 'Season and serve'],
        nutrition: {
          calories: Math.max(0, Math.round(Number(parsed?.nutrition?.calories) || 0)),
          protein: Math.max(0, Math.round(Number(parsed?.nutrition?.protein) || 0)),
          fat: Math.max(0, Math.round(Number(parsed?.nutrition?.fat) || 0)),
          carbs: Math.max(0, Math.round(Number(parsed?.nutrition?.carbs) || 0)),
        },
        healthiness: typeof parsed.healthiness === 'string' && parsed.healthiness.trim() ? parsed.healthiness : 'Moderate - Balanced nutrition',
        dietary: dietaryPref,
      };

      recipes.push(recipe);
    }

    return new Response(JSON.stringify({ recipes }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
