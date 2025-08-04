"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "00:00", calls: 12, conversions: 8, engagement: 85 },
  { time: "04:00", calls: 8, conversions: 5, engagement: 78 },
  { time: "08:00", calls: 24, conversions: 18, engagement: 92 },
  { time: "12:00", calls: 32, conversions: 22, engagement: 88 },
  { time: "16:00", calls: 28, conversions: 19, engagement: 85 },
  { time: "20:00", calls: 16, conversions: 11, engagement: 82 },
]

export function CallPerformanceChart() {
  return (
    <Card className="border-0 border-r border-gray-200 bg-white rounded-none h-full">
      <CardHeader className="pb-2 py-3 border-b border-gray-200">
        <CardTitle className="text-base font-semibold text-gray-900">Call Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-6 h-[calc(100%-80px)]">
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="callsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="calls"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#callsGradient)"
                name="Total Calls"
              />
              <Area
                type="monotone"
                dataKey="conversions"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#conversionsGradient)"
                name="Conversions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
