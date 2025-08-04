"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Phone, Clock, Target } from "lucide-react"

const kpis = [
  {
    title: "Total Calls",
    value: "1,247",
    change: "+12.3%",
    trend: "up",
    icon: Phone,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Avg Call Duration",
    value: "6m 42s",
    change: "+5.2%",
    trend: "up",
    icon: Clock,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Conversion",
    value: "68.7%",
    change: "+8.4%",
    trend: "up",
    icon: Target,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Tours Scheduled",
    value: "342",
    change: "+15.7%",
    trend: "up",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-500",
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-4 border-b border-gray-200">
      {kpis.map((kpi, index) => (
        <Card
          key={index}
          className={`border-0 bg-white rounded-none hover:bg-gray-50 transition-colors duration-200 ${
            index < 3 ? "border-r border-gray-200" : ""
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-3xl font-bold text-gray-900 tracking-tight">{kpi.value}</p>
                <div className="flex items-center space-x-1">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 bg-gradient-to-r ${kpi.gradient} flex items-center justify-center`}>
                <kpi.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
