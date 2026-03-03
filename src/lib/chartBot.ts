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
    response: "Here's a breakdown of sales performance across different regions. North America leads with strong Q4 results.",
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
    response: "Revenue shows a strong upward trajectory throughout 2024, with a notable spike in November from holiday sales.",
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
    response: "Market share analysis shows a competitive landscape. TechCorp maintains the lead but competitors are gaining ground.",
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
    response: "User growth has been exponential, with both free and premium tiers expanding. Premium adoption is accelerating in recent months.",
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
    response: "Performance comparison across key metrics. Marketing efficiency stands out while customer retention needs attention.",
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
    response: "Here's a radar chart showing team capabilities across key areas. Strong in technical skills, room to grow in communication.",
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
];

const fallbackCharts: ChartTemplate[] = [
  {
    keywords: [],
    response: "Here's a visualization based on your request! I generated a sample dataset for this chart.",
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
    response: "I've created a trend visualization for you. The data shows interesting patterns over time.",
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
    response: "Here's a distribution breakdown of the data you requested.",
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
    response: "I've generated an area chart showing the growth trajectory based on your query.",
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

// Detect chart type from user input
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

  // Try to match a template
  for (const template of templates) {
    const matchCount = template.keywords.filter((kw) => lower.includes(kw)).length;
    if (matchCount >= 2 || (template.keywords.length === 1 && matchCount === 1)) {
      const chart = { ...template.chart };
      const detectedType = detectChartType(input);
      if (detectedType) chart.type = detectedType;

      return {
        id: Date.now().toString(),
        role: "bot",
        content: template.response,
        chart,
      };
    }
  }

  // Fallback: pick a random chart, but respect requested type
  const detectedType = detectChartType(input);
  let fallback: ChartTemplate;

  if (detectedType) {
    fallback = fallbackCharts.find((f) => f.chart.type === detectedType) || fallbackCharts[0];
  } else {
    fallback = fallbackCharts[Math.floor(Math.random() * fallbackCharts.length)];
  }

  return {
    id: Date.now().toString(),
    role: "bot",
    content: fallback.response,
    chart: { ...fallback.chart },
  };
}
