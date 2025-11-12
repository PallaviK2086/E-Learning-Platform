import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Users, MessageSquare, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [userName, setUserName] = useState("Farmer");
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    
    // Fetch user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', session.user.id)
      .single();
    
    if (profile) {
      setUserName(profile.name);
    }
  };

  const fetchDashboardData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Get total lessons
    const { count: total } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true });
    setTotalLessons(total || 0);

    // Get completed lessons
    const { data: progress } = await supabase
      .from('user_progress')
      .select(`
        *,
        lessons (title)
      `)
      .eq('user_id', session.user.id)
      .order('completed_at', { ascending: false })
      .limit(5);
    
    setCompletedLessons(progress?.length || 0);
    setRecentActivity(progress || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/auth");
  };

  const dashboardCards = [
    {
      title: "My Lessons",
      description: "Continue learning and track your progress",
      icon: BookOpen,
      link: "/lessons",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Community",
      description: "Connect with fellow farmers and experts",
      icon: Users,
      link: "/community",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Support",
      description: "Get help and ask questions",
      icon: MessageSquare,
      link: "/support",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "My Progress",
      description: "View your learning statistics",
      icon: TrendingUp,
      link: "/progress",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Welcome Back, {userName}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your learning dashboard - track progress and access resources
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dashboardCards.map((card, index) => (
            <Link key={index} to={card.link}>
              <Card className="border-2 hover:border-primary transition-all hover:shadow-lg cursor-pointer group h-full">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${card.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No activity yet. Start learning!</p>
                ) : (
                  recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <div>
                        <p className="font-medium text-foreground">
                          Completed: {activity.lessons?.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Stats</CardTitle>
              <CardDescription>Your progress overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Lessons Completed</span>
                    <span className="text-sm font-medium text-primary">
                      {completedLessons}/{totalLessons}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Learning Progress</span>
                    <span className="text-sm font-medium text-primary">
                      {totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
