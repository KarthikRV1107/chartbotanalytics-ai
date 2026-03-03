import type { Message } from "@/components/ChatMessage";

export interface ChartConfig {
  type: "bar" | "line" | "pie" | "area" | "radar";
  data: Record<string, any>[];
  dataKeys: string[];
  title?: string;
}

type ChartTemplate = {
  keywords: string[];
  response: string;
  chart: ChartConfig;
};

const templates: ChartTemplate[] = [
  {
    keywords: ["sales", "region"],
    response: "📊 Here's a breakdown of sales performance across regions. North America leads with impressive Q4 growth of 38%, followed by Asia Pacific's rapid expansion.",
    chart: {
      type: "bar",
      title: "Sales by Region (in $K)",
      dataKeys: ["Q3", "Q4"],
      data: [
        { name: "North America", Q3: 420, Q4: 580 },
        { name: "Europe", Q3: 310, Q4: 390 },
        { name: "Asia Pacific", Q3: 280, Q4: 450 },
        { name: "Latin America", Q3: 150, Q4: 210 },
        { name: "Middle East", Q3: 90, Q4: 130 },
      ],
    },
  },
  {
    keywords: ["revenue", "monthly", "trend"],
    response: "📈 Revenue shows a powerful upward trajectory throughout 2024! November peaked at $190K driven by holiday demand. Year-over-year growth is tracking at 2.7x.",
    chart: {
      type: "line",
      title: "Monthly Revenue 2024 ($K)",
      dataKeys: ["revenue", "target"],
      data: [
        { name: "Jan", revenue: 65, target: 60 },
        { name: "Feb", revenue: 72, target: 65 },
        { name: "Mar", revenue: 80, target: 70 },
        { name: "Apr", revenue: 78, target: 75 },
        { name: "May", revenue: 95, target: 80 },
        { name: "Jun", revenue: 110, target: 85 },
        { name: "Jul", revenue: 105, target: 90 },
        { name: "Aug", revenue: 120, target: 95 },
        { name: "Sep", revenue: 135, target: 100 },
        { name: "Oct", revenue: 148, target: 110 },
        { name: "Nov", revenue: 190, target: 120 },
        { name: "Dec", revenue: 175, target: 130 },
      ],
    },
  },
  {
    keywords: ["market", "share", "pie"],
    response: "🥧 Market share analysis reveals a competitive landscape. TechCorp holds 32% but InnovateCo is closing the gap fast with 24% and growing quarterly.",
    chart: {
      type: "pie",
      title: "Market Share by Company",
      dataKeys: ["value"],
      data: [
        { name: "TechCorp", value: 32 },
        { name: "InnovateCo", value: 24 },
        { name: "DataFlow", value: 18 },
        { name: "CloudNine", value: 14 },
        { name: "Others", value: 12 },
      ],
    },
  },
  {
    keywords: ["user", "growth", "area"],
    response: "🚀 User growth is explosive! Free tier expanded 12.9x while premium conversions jumped from 3K to 90K — a 30x increase. Premium adoption rate hit 58% in December.",
    chart: {
      type: "area",
      title: "User Growth (thousands)",
      dataKeys: ["free", "premium"],
      data: [
        { name: "Jan", free: 12, premium: 3 },
        { name: "Mar", free: 28, premium: 8 },
        { name: "May", free: 45, premium: 15 },
        { name: "Jul", free: 68, premium: 28 },
        { name: "Sep", free: 95, premium: 45 },
        { name: "Nov", free: 130, premium: 72 },
        { name: "Dec", free: 155, premium: 90 },
      ],
    },
  },
  {
    keywords: ["performance", "comparison", "metrics"],
    response: "⚡ Performance scorecard shows Marketing ROI crushing benchmarks at 92% (vs 75% target). Customer retention at 62% is the key area for improvement — recommend launching a loyalty program.",
    chart: {
      type: "bar",
      title: "Performance Metrics (%)",
      dataKeys: ["current", "benchmark"],
      data: [
        { name: "Revenue Growth", current: 85, benchmark: 70 },
        { name: "Customer Retention", current: 62, benchmark: 80 },
        { name: "Marketing ROI", current: 92, benchmark: 75 },
        { name: "Employee Satisfaction", current: 78, benchmark: 72 },
        { name: "Product Quality", current: 88, benchmark: 85 },
      ],
    },
  },
  {
    keywords: ["radar", "skills", "team"],
    response: "🎯 Team capabilities radar shows complementary strengths. Team A excels in Technical (90) and Innovation (85), while Team B leads in Design (85) and Communication (80). Consider cross-training opportunities.",
    chart: {
      type: "radar",
      title: "Team Capabilities Assessment",
      dataKeys: ["teamA", "teamB"],
      data: [
        { name: "Technical", teamA: 90, teamB: 75 },
        { name: "Design", teamA: 70, teamB: 85 },
        { name: "Communication", teamA: 60, teamB: 80 },
        { name: "Leadership", teamA: 75, teamB: 70 },
        { name: "Innovation", teamA: 85, teamB: 65 },
        { name: "Execution", teamA: 80, teamB: 78 },
      ],
    },
  },
  {
    keywords: ["expense", "budget", "spending", "cost"],
    response: "💰 Budget allocation breakdown shows Engineering consuming the largest share at 35%. Marketing spend is high at 22% — consider optimizing ad spend for better ROI.",
    chart: {
      type: "pie",
      title: "Budget Allocation by Department",
      dataKeys: ["value"],
      data: [
        { name: "Engineering", value: 35 },
        { name: "Marketing", value: 22 },
        { name: "Sales", value: 18 },
        { name: "Operations", value: 15 },
        { name: "HR", value: 10 },
      ],
    },
  },
  {
    keywords: ["website", "traffic", "visitors"],
    response: "🌐 Website traffic surged 340% this year! Organic search dominates at peak months while paid traffic provides steady baseline. The SEO investments from Q1 are clearly paying off.",
    chart: {
      type: "area",
      title: "Website Traffic (thousands)",
      dataKeys: ["organic", "paid", "referral"],
      data: [
        { name: "Jan", organic: 15, paid: 8, referral: 3 },
        { name: "Mar", organic: 28, paid: 12, referral: 6 },
        { name: "May", organic: 42, paid: 15, referral: 9 },
        { name: "Jul", organic: 58, paid: 18, referral: 12 },
        { name: "Sep", organic: 75, paid: 20, referral: 16 },
        { name: "Nov", organic: 95, paid: 22, referral: 20 },
      ],
    },
  },
  {
    keywords: ["product", "rating", "review", "score"],
    response: "⭐ Product ratings across categories show strong performance. Ease of Use leads at 4.8/5, while Pricing perception at 3.9 is the area needing attention. Overall customer satisfaction: 4.4/5.",
    chart: {
      type: "bar",
      title: "Product Ratings (out of 5)",
      dataKeys: ["rating"],
      data: [
        { name: "Ease of Use", rating: 4.8 },
        { name: "Features", rating: 4.5 },
        { name: "Performance", rating: 4.6 },
        { name: "Support", rating: 4.2 },
        { name: "Pricing", rating: 3.9 },
        { name: "Design", rating: 4.7 },
      ],
    },
  },
  {
    keywords: ["conversion", "funnel", "signup"],
    response: "🔄 Conversion funnel analysis shows a 2.1% visitor-to-customer rate. The biggest drop-off is from Trial to Purchase — consider offering extended trials or onboarding improvements.",
    chart: {
      type: "bar",
      title: "Conversion Funnel",
      dataKeys: ["users"],
      data: [
        { name: "Visitors", users: 10000 },
        { name: "Sign Ups", users: 3200 },
        { name: "Activated", users: 1800 },
        { name: "Trial", users: 920 },
        { name: "Purchase", users: 210 },
      ],
    },
  },
];

