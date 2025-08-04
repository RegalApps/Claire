"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Zap, Brain, Activity } from "lucide-react"

const aiMetrics = [
  {
    name: "Response Accuracy",
    value: 94.2,
    status: "excellent",
    description: "AI response relevance and accuracy",
  },
  {
    name: "Natural Language Processing",
    value: 91.8,
    status: "excellent",
    description: "Understanding of customer intent",
  },
  {
    name: "Conversation Flow",
    value: 88.5,
    status: "good",
    description: "Maintaining natural conversation",
  },
  {
    name: "Objection Handling",
    value: 85.3,
    status: "good",
    description: "Addressing customer concerns",
  },
  {
    name: "Information Retrieval",
    value: 96.7,
    status: "excellent",
    description: "Accessing relevant property data",
  },
]

const systemHealth = [
  {
    metric: "CPU Usage",
    value: 23,
    status: "healthy",
    icon: Cpu,
  },
  {
    metric: "Memory Usage",
    value: 45,
    status: "healthy",
    icon: Activity,
  },
  {
    metric: "Response Time",
    value: 12,
    status: "excellent",
    unit: "ms",
    icon: Zap,
  },
  {
    metric: "Model Confidence",
    value: 94,
    status: "excellent",
    unit: "%",
    icon: Brain,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-green-100 text-green-700 border-green-200"
    case "good":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "warning":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "critical":
      return "bg-red-100 text-red-700 border-red-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export function AIPerformance() {
  return (
    <div className="border-t border-gray-200">
      <div className="grid grid-cols-2">
        <Card className="border-0 bg-white rounded-none">
          <CardHeader className="pb-2 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div>
                <CardTitle className="text-base font-semibold text-gray-900">Common Questions</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            {[
              { question: "What's the monthly rent?", frequency: 89, count: 234 },
              { question: "Are pets allowed?", frequency: 76, count: 198 },
              { question: "What amenities are included?", frequency: 68, count: 178 },
              { question: "When is it available?", frequency: 62, count: 162 },
              { question: "Can I schedule a viewing?", frequency: 58, count: 152 },
              { question: "What's the lease term?", frequency: 45, count: 118 },
              { question: "Is parking included?", frequency: 38, count: 99 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{item.question}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{item.count}x</span>
                    <span className="text-sm font-medium text-gray-900">{item.frequency}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2"
                    style={{ width: `${item.frequency}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 border-l border-gray-200 bg-white rounded-none">
          <CardHeader className="pb-2 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div>
                <CardTitle className="text-base font-semibold text-gray-900">Call Volume</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Today's Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">127</div>
                  <div className="text-xs text-gray-500">Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+18%</div>
                  <div className="text-xs text-gray-500">vs Yesterday</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">892</div>
                  <div className="text-xs text-gray-500">This Week</div>
                </div>
              </div>

              {/* Hourly Distribution */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Hourly Distribution</h4>
                {[
                  { hour: "9-10 AM", calls: 23, percentage: 85 },
                  { hour: "10-11 AM", calls: 31, percentage: 100 },
                  { hour: "11-12 PM", calls: 28, percentage: 90 },
                  { hour: "1-2 PM", calls: 19, percentage: 65 },
                  { hour: "2-3 PM", calls: 26, percentage: 80 },
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.hour}</span>
                      <span className="font-medium text-gray-900">{item.calls} calls</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Peak Hours */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Peak Hour</span>
                  <span className="text-sm font-medium text-gray-900">10-11 AM</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Avg Response Time</span>
                  <span className="text-sm font-medium text-gray-900">1.2s</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
