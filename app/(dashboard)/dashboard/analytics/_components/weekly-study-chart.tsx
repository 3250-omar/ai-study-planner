"use client";

import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "MON", actual: 1.5, target: 4 },
  { day: "TUE", actual: 1.8, target: 4 },
  { day: "WED", actual: 2.2, target: 4 },
  { day: "THU", actual: 4.8, target: 4 },
  { day: "FRI", actual: 3.1, target: 4 },
  { day: "SAT", actual: 7.2, target: 4 },
  { day: "SUN", actual: 4.0, target: 4 },
];

export function WeeklyStudyChart() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm flex flex-col h-[320px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Weekly Study Hours
        </h3>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#818cf8]" />
            ACTUAL
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            TARGET
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: "#888", fontWeight: 600 }}
              dy={15}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", fontSize: "12px", color: "#fff" }} 
              itemStyle={{ color: "#fff" }} 
              cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#818cf8"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorActual)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
