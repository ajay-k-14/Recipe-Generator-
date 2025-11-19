import { useState } from "react";
import { RecipeForm } from "@/components/RecipeForm";
import { RecipeCard } from "@/components/RecipeCard";
import { toast } from "@/hooks/use-toast";
import { UtensilsCrossed } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Recipe {
  title: string;
  region: string;
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  healthiness: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const handleGenerate = async (ingredients: string, cuisine: string, preference: string, mode: string, foodName?: string) => {
    setIsLoading(true);
    setRecipes([]);

    try {
      const { data, error } = await supabase.functions.invoke('generate-recipe', {
        body: {
          ingredients,
          cuisine,
          preference,
          mode,
          foodName
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate recipe');
      }

      // Support both new { recipes: [...] } and older { recipe: {...} } response shapes
      const recipesData = Array.isArray(data.recipes)
        ? data.recipes
        : data.recipe
        ? [data.recipe]
        : null;

      if (!recipesData) {
        throw new Error('No recipe data received');
      }

      // Save all recipes to database
      for (const recipe of recipesData) {
        const { error: insertError } = await supabase
          .from('recipes')
          .insert({
            title: recipe.title,
            region: recipe.region,
            instructions: recipe.instructions,
            nutrition: recipe.nutrition,
            healthiness: recipe.healthiness,
            ingredients,
            cuisine,
            preference
          });

        if (insertError) {
          console.error('Error saving recipe:', insertError);
        }
      }

      setRecipes(recipesData);
      
      toast({
        title: `${recipesData.length} Recipe${recipesData.length > 1 ? 's' : ''} Generated!`,
        description: 'Your AI-powered recipes are ready and saved.',
      });
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-sky-100 text-black py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <UtensilsCrossed className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">Recipe Generator</h1>
          <h2 className="text-2xl font-medium mb-2">Smart Indian Recipes — North & South</h2>

          <p className="text-lg text-black/90 max-w-2xl mx-auto">
            Transform your ingredients into authentic North and South Indian recipes with AI-powered nutrition insights
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <RecipeForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-2">
            {recipes.length === 0 && !isLoading && (
              <div className="bg-card rounded-2xl p-12 text-center shadow-[var(--shadow-card)]">
                <div className="bg-muted/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UtensilsCrossed className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Ready to Cook?</h3>
                <p className="text-muted-foreground text-lg">
                  Enter your ingredients and let AI create delicious Indian recipes tailored to your preferences
                </p>
              </div>
            )}

            {isLoading && (
              <div className="bg-card rounded-2xl p-12 text-center shadow-[var(--shadow-card)]">
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
                  <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
                  <div className="h-32 bg-muted rounded" />
                </div>
              </div>
            )}

            <div className="space-y-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} {...recipe} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-sky-100 border-t border-border mt-20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>• Nutrition estimates are approximate • Always consult professionals for dietary advice •</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
