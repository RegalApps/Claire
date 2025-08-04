"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Clock, User, Eye } from "lucide-react"

const recentCalls = [
  {
    id: 1,
    prospectName: "John Smith",
    agent: "AI Agent v2.1",
    duration: "7m 20s",
    status: "completed",
    outcome: "appointment_scheduled",
    time: "2 hours ago",
    engagement: 85,
  },
  {
    id: 2,
    prospectName: "Lisa Wang",
    agent: "AI Agent v2.1",
    duration: "6m 20s",
    status: "completed",
    outcome: "information_requested",
    time: "3 hours ago",
    engagement: 91,
  },
  {
    id: 3,
    prospectName: "Robert Brown",
    agent: "AI Agent v2.1",
    duration: "4m 50s",
    status: "completed",
    outcome: "not_interested",
    time: "4 hours ago",
    engagement: 67,
  },
  {
    id: 4,
    prospectName: "Maria Garcia",
    agent: "AI Agent v2.0",
    duration: "8m 30s",
    status: "completed",
    outcome: "appointment_scheduled",
    time: "5 hours ago",
    engagement: 88,
  },
  {
    id: 5,
    prospectName: "James Wilson",
    agent: "AI Agent v2.1",
    duration: "ongoing",
    status: "in_progress",
    outcome: null,
    time: "10 minutes ago",
    engagement: null,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 rounded-none">
          Completed
        </Badge>
      )
    case "in_progress":
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 rounded-none">
          In Progress
        </Badge>
      )
    case "failed":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200 rounded-none">
          Failed
        </Badge>
      )
    default:
      return (
        <Badge variant="secondary" className="rounded-none">
          Unknown
        </Badge>
      )
  }
}

const getOutcomeBadge = (outcome: string | null) => {
  if (!outcome) return null

  switch (outcome) {
    case "appointment_scheduled":
      return (
        <Badge variant="outline" className="text-green-600 border-green-300 rounded-none">
          Appointment
        </Badge>
      )
    case "information_requested":
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-300 rounded-none">
          Info Request
        </Badge>
      )
    case "not_interested":
      return (
        <Badge variant="outline" className="text-gray-600 border-gray-300 rounded-none">
          Not Interested
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="rounded-none">
          {outcome}
        </Badge>
      )
  }
}

interface RecentCallsProps {
  showAll?: boolean
}

export function RecentCalls({ showAll = false }: RecentCallsProps) {
  const displayCalls = showAll ? recentCalls : recentCalls.slice(0, 5)

  return (
    <Card className="border-0 border-t-0 bg-white rounded-none">
      <CardHeader className="pb-2 py-3 border-b border-gray-200">
        <CardTitle className="text-base font-semibold text-gray-900">Recent Calls</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          {displayCalls.map((call) => (
            <div key={call.id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{call.prospectName}</h4>
                    {getOutcomeBadge(call.outcome)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{call.agent}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{call.duration}</span>
                    </div>
                    <span>{call.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {call.engagement && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{call.engagement}%</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                )}
                {getStatusBadge(call.status)}
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 rounded-none">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
