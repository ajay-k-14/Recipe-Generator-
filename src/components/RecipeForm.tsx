import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, Loader2 } from "lucide-react";

interface RecipeFormProps {
  onGenerate: (ingredients: string, cuisine: string, preference: string, mode: string, foodName?: string) => void;
  isLoading: boolean;
}

export const RecipeForm = ({ onGenerate, isLoading }: RecipeFormProps) => {
  const [mode, setMode] = useState<"ingredients" | "food">("ingredients");
  const [ingredients, setIngredients] = useState("");
  const [foodName, setFoodName] = useState("");
  const [cuisine, setCuisine] = useState("auto");
  const [preference, setPreference] = useState("veg");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "ingredients" && ingredients.trim()) {
      onGenerate(ingredients, cuisine, preference, mode);
    } else if (mode === "food" && foodName.trim()) {
      onGenerate(ingredients, cuisine, preference, mode, foodName);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-8 shadow-[var(--shadow-card)]">
      <Tabs value={mode} onValueChange={(v) => setMode(v as "ingredients" | "food")} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ingredients">From Ingredients</TabsTrigger>
          <TabsTrigger value="food">Specific Food</TabsTrigger>
        </TabsList>

        <TabsContent value="ingredients" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="ingredients" className="text-lg font-semibold">
              Enter Ingredients
            </Label>
            <Input
              id="ingredients"
              placeholder="e.g., paneer, tomato, onion, chicken, garlic"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="text-base h-12"
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">Separate ingredients with commas</p>
          </div>
        </TabsContent>

        <TabsContent value="food" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="foodName" className="text-lg font-semibold">
              Food Name
            </Label>
            <Input
              id="foodName"
              placeholder="e.g., Biryani, Dosa, Butter Chicken"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="text-base h-12"
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">Enter the food you want to make</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="available-ingredients" className="text-lg font-semibold">
              Available Ingredients (Optional)
            </Label>
            <Input
              id="available-ingredients"
              placeholder="e.g., paneer, tomato, onion"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="text-base h-12"
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">List ingredients you have, or leave empty</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="cuisine" className="text-lg font-semibold">
          Cuisine Type
        </Label>
        <Select value={cuisine} onValueChange={setCuisine} disabled={isLoading}>
          <SelectTrigger id="cuisine" className="h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto (Both)</SelectItem>
            <SelectItem value="north">North Indian</SelectItem>
            <SelectItem value="south">South Indian</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-semibold">Preference</Label>
        <RadioGroup value={preference} onValueChange={setPreference} disabled={isLoading}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="veg" id="veg" />
            <Label htmlFor="veg" className="font-normal cursor-pointer">
              Vegetarian
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non-veg" id="non-veg" />
            <Label htmlFor="non-veg" className="font-normal cursor-pointer">
              Non-Vegetarian
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="font-normal cursor-pointer">
              Both
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        size="lg"
  className="w-full h-14 text-lg font-semibold bg-[var(--gradient-hero)] text-black hover:text-black hover:opacity-95 transition-transform transition-opacity duration-200 transform hover:scale-105 hover:shadow-lg active:scale-95 focus-visible:scale-105"
        disabled={isLoading || (mode === "ingredients" && !ingredients.trim()) || (mode === "food" && !foodName.trim())}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Recipes...
          </>
        ) : (
          <>
            <ChefHat className="mr-2 h-5 w-5" />
            Generate Recipes
          </>
        )}
      </Button>
    </form>
  );
};