const fallbackCharts: ChartTemplate[] = [
  {
    keywords: [],
    response: "📊 Here's a visualization based on your request! I've generated a sample dataset to illustrate the concept. You can switch between chart types using the controls.",
    chart: {
      type: "bar",
      title: "Sample Data Visualization",
      dataKeys: ["value", "average"],
      data: [
        { name: "Category A", value: 65, average: 50 },
        { name: "Category B", value: 85, average: 50 },
        { name: "Category C", value: 45, average: 50 },
        { name: "Category D", value: 92, average: 50 },
        { name: "Category E", value: 73, average: 50 },
      ],
    },
  },
  {
    keywords: [],
    response: "📈 I've created a trend visualization for you. The data reveals a strong upward trajectory with actual values consistently outperforming forecasts — a very healthy sign!",
    chart: {
      type: "line",
      title: "Trend Analysis",
      dataKeys: ["actual", "forecast"],
      data: [
        { name: "Week 1", actual: 30, forecast: 28 },
        { name: "Week 2", actual: 45, forecast: 40 },
        { name: "Week 3", actual: 38, forecast: 45 },
        { name: "Week 4", actual: 55, forecast: 50 },
        { name: "Week 5", actual: 62, forecast: 58 },
        { name: "Week 6", actual: 70, forecast: 65 },
      ],
    },
  },
  {
    keywords: [],
    response: "🥧 Here's a distribution breakdown. Segment A dominates with 35% share. The long tail of smaller segments (D+E) accounts for 20% — worth investigating for growth opportunities.",
    chart: {
      type: "pie",
      title: "Distribution Overview",
      dataKeys: ["value"],
      data: [
        { name: "Segment A", value: 35 },
        { name: "Segment B", value: 25 },
        { name: "Segment C", value: 20 },
        { name: "Segment D", value: 12 },
        { name: "Segment E", value: 8 },
      ],
    },
  },
  {
    keywords: [],
    response: "🚀 Growth trajectory looks outstanding! The exponential curve suggests a compounding effect — if this trend holds, you're on track to 3x by next quarter.",
    chart: {
      type: "area",
      title: "Growth Trajectory",
      dataKeys: ["growth"],
      data: [
        { name: "Q1", growth: 20 },
        { name: "Q2", growth: 35 },
        { name: "Q3", growth: 55 },
        { name: "Q4", growth: 80 },
        { name: "Q5", growth: 110 },
        { name: "Q6", growth: 150 },
      ],
    },
  },
];

