import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp, Users, AlertTriangle, CalendarDays, PieChart as PieIcon, LineChart as LineIcon } from "lucide-react";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { mockStudentProfiles } from "@/data/studentProfiles";

type WeeklyMetric = { week: string; anxiety: number; depression: number; stress: number };
type DeptUsage = { name: string; value: number };

export default function Analytics() {
  // Derived anonymized aggregates
  const metrics = useMemo(() => {
    const now = new Date();
    const weeks: WeeklyMetric[] = Array.from({ length: 8 }).map((_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (7 * (7 - i)));
      const label = `${d.getMonth() + 1}/${d.getDate()}`;
      // Build simple synthetic trend from latest assessments (no PII)
      const sample = mockStudentProfiles.map(s => s.mentalHealth.previousAssessments[0]).filter(Boolean);
      const baseAnxiety = sample.reduce((a, b) => a + (b?.gad7Score || 0), 0) / Math.max(1, sample.length);
      const baseDepression = sample.reduce((a, b) => a + (b?.phq9Score || 0), 0) / Math.max(1, sample.length);
      const baseStress = sample.reduce((a, b) => a + (b?.ghq12Score || 0), 0) / Math.max(1, sample.length);
      // Add gentle oscillation for trend viz only (deterministic per week index)
      const wobble = (seed: number) => 1 + ((i % 3) - 1) * 0.05 * seed;
      return {
        week: label,
        anxiety: Math.round(baseAnxiety * wobble(2)),
        depression: Math.round(baseDepression * wobble(1)),
        stress: Math.round(baseStress * wobble(3))
      };
    });

    // Weekly active students approximation: lastLogin within 7 days
    const active = mockStudentProfiles.filter(s => {
      const last = new Date(s.engagement.lastLogin);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return last > weekAgo;
    }).length;

    // New bookings (demo): average of counselingSessionsAttended diff approximation
    const newBookings = mockStudentProfiles.reduce((sum, s) => sum + (s.engagement.counselingSessionsAttended > 0 ? 1 : 0), 0);

    // Flagged posts (demo): proportional to high-risk profiles
    const flagged = mockStudentProfiles.filter(s => s.mentalHealth.previousAssessments[0]?.riskLevel === 'high').length;

    // Average anxiety score (GAD-7)
    const avgAnxiety = Math.round((mockStudentProfiles.reduce((sum, s) => sum + (s.mentalHealth.previousAssessments[0]?.gad7Score || 0), 0) / Math.max(1, mockStudentProfiles.length)) * 10) / 10;

    // Department/college usage (demo): bucket by first letter of major
    const deptsMap: Record<string, number> = {};
    mockStudentProfiles.forEach(s => {
      const key = (s.demographics.major?.[0] || 'U').toUpperCase();
      deptsMap[key] = (deptsMap[key] || 0) + 1;
    });
    const deptData: DeptUsage[] = Object.entries(deptsMap).map(([name, value]) => ({ name, value }));

    // Chatbot frequent questions (demo): map from quick topics occurrences in welcome list
    const chatbotFreq = [
      { name: 'Anxiety/Exams', value: 34 },
      { name: 'Sleep Issues', value: 21 },
      { name: 'Study Overwhelm', value: 27 },
      { name: 'Homesickness', value: 18 },
      { name: 'Loneliness', value: 15 },
      { name: 'Career', value: 12 },
      { name: 'Family Pressure', value: 11 },
      { name: 'Financial Stress', value: 9 },
    ];

    return { weeks, active, newBookings, flagged, avgAnxiety, deptData, chatbotFreq };
  }, []);

  const colors = ["#22c55e", "#f59e0b", "#60a5fa", "#ef4444", "#a78bfa", "#f97316", "#14b8a6", "#eab308"];

  const exportJSON = () => {
    const data = {
      generatedAt: new Date().toISOString(),
      weeklyMetrics: metrics.weeks,
      weeklyActiveStudents: metrics.active,
      newBookings: metrics.newBookings,
      flaggedPosts: metrics.flagged,
      averageAnxietyScore: metrics.avgAnxiety,
      usageByDept: metrics.deptData,
      chatbotFrequentTopics: metrics.chatbotFreq,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics_aggregate_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    // Export weekly metrics as CSV; no PII
    const header = ["week", "anxiety", "depression", "stress"]; 
    const rows = metrics.weeks.map(w => [w.week, w.anxiety, w.depression, w.stress].join(","));
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `weekly_metrics_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Analytics Overview</h1>
          <p className="text-muted-foreground">Anonymous reports and frequently asked chatbot topics. No PII stored or exported.</p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Weekly Active Students</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-3xl font-bold">{metrics.active}</div>
              <Badge variant="outline" className="flex items-center gap-1"><Users className="h-3 w-3" /> active</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">New Bookings</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-3xl font-bold">{metrics.newBookings}</div>
              <Badge variant="outline" className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> this week</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Flagged Posts</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-3xl font-bold">{metrics.flagged}</div>
              <Badge variant="outline" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> last 30d</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Avg. Anxiety (GAD-7)</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-3xl font-bold">{metrics.avgAnxiety}</div>
              <Badge variant="outline" className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> mean</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Weekly trend line chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LineIcon className="h-5 w-5" /> Weekly Mental Health Trend</CardTitle>
            <CardDescription>Aggregated scores from anonymized assessments.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ anxiety: { label: "Anxiety", color: "#60a5fa" }, depression: { label: "Depression", color: "#f97316" }, stress: { label: "Stress", color: "#22c55e" } }}>
              <LineChart data={metrics.weeks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="anxiety" stroke="#60a5fa" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="depression" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="stress" stroke="#22c55e" strokeWidth={2} dot={false} />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Usage by department */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage by Department</CardTitle>
              <CardDescription>Proportion of active students grouped by major initial.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={metrics.deptData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#a78bfa" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><PieIcon className="h-5 w-5" /> Chatbot Frequent Topics</CardTitle>
              <CardDescription>Top intents asked to the assistant (anonymous).</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={metrics.chatbotFreq} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
                    {metrics.chatbotFreq.map((_, idx) => (
                      <Cell key={idx} fill={colors[idx % colors.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Export section */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics & Export</CardTitle>
            <CardDescription>Download aggregated data only. No personally identifiable information.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={exportCSV} variant="outline" className="rounded-full"><Download className="h-4 w-4 mr-2" /> Export Weekly CSV</Button>
            <Button onClick={exportJSON} className="rounded-full"><Download className="h-4 w-4 mr-2" /> Export Aggregate JSON</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


