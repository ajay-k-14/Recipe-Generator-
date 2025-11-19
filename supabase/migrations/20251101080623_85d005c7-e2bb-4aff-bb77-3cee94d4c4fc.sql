-- Create recipes table to store generated recipes
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  region TEXT NOT NULL,
  instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
  nutrition JSONB NOT NULL DEFAULT '{}'::jsonb,
  healthiness TEXT,
  ingredients TEXT,
  cuisine TEXT,
  preference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view recipes (public app)
CREATE POLICY "Anyone can view recipes" 
ON public.recipes 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert recipes (public app)
CREATE POLICY "Anyone can create recipes" 
ON public.recipes 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_recipes_created_at ON public.recipes(created_at DESC);