function detectChartType(input: string): ChartConfig["type"] | null {
  const lower = input.toLowerCase();
  if (lower.includes("pie") || lower.includes("donut")) return "pie";
  if (lower.includes("line") || lower.includes("trend")) return "line";
  if (lower.includes("area")) return "area";
  if (lower.includes("radar") || lower.includes("spider")) return "radar";
  if (lower.includes("bar") || lower.includes("column")) return "bar";
  return null;
}

export function generateChartResponse(input: string): Message {
  const lower = input.toLowerCase();

  for (const template of templates) {
    const matchCount = template.keywords.filter((kw) => lower.includes(kw)).length;
    if (matchCount >= 2 || (template.keywords.length === 1 && matchCount === 1)) {
      const chart = { ...template.chart };
      const detectedType = detectChartType(input);
      if (detectedType) chart.type = detectedType;
      return { id: Date.now().toString(), role: "bot", content: template.response, chart };
    }
  }

  const detectedType = detectChartType(input);
  let fallback: ChartTemplate;
  if (detectedType) {
    fallback = fallbackCharts.find((f) => f.chart.type === detectedType) || fallbackCharts[0];
  } else {
    fallback = fallbackCharts[Math.floor(Math.random() * fallbackCharts.length)];
  }

  return { id: Date.now().toString(), role: "bot", content: fallback.response, chart: { ...fallback.chart } };
}
