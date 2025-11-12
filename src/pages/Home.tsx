import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Droplets, LineChart, Users } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

const Home = () => {
  const benefits = [
    {
      icon: Sprout,
      title: "Sustainable Practices",
      description: "Learn eco-friendly farming methods that preserve soil health and increase yields",
    },
    {
      icon: Droplets,
      title: "Smart Irrigation",
      description: "Master modern water management techniques to optimize crop growth",
    },
    {
      icon: LineChart,
      title: "Data-Driven Decisions",
      description: "Use technology and analytics to make informed farming choices",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with fellow farmers and agricultural experts worldwide",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Transform Your Farm with Smart Technology
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            Learn modern farming techniques, increase productivity, and build a sustainable future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/lessons">
              <Button variant="hero" size="lg">
                Start Learning
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Smart Farming?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the benefits of modern agricultural practices and technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already transforming their practices
          </p>
          <Link to="/lessons">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Browse Lessons
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
