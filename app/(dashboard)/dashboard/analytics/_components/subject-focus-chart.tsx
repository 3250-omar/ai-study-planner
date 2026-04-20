"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export type SubjectFocusSlice = { name: string; value: number; color: string };

export function SubjectFocusChart({
  data,
  totalHoursLabel,
}: {
  data: SubjectFocusSlice[];
  totalHoursLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm flex flex-col h-[320px]">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
        Subject Focus
      </h3>
      
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        {/* Chart */}
        <div className="relative h-[160px] w-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", fontSize: "12px", color: "#fff" }} 
                itemStyle={{ color: "#fff" }} 
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Inner Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold tracking-tight">{totalHoursLabel}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-3 mt-auto">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span 
                  className="size-2 rounded-full shrink-0" 
                  style={{ backgroundColor: item.color }} 
                />
                <span className="text-xs font-medium text-foreground">
                  {item.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
