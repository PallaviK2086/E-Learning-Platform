import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchLesson();
    checkAuth();
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUserId(session.user.id);
      checkCompletion(session.user.id);
    }
  };

  const fetchLesson = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      toast({
        title: "Error Loading Lesson",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setLesson(data);
    }
    setLoading(false);
  };

  const checkCompletion = async (uid: string) => {
    const { data } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', uid)
      .eq('lesson_id', id)
      .maybeSingle();

    setIsCompleted(!!data);
  };

  const markAsComplete = async () => {
    if (!userId) {
      toast({
        title: "Login Required",
        description: "Please login to track your progress",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        lesson_id: id,
      });

    if (error) {
      if (error.message.includes('duplicate')) {
        toast({
          title: "Already Completed",
          description: "You've already marked this lesson as complete",
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      setIsCompleted(true);
      toast({
        title: "Lesson Completed!",
        description: "Great job! Keep learning.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading lesson...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Lesson not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{lesson.title}</h1>
          <p className="text-lg text-muted-foreground">{lesson.description}</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-0">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${lesson.video_id}`}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </CardContent>
        </Card>

        <div className="bg-secondary p-6 rounded-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Understand core concepts and best practices</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Apply modern techniques to improve productivity</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Learn from real-world case studies and examples</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Implement sustainable and cost-effective solutions</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            size="lg" 
            className="gap-2" 
            onClick={markAsComplete}
            disabled={isCompleted}
          >
            <CheckCircle2 className="h-5 w-5" />
            {isCompleted ? "Completed ✓" : "Mark as Complete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
