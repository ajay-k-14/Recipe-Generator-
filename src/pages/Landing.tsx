import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Sparkles, ChefHat, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sky-200 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
              <UtensilsCrossed className="w-16 h-16 text-black" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            AI-Powered Indian
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Recipe Generator
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-black/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Transform your ingredients into authentic North and South Indian recipes with AI-powered nutrition insights
          </p>

          <Button
            size="lg"
            onClick={() => navigate("/recipe")}
            className="text-lg px-8 py-6 animate-fade-in hover-scale shadow-[var(--shadow-card)]"
            style={{ animationDelay: "0.6s" }}
          >
            Start Cooking <Sparkles className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Our Recipe Generator?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover-scale">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <ChefHat className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Authentic Recipes</h3>
              <p className="text-muted-foreground">
                Get traditional North and South Indian recipes tailored to your available ingredients and preferences.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover-scale" style={{ animationDelay: "0.1s" }}>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI-Powered</h3>
              <p className="text-muted-foreground">
                Advanced AI technology creates personalized recipes based on your ingredients, cuisine preference, and dietary needs.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover-scale" style={{ animationDelay: "0.2s" }}>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Nutrition Insights</h3>
              <p className="text-muted-foreground">
                Every recipe includes detailed nutritional information and healthiness ratings to help you make informed choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Perfect Meal?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Enter your ingredients and let AI create delicious Indian recipes tailored to your preferences
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/recipe")}
            className="text-lg px-8 py-6 hover-scale shadow-[var(--shadow-card)]"
          >
            Generate Recipe Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-200 border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>• Nutrition estimates are approximate • Always consult professionals for dietary advice •</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
