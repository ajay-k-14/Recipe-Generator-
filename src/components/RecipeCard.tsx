import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Nutrition {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface RecipeCardProps {
  title: string;
  region: string;
  instructions: string[];
  nutrition: Nutrition;
  healthiness?: string;
  dietary?: string;
}

const getHealthBadgeColor = (healthiness?: string) => {
  if (!healthiness) return "bg-[hsl(var(--health-moderate))] text-white";
  if (healthiness.toLowerCase().includes("healthy")) return "bg-[hsl(var(--health-good))] text-white";
  if (healthiness.toLowerCase().includes("moderate")) return "bg-[hsl(var(--health-moderate))] text-white";
  return "bg-[hsl(var(--health-rich))] text-white";
};

export const RecipeCard = ({ title, region, instructions, nutrition, healthiness, dietary }: RecipeCardProps) => {
  return (
    <Card className="overflow-hidden bg-[var(--gradient-card)] border-2 hover:shadow-[var(--shadow-glow)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{title}</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <CardDescription className="text-base font-medium">{region}</CardDescription>
              {dietary && (
                <Badge variant="outline" className="text-xs capitalize">
                  {dietary}
                </Badge>
              )}
            </div>
          </div>
          <Badge className={`${getHealthBadgeColor(healthiness)} px-3 py-1 text-sm font-semibold whitespace-nowrap`}>
            {healthiness || "Nutritious"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg mb-3 text-foreground">Instructions</h4>
          <ol className="space-y-2">
            {instructions.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-muted-foreground flex-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-lg mb-3 text-foreground">Nutrition Facts</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Calories</p>
              <p className="text-xl font-bold text-foreground">{(nutrition?.calories ?? 0)} kcal</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Protein</p>
              <p className="text-xl font-bold text-foreground">{(nutrition?.protein ?? 0)}g</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Fat</p>
              <p className="text-xl font-bold text-foreground">{(nutrition?.fat ?? 0)}g</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Carbs</p>
              <p className="text-xl font-bold text-foreground">{(nutrition?.carbs ?? 0)}g</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
