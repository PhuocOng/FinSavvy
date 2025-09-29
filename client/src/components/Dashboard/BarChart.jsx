// BankDashBarChart.jsx
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const fmt = (n) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(1)}K`
    : `$${n.toFixed(0)}`;

const monthLabel = (ym) => {
  const [y, m] = ym.split("-");
  return new Date(+y, +m - 1, 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const PillLegend = () => (
  <div className="bar-chart-legend">
    <span className="bar-chart-legend-item">
      <span
        className="bar-chart-legend-dot"
        style={{ background: "#2563eb" }}
      />
      INCOME
    </span>
    <span className="bar-chart-legend-item">
      <span
        className="bar-chart-legend-dot"
        style={{ background: "#93c5fd" }}
      />
      EXPENSES
    </span>
  </div>
);

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const map = Object.fromEntries(payload.map((p) => [p.dataKey, p]));
  return (
    <div className="bar-chart-tooltip">
      <div className="bar-chart-tooltip-date">{monthLabel(label)}</div>
      <div className="bar-chart-tooltip-content">
        <div className="bar-chart-tooltip-row">
          <span
            className="bar-chart-tooltip-dot"
            style={{ background: "#2563eb" }}
          />
          <span className="bar-chart-tooltip-label">INCOME:</span>
          <span className="bar-chart-tooltip-value">
            {fmt(Math.abs(map.income?.value ?? 0))}
          </span>
        </div>
        <div className="bar-chart-tooltip-row">
          <span
            className="bar-chart-tooltip-dot"
            style={{ background: "#93c5fd" }}
          />
          <span className="bar-chart-tooltip-label">EXPENSES:</span>
          <span className="bar-chart-tooltip-value">
            {fmt(Math.abs(map.expenses?.value ?? 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

// Pill-shaped bar (works for any height)
const CapsuleBar = ({ x, y, width, height, fill }) => {
  let h = height,
    yy = y;
  if (h < 0) {
    yy = y + h;
    h = -h;
  } // safety, though all values are positive now
  const r = Math.min(width / 2, h / 2);
  return (
    <rect x={x} y={yy} width={width} height={h} rx={r} ry={r} fill={fill} />
  );
};

const BarChart = ({ data }) => {
  const uid = useMemo(() => Math.random().toString(36).slice(2), []);
  const incId = `inc-${uid}`,
    expId = `exp-${uid}`,
    shId = `shadow-${uid}`;

  // Make every value positive so bars always go upward
  const barChartData = useMemo(() => {
    const monthlyData = {};
    (data || []).forEach((t) => {
      const month = String(t.date || "").substring(0, 7);
      if (!monthlyData[month])
        monthlyData[month] = { month, income: 0, expenses: 0 };
      const amt = Math.abs(Number(t.amount) || 0);
      if (t.type === "income") monthlyData[month].income += amt;
      else monthlyData[month].expenses += amt;
    });
    return Object.values(monthlyData).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }, [data]);

  // Y from 0 → max with headroom
  const yMax = useMemo(() => {
    if (!barChartData.length) return 0;
    const maxVal = Math.max(
      ...barChartData.flatMap((d) => [d.income || 0, d.expenses || 0])
    );
    return Math.ceil(maxVal * 1.15);
  }, [barChartData]);

  const months = barChartData.length;
  const barSize = months <= 3 ? 30 : months <= 6 ? 26 : 22;
  const barCategoryGap = months <= 3 ? 50 : 22;

  return (
    <div className="bar-chart-container">
      <h3 className="bar-chart-title">Monthly Income vs Expenses</h3>
      <PillLegend />

      {barChartData.length ? (
        <ResponsiveContainer width="100%" height={320}>
          <ReBarChart
            data={barChartData}
            barCategoryGap={barCategoryGap}
            barGap={10}
            margin={{ top: 6, right: 12, left: 4, bottom: 0 }}
          >
            <defs>
              <linearGradient id={incId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a90e2" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id={expId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bfdbfe" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
              <filter id={shId} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="2"
                  floodOpacity="0.18"
                />
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#EEF2F7"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{ left: 16, right: 16 }}
              tickFormatter={monthLabel}
            />
            <YAxis
              domain={[0, yMax]}
              width={56}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={fmt}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<Tip />}
              wrapperStyle={{ outline: "none" }}
              cursor={false}
            />

            <Bar
              dataKey="income"
              fill={`url(#${incId})`}
              barSize={barSize}
              filter={`url(#${shId})`}
              isAnimationActive
              animationDuration={500}
              animationEasing="ease-out"
              shape={<CapsuleBar />}
            />
            <Bar
              dataKey="expenses"
              fill={`url(#${expId})`}
              barSize={barSize}
              filter={`url(#${shId})`}
              isAnimationActive
              animationDuration={500}
              animationEasing="ease-out"
              shape={<CapsuleBar />}
            />
          </ReBarChart>
        </ResponsiveContainer>
      ) : (
        <div className="bar-chart-empty">No monthly data to display.</div>
      )}
    </div>
  );
};

export default BarChart;
