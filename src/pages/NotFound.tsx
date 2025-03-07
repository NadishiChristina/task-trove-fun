
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/animations/PageTransition";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    document.title = "Page Not Found | achieve+";
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <FadeIn className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! We couldn't find the page you're looking for.
          </p>
          <Button asChild size="lg" className="px-8">
            <Link to="/">Return to Home</Link>
          </Button>
        </FadeIn>
      </div>
    </Layout>
  );
};

export default NotFound;
