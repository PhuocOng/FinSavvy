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
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000 ? `$${(n / 1_000).toFixed(1)}K`
  : `$${n.toFixed(2)}`;

const PillLegend = ({ items, colors }) => (
  <div className="flex flex-wrap gap-2 justify-end mb-3">
    {items.map((it, i) => (
      <span
        key={it.name}
        className="inline-flex items-center gap-2 rounded-full bg-gray-50 border border-gray-100 px-2.5 py-1 text-xs text-gray-700 shadow-sm"
      >
        <span
          className="h-2.5 w-2.5 rounded-full"
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
    <div className="rounded-xl bg-white shadow-xl border border-gray-100 px-3 py-2">
      <div className="text-sm font-medium text-gray-900">{p.name}</div>
      <div className="text-xs text-gray-600">Amount</div>
      <div className="text-sm font-semibold">{currency(p.value)}</div>
    </div>
  );
};

export default function PieChart({ data }) {
  // Build data by category (expenses only)
  const { donutData, total } = useMemo(() => {
    const byCat = {};
    data
      .filter((t) => t.type === "expense"  && t.category || t.type === "income" && t.category) 
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
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Expenses by Category</h3>
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
                <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.18" />
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
                <div className="flex flex-col items-center justify-center">
                  <div className="text-[11px] text-gray-500 leading-none mb-1">Total</div>
                  <div className="text-[18px] font-semibold text-gray-900 leading-none">
                    {currency(total)}
                  </div>
                </div>
              </foreignObject>

              <Tooltip content={<Tip />} wrapperStyle={{ outline: "none" }} />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-8 text-blue-500">No expense data to display.</div>
      )}
    </div>
  );
}