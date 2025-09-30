// BankDashDonutChart.jsx
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const GRADS = [
  ["#b3e5fc", "#81d4fa"], // pastel sky blue
  ["#81d4fa", "#0288d1"], // bright sky blue → deep blue
  ["#a5b4fc", "#6366f1"], // periwinkle blue → indigo
  ["#5eead4", "#0d9488"], // aqua-teal → deep teal
  ["#bae6fd", "#0284c7"], // ice blue → vivid blue
  ["#c7d2fe", "#4338ca"], // pale indigo → royal blue
];

const currency = (n) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(1)}K`
    : `$${n.toFixed(2)}`;

const PillLegend = ({ items, colors }) => (
  <div className="pie-chart-legend">
    {items.map((it, i) => (
      <span key={it.name} className="pie-chart-legend-item">
        <span
          className="pie-chart-legend-dot"
          style={{ background: colors[i % colors.length][1] }}
        />
        {it.name}
      </span>
    ))}
  </div>
);

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="pie-chart-tooltip">
      <div className="pie-chart-tooltip-title">{p.name}</div>
      <div className="pie-chart-tooltip-label">Amount</div>
      <div className="pie-chart-tooltip-value">{currency(p.value)}</div>
    </div>
  );
};

export default function PieChart({ data }) {
  // Build data by category (expenses only)
  const { donutData, total } = useMemo(() => {
    const byCat = {};
    data
      .filter(
        (t) =>
          (t.type === "expense" && t.category) ||
          (t.type === "income" && t.category)
      )
      .forEach((t) => {
        const a = Math.abs(+t.amount || 0);
        byCat[t.category] = (byCat[t.category] || 0) + a;
      });
    const arr = Object.entries(byCat).map(([name, value]) => ({ name, value }));
    arr.sort((a, b) => b.value - a.value);
    const tot = arr.reduce((s, x) => s + x.value, 0);
    return { donutData: arr, total: tot };
  }, [data]);

  const uid = useMemo(() => Math.random().toString(36).slice(2), []);
  const defs = GRADS.map((g, i) => [`grad-${uid}-${i}`, g]);

  return (
    <div className="pie-chart-container">
      <h3 className="pie-chart-title">Expenses by Category</h3>
      <PillLegend items={donutData} colors={GRADS} />

      {donutData.length ? (
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <defs>
                {defs.map(([id, [from, to]]) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={from} />
                    <stop offset="100%" stopColor={to} />
                  </linearGradient>
                ))}
                <filter
                  id={`shadow-${uid}`}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="2"
                    stdDeviation="2"
                    floodOpacity="0.18"
                  />
                </filter>
              </defs>

              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
                stroke="transparent"
                labelLine={false}
                isAnimationActive
                animationDuration={500}
                animationEasing="ease-out"
                filter={`url(#shadow-${uid})`}
              >
                {donutData.map((_, i) => (
                  <Cell key={i} fill={`url(#${defs[i % defs.length][0]})`} />
                ))}
              </Pie>

              {/* center total */}
              <foreignObject x="35%" y="38%" width="30%" height="24%">
                <div className="pie-chart-center">
                  <div className="pie-chart-center-label">Total</div>
                  <div className="pie-chart-center-value">
                    {currency(total)}
                  </div>
                </div>
              </foreignObject>

              <Tooltip content={<Tip />} wrapperStyle={{ outline: "none" }} />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="pie-chart-empty">No expense data to display.</div>
      )}
    </div>
  );
}
