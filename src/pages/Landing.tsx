
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import {
  FadeIn,
  ScaleIn,
  SlideIn,
  SlideUp,
} from '@/components/animations/PageTransition';
import {
  Award,
  BarChart,
  CheckCircle,
  ClipboardCheck,
  Github,
  LayoutDashboard,
  List,
  Star,
  Users,
} from 'lucide-react';

export default function Landing() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center justify-center px-3 py-1 mb-4 border border-border rounded-full bg-background/50 backdrop-blur-sm">
                  <span className="text-xs font-medium text-muted-foreground">
                    Work smarter, achieve more
                  </span>
                </div>
              </FadeIn>

              <SlideUp>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                  Transform your team's productivity with{' '}
                  <span className="text-gradient">achieve+</span>
                </h1>
              </SlideUp>

              <SlideUp delay={0.1}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                  A gamified task management platform that makes work fun,
                  motivates your team, and boosts productivity through rewards.
                </p>
              </SlideUp>

              <SlideUp delay={0.2}>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                  <Button asChild size="lg" className="rounded-full px-8">
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8"
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </SlideUp>

              <ScaleIn delay={0.3}>
                <div className="overflow-hidden rounded-lg border border-border shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="achieve+ dashboard"
                    className="w-full h-auto"
                  />
                </div>
              </ScaleIn>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Everything you need to supercharge productivity
                </h2>
                <p className="text-lg text-muted-foreground">
                  Powerful tools designed to motivate teams and make work
                  enjoyable
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Feature
                icon={ClipboardCheck}
                title="Task Management"
                description="Create, assign, and track tasks with ease. Set due dates, priorities, and point values."
                delay={0}
              />
              <Feature
                icon={Users}
                title="Team Collaboration"
                description="Assign tasks to team members. Keep everyone aligned with shared visibility."
                delay={0.1}
              />
              <Feature
                icon={LayoutDashboard}
                title="Admin Dashboard"
                description="Comprehensive admin controls to manage users, tasks, and track performance."
                delay={0.2}
              />
              <Feature
                icon={Star}
                title="Point System"
                description="Award points for completing tasks based on complexity and priority."
                delay={0.3}
              />
              <Feature
                icon={Award}
                title="Achievements"
                description="Motivate teams with badges, trophies, and achievement milestones."
                delay={0.4}
              />
              <Feature
                icon={BarChart}
                title="Performance Analytics"
                description="Track productivity, task completion rates, and leaderboards."
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to transform how your team works?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of teams already using achieve+ to boost
                  productivity and make work fun.
                </p>
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/register">Get Started for Free</Link>
                </Button>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-xl font-bold"
                >
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
                    <span className="absolute text-xs font-bold">A</span>
                    <span className="absolute right-[-2px] bottom-[-2px] flex h-3 w-3 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">
                      +
                    </span>
                  </div>
                  <span>achieve+</span>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Link to="#" className="hover:text-foreground">
                  Terms
                </Link>
                <Link to="#" className="hover:text-foreground">
                  Privacy
                </Link>
                <Link to="#" className="hover:text-foreground">
                  Contact
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="text-center mt-6 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} achieve+. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <SlideUp delay={delay} className="h-full">
      <div className="h-full p-6 rounded-lg border border-border bg-card shadow-sm card-hover">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-primary/10 text-primary mb-5">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </SlideUp>
  );
}
