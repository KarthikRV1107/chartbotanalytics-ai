import { motion } from "framer-motion";
import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import {
  Maximize2, Minimize2, Download, RefreshCw, BarChart3, LineChart as LineIcon,
  PieChart as PieIcon, AreaChart as AreaIcon, Activity,
} from "lucide-react";
import type { ChartConfig } from "@/lib/chartBot";

const COLORS = [
  "hsl(262, 83%, 65%)",
  "hsl(172, 66%, 50%)",
  "hsl(210, 100%, 60%)",
  "hsl(30, 100%, 60%)",
  "hsl(330, 80%, 60%)",
  "hsl(185, 80%, 55%)",
];

const TYPE_ICONS: Record<string, any> = {
  bar: BarChart3,
  line: LineIcon,
  pie: PieIcon,
  area: AreaIcon,
  radar: Activity,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-4 py-3 text-xs shadow-2xl border border-primary/20">
      <p className="text-foreground font-semibold mb-1.5">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="flex items-center gap-2 py-0.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block shadow-sm" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-bold text-foreground">{p.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  );
};

export function ChartDisplay({ config }: { config: ChartConfig }) {
  const [expanded, setExpanded] = useState(false);
  const [currentType, setCurrentType] = useState(config.type);
  const { data, dataKeys, title } = config;
  const type = currentType;

  const TypeIcon = TYPE_ICONS[type] || BarChart3;

  // Compute quick stats
  const total = data.reduce((sum, d) => sum + (d[dataKeys[0]] || 0), 0);
  const max = Math.max(...data.map((d) => d[dataKeys[0]] || 0));
  const avg = Math.round(total / data.length);

  const chartHeight = expanded ? 400 : 280;

  const switchType = () => {
    const types: ChartConfig["type"][] = ["bar", "line", "area", "pie", "radar"];
    const idx = types.indexOf(currentType);
    setCurrentType(types[(idx + 1) % types.length]);
  };

  const renderChart = () => {
    const commonMargin = { top: 10, right: 10, left: -10, bottom: 5 };
    const axisProps = {
      tick: { fill: "hsl(220, 10%, 55%)", fontSize: 11, fontFamily: "Space Grotesk" },
      axisLine: false as const,
      tickLine: false as const,
    };
    const gridProps = { strokeDasharray: "3 3" as const, stroke: "hsl(230, 15%, 20%)" };

    switch (type) {
      case "bar":
        return (
          <BarChart data={data} margin={commonMargin}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(262, 83%, 65%, 0.05)" }} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Space Grotesk" }} />
            {dataKeys.map((key, i) => (
              <Bar key={key} dataKey={key} fill={COLORS[i % COLORS.length]} radius={[8, 8, 0, 0]} animationDuration={800} animationBegin={i * 100} />
            ))}
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data} margin={commonMargin}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Space Grotesk" }} />
            {dataKeys.map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} strokeWidth={3} dot={{ fill: COLORS[i % COLORS.length], r: 4, strokeWidth: 2, stroke: "hsl(230, 25%, 7%)" }} activeDot={{ r: 7, strokeWidth: 2 }} animationDuration={1200} />
            ))}
          </LineChart>
        );
      case "area":
        return (
          <AreaChart data={data} margin={commonMargin}>
            <defs>
              {dataKeys.map((key, i) => (
                <linearGradient key={key} id={`grad-${key}-${config.title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="name" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Space Grotesk" }} />
            {dataKeys.map((key, i) => (
              <Area key={key} type="monotone" dataKey={key} stroke={COLORS[i % COLORS.length]} strokeWidth={2.5} fill={`url(#grad-${key}-${config.title})`} animationDuration={1000} />
            ))}
          </AreaChart>
        );
      case "radar":
        return (
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
            <PolarGrid stroke="hsl(230, 15%, 20%)" />
            <PolarAngleAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} />
            <PolarRadiusAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 10 }} />
            {dataKeys.map((key, i) => (
              <Radar key={key} name={key} dataKey={key} stroke={COLORS[i % COLORS.length]} fill={COLORS[i % COLORS.length]} fillOpacity={0.15} strokeWidth={2} />
            ))}
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </RadarChart>
        );
      case "pie":
      default:
        return (
          <PieChart>
            <defs>
              {COLORS.map((color, i) => (
                <linearGradient key={i} id={`pie-grad-${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                </linearGradient>
              ))}
            </defs>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={4} dataKey={dataKeys[0]} strokeWidth={0} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: "hsl(220, 10%, 40%)" }} animationDuration={800}>
              {data.map((_, i) => (
                <Cell key={i} fill={`url(#pie-grad-${i % COLORS.length})`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );
    }
  };

  return (
    <motion.div
      layout
      className="glass rounded-2xl overflow-hidden border border-glass-border/30"
    >
      {/* Chart header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <TypeIcon className="w-4 h-4 text-primary" />
          </div>
          <div>
            {title && <h3 className="font-heading font-bold text-sm text-foreground">{title}</h3>}
            <p className="text-[10px] text-muted-foreground capitalize">{type} chart · {data.length} data points</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={switchType} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all" title="Switch chart type">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all" title="Download">
            <Download className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setExpanded(!expanded)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all" title={expanded ? "Minimize" : "Expand"}>
            {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="flex items-center gap-4 px-5 pb-3">
        {[
          { label: "Total", value: total.toLocaleString() },
          { label: "Max", value: max.toLocaleString() },
          { label: "Avg", value: avg.toLocaleString() },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-1.5 text-[11px]">
            <span className="text-muted-foreground">{stat.label}:</span>
            <span className="font-mono font-bold text-foreground">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        animate={{ height: chartHeight }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="w-full px-3 pb-4"
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
