import { FeatureCard } from "@/components/FeatureCard";
import { QuoteCard } from "@/components/QuoteCard";
import { QuoteOfTheDayPopup } from "@/components/QuoteOfTheDayPopup";
import { SlideshowBackground } from "@/components/SlideshowBackground";
import { IssueCard } from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

import { getDailyQuote } from "@/data/dailyQuotes";
import { 
  Brain, 
  Heart, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Timer,
  TrendingUp,
  Shield,
  Globe,
  Award,
  Zap,
  Trophy,
  UserX,
  Home,
  HeartHandshake,
  IndianRupee,
  DollarSign,
  Phone
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const dailyQuote = getDailyQuote('urban');
  const impactRef = useRef<HTMLDivElement | null>(null);
  const [impactCount, setImpactCount] = useState(200);
  const hasAnimatedRef = useRef(false);

  const getNavigationPath = (title: string) => {
    switch (title) {
      case "AI Mental Health Support":
        return "/ai-chat";
      case "Mood Tracking & Analytics":
        return "/mood";
      case "Confidential Counselling":
        return "/booking";
      case "Wellness Resources Hub":
        return "/resources";
      case "Peer Support Community":
        return "/community";
      case "Pomodoro Wellness Coach":
        return "/pomodoro";
      default:
        return "/";
    }
  };
  const features = [
    {
      title: t('feature.ai.title'),
      description: t('feature.ai.description'),
      icon: MessageCircle,
      action: t('feature.ai.action'),
      gradient: "primary" as const,
    },
    {
      title: t('feature.mood.title'), 
      description: t('feature.mood.description'),
      icon: Heart,
      action: t('feature.mood.action'),
      gradient: "wellness" as const,
    },
    {
      title: t('feature.counselling.title'),
      description: t('feature.counselling.description'),
      icon: Calendar,
      action: t('feature.counselling.action'),
      gradient: "calm" as const,
    },
    {
      title: t('feature.resources.title'),
      description: t('feature.resources.description'),
      icon: BookOpen,
      action: t('feature.resources.action'),
      gradient: "primary" as const,
    },
    {
      title: t('feature.community.title'),
      description: t('feature.community.description'),
      icon: Users,
      action: t('feature.community.action'),
      gradient: "wellness" as const,
    },
    {
      title: t('feature.pomodoro.title'),
      description: t('feature.pomodoro.description'),
      icon: Timer,
      action: t('feature.pomodoro.action'),
      gradient: "calm" as const,
    },
  ];

  const differentiators = [
    { icon: Globe, title: "Multilingual & Cultural", desc: "Content in regional languages" },
    { icon: Shield, title: "Privacy First", desc: "Anonymous analytics & quick exit" },
    { icon: Zap, title: "Works Offline", desc: "PWA support for rural areas" },
    { icon: Award, title: "Gamified Wellness", desc: "Points & badges for self-care" },
  ];

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  };

  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Student, 2nd Year, B.Tech",
      text:
        "I often felt anxious before exams and didn’t know how to cope. MindMatters’ self-help tools gave me practical steps, and now I feel more confident during stressful times.",
      rating: 4,
    },
    {
      name: "Isha Nair",
      role: "Student, 3rd Year, BBA",
      text:
        "Work stress from projects used to overwhelm me. The counseling sessions here were easy to book and incredibly supportive. Today, I feel calmer and more focused in college life.",
      rating: 5,
    },
    {
      name: "Rohan Deshpande",
      role: "Student, 1st Year, BA",
      text:
        "I struggled with loneliness after moving to a new city. The AI chatbot gave me instant comfort, and slowly I opened up to professional guidance. It feels like I belong somewhere.",
      rating: 3,
    },
    {
      name: "Meera Iyer",
      role: "Student, 4th Year, LLB",
      text:
        "Anxiety made it hard for me to concentrate on studies. Mood tracking on MindMatters helped me see patterns in my emotions. Now I plan my days better and feel more in control.",
      rating: 5,
    },
    {
      name: "Aditya Menon",
      role: "Student, 2nd Year, B.Tech",
      text:
        "Long hours of coding assignments left me mentally drained. The mix of self-help guides and counselor sessions brought balance back. I finally feel healthier and more motivated.",
      rating: 4,
    },
    {
      name: "Kavya Patil",
      role: "Student, 1st Year, BA Psychology",
      text:
        "I hesitated to reach out for help because of language barriers. The multilingual support on MindMatters made me comfortable. I could express myself freely without fear.",
      rating: 4,
    },
    {
      name: "Siddharth Gupta",
      role: "Student, 4th Year, BBA",
      text:
        "Managing startup projects alongside studies pushed me into constant stress. Booking a session through MindMatters was seamless and professional. I now manage pressure much better and sleep peacefully.",
      rating: 3,
    },
    {
      name: "Ananya Rao",
      role: "Student, 3rd Year, BA English",
      text:
        "I felt lost in my emotions and didn’t know how to track progress. MindMatters encouraged daily reflections, and I can see real growth in my mindset.",
      rating: 4,
    },
    {
      name: "Vikram Joshi",
      role: "Student, 2nd Year, MBA",
      text:
        "I needed quick support during late-night panic attacks. The chatbot gave me instant comfort, and human counselors guided me further. It feels balanced and reassuring.",
      rating: 4,
    },
  ];

  const testimonialColumns: [typeof testimonials, typeof testimonials, typeof testimonials] = [[], [], []] as any;
  testimonials.forEach((item, index) => {
    testimonialColumns[index % 3].push(item);
  });

  const issueCards = [
    {
      title: "Competition",
      icon: Trophy,
      bulletPoints: [
        "Manage academic pressure effectively",
        "Build healthy competitive mindset",
        "Focus on personal growth over comparison"
      ],
      actionLabel: "Get Support",
      gradient: "primary" as const
    },
    {
      title: "FOMO",
      icon: UserX,
      bulletPoints: [
        "Combat fear of missing out",
        "Practice digital wellness",
        "Build authentic connections"
      ],
      actionLabel: "Learn More",
      gradient: "wellness" as const
    },
    {
      title: "Homesickness",
      icon: Home,
      bulletPoints: [
        "Cope with being away from family",
        "Create new support systems",
        "Stay connected while independent"
      ],
      actionLabel: "Find Resources",
      gradient: "calm" as const
    },
    {
      title: "Financial Stress",
      icon: IndianRupee,
      bulletPoints: [
        "Manage education expenses wisely",
        "Find scholarships and financial aid",
        "Build healthy money habits"
      ],
      actionLabel: "Get Guidance",
      gradient: "primary" as const
    },
    {
      title: "Relationships",
      icon: HeartHandshake,
      bulletPoints: [
        "Navigate relationship challenges",
        "Build healthy boundaries",
        "Communicate effectively"
      ],
      actionLabel: "Explore Tools",
      gradient: "primary" as const
    },
    {
      title: "Financial Burden",
      icon: DollarSign,
      bulletPoints: [
        "Manage financial stress",
        "Access support resources",
        "Learn budgeting skills"
      ],
      actionLabel: "Get Help",
      gradient: "wellness" as const
    }
  ];

  // Add smooth scroll to assessment section
  useEffect(() => {
    if (window.location.hash === '#assessment') {
      const element = document.getElementById('assessment');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Count-up animation for Community Impact (runs once per load when visible)
  useEffect(() => {
    if (!impactRef.current || hasAnimatedRef.current) return;
    const el = impactRef.current;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        const start = 200;
        const end = 1200;
        const duration = 1500; // ms
        const startTime = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          const value = Math.floor(start + (end - start) * eased);
          setImpactCount(value);
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll-triggered bg + parallax
  useEffect(() => {
    const stage = document.querySelector('.bg-stage') as HTMLDivElement | null;
    if (!stage) return;
    const sections = Array.from(document.querySelectorAll('[data-bg-from]')) as HTMLElement[];

    const io = new IntersectionObserver((entries) => {
      const best = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!best) return;
      const el = best.target as HTMLElement;
      const from = el.getAttribute('data-bg-from') || getComputedStyle(document.documentElement).getPropertyValue('--bg-from');
      const to = el.getAttribute('data-bg-to') || getComputedStyle(document.documentElement).getPropertyValue('--bg-to');
      const tint = el.getAttribute('data-bg-tint') || getComputedStyle(document.documentElement).getPropertyValue('--bg-tint');
      document.documentElement.style.setProperty('--bg-from', from);
      document.documentElement.style.setProperty('--bg-to', to);
      document.documentElement.style.setProperty('--bg-tint', tint);
    }, { threshold: [0.25, 0.5, 0.75] });

    sections.forEach(s => io.observe(s));

    const parallaxNodes = Array.from(document.querySelectorAll('[data-parallax-speed]')) as HTMLElement[];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, 1 - Math.abs(rect.top + rect.height / 2 - vh / 2) / (vh / 2)));
          section.querySelectorAll('[data-parallax-speed]').forEach((node) => {
            const el = node as HTMLElement;
            const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.1');
            el.style.transform = `translate3d(0, ${Math.round((1 - progress) * speed * 120)}px, 0)`;
          });
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div className="bg-stage" aria-hidden="true"></div>
      <QuoteOfTheDayPopup />
      <div className="min-h-screen">

      {/* Hero Section with Slideshow Background */}
      <section className="relative overflow-hidden min-h-screen flex items-center pt-16" data-bg-from="#cfe9ff" data-bg-to="#e7d8ff" data-bg-tint="rgba(0,0,0,0.06)">
      <SlideshowBackground />
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center text-white space-y-6 animate-slide-up">
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              {t('dashboard.hero.title')}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto opacity-95 leading-relaxed drop-shadow-md">
              {t('dashboard.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-4 shadow-glow"
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    window.location.href = '/signin';
                    return;
                  }
                  const element = document.getElementById('assessment');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Brain className="mr-2 h-5 w-5" />
                {t('dashboard.hero.cta')}
              </Button>
              <Button 
                variant="glass" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (!token) { window.location.href = '/signin'; return; }
                  navigate('/booking');
                }}
              >
                <Phone className="mr-2 h-5 w-5" />
                {t('dashboard.hero.emergency')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact - centered banner between hero and daily inspiration */}
      <section className="py-10 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={impactRef} className="relative overflow-hidden rounded-2xl border shadow-card" style={{ backgroundColor: '#add8e6' }}>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-10 text-black">
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  <span className="text-red-500">{impactCount.toLocaleString()}+</span> Students Healed
                </div>
                <p className="mt-2 text-sm md:text-base text-black/80 max-w-xl">
                  Empowered by our <span className="font-semibold">Peer Support Community</span>—a safe space to share, heal, and grow together.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  className="px-5 bg-[#add8e6] hover:bg-[#9cc7d5] text-black border border-[#add8e6]"
                  onClick={() => {
                    const token = localStorage.getItem('token');
                    if (!token) { window.location.href = '/signin'; return; }
                    window.location.href = '/community';
                  }}
                >
                  Join the Community
                </Button>
                <div className="h-8 w-8 rounded-md bg-black/10 border border-black/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote of the Day */}
      <section className="py-12 bg-background" data-bg-from="#e7d8ff" data-bg-to="#d2ffe9" data-bg-tint="rgba(0,0,0,0.06)">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{t('dashboard.daily.inspiration')}</h2>
            <p className="text-muted-foreground">
              {t('dashboard.daily.subtitle')}
            </p>
          </div>
          <Card className="hover:shadow-card transition-all duration-300">
            <CardContent className="pt-6">
              <blockquote className="text-center space-y-4">
                <p className="text-lg italic">"{dailyQuote.text}"</p>
                <footer className="text-sm text-muted-foreground">
                  — {dailyQuote.author}
                  <Badge variant="secondary" className="ml-2">
                    {dailyQuote.category}
                  </Badge>
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Student Issues */}
      <section className="relative py-16 bg-muted/30 overflow-hidden" data-bg-from="#e7d8ff" data-bg-to="#d2ffe9" data-bg-tint="rgba(0,0,0,0.06)">
        <div className="absolute inset-0 pointer-events-none">
          <div className="calm-bg animated-gradient"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('dashboard.challenges.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('dashboard.challenges.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {issueCards.map((issue, index) => (
              <IssueCard
                key={index}
                title={issue.title}
                icon={issue.icon}
                bulletPoints={issue.bulletPoints}
                actionLabel={issue.actionLabel}
                gradient={issue.gradient}
                onAction={() => {
                  const token = localStorage.getItem('token');
                  if (!token) { window.location.href = '/signin'; return; }
                  navigate('/resources');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-16 bg-background" data-bg-from="#d2ffe9" data-bg-to="#cfe9ff" data-bg-tint="rgba(0,0,0,0.05)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('dashboard.differentiators.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('dashboard.differentiators.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {differentiators.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="assessment" className="py-16 bg-background" data-bg-from="#cfe9ff" data-bg-to="#e7d8ff" data-bg-tint="rgba(0,0,0,0.06)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('dashboard.features.title')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('dashboard.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                action={feature.action}
                gradient={feature.gradient}
                onAction={() => {
                  navigate(getNavigationPath(feature.title));
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - marquee columns with alternating directions */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="relative mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Where Students Shine</h2>
            <div className="absolute left-1/2 -translate-x-1/2 -rotate-6 mt-2 inline-block">
              <span className="inline-block bg-orange-400 text-black font-semibold px-4 py-2 rounded shadow-md">
                What users say about us
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0,1,2].map((colIndex) => (
              <div key={colIndex} className="testimonial-marquee">
                <div className={`testimonial-marquee-inner ${colIndex === 1 ? 'marquee-down' : 'marquee-up'}`}>
                  {[...testimonialColumns[colIndex], ...testimonialColumns[colIndex]].map((t, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/10 bg-zinc-900/80 text-white shadow-xl p-5 card-glow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-sm font-semibold">
                          {getInitials(t.name)}
                        </div>
                        <div>
                          <div className="font-medium leading-tight">{t.name}</div>
                          <div className="text-xs text-zinc-400">{t.role}</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-200">{t.text}</p>
                      <div className="mt-4 text-yellow-400 text-sm" aria-label={`Rating: ${t.rating} out of 5`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < t.rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics & Impact */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">24/7</CardTitle>
                <CardDescription>AI Support Available</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-success">100%</CardTitle>
                <CardDescription>Anonymous & Confidential</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-warning">15+</CardTitle>
                <CardDescription>Regional Languages Supported</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      
      </div>
    </>
  );
}