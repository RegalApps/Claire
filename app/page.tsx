"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Play, Pause, TrendingUp, PhoneCall, MessageSquare, BarChart3 } from "lucide-react"
import { CallPerformanceChart } from "@/components/call-performance-chart"
import { KPICards } from "@/components/kpi-cards"
import { CallTrigger } from "@/components/call-trigger"
import { TranscriptViewer } from "@/components/transcript-viewer"
import { RecentCalls } from "@/components/recent-calls"
import { AIPerformance } from "@/components/ai-performance"
import { UserProfile } from "@/components/auth/user-profile"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLive, setIsLive] = useState(true)

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-0 py-2">
          {" "}
          {/* Updated padding */}
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Claire</h1>
                  <p className="text-sm text-gray-500 font-medium">AI Voice Agent Dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${isLive ? "bg-green-500" : "bg-gray-400"}`} />
                <span className="text-sm font-medium text-gray-600">{isLive ? "Live" : "Offline"}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLive(!isLive)}
                className="border-gray-200 hover:bg-gray-50 font-medium"
              >
                {isLive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isLive ? "Pause" : "Resume"}
              </Button>
              <UserProfile />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-73px)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 bg-white border-b border-gray-200 p-0 rounded-none h-12">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gray-50 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-r border-gray-200 last:border-r-0 h-full font-medium"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="calls"
              className="data-[state=active]:bg-gray-50 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-r border-gray-200 last:border-r-0 h-full font-medium"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Calls
            </TabsTrigger>
            <TabsTrigger
              value="transcripts"
              className="data-[state=active]:bg-gray-50 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-r border-gray-200 last:border-r-0 h-full font-medium"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Transcripts
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gray-50 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none border-r border-gray-200 last:border-r-0 h-full font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto">
            <TabsContent value="overview" className="h-full m-0 p-0">
              <div className="h-full flex flex-col">
                <KPICards />
                <div className="flex-1 grid grid-cols-2">
                  <CallPerformanceChart />
                  <CallTrigger />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calls" className="h-full m-0 p-0">
              <div className="h-full grid grid-cols-4">
                <CallTrigger />
                <div className="col-span-3">
                  <RecentCalls showAll />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transcripts" className="h-full m-0 p-0">
              <TranscriptViewer />
            </TabsContent>

            <TabsContent value="analytics" className="m-0 p-0">
              <div className="flex flex-col">
                <div className="grid grid-cols-2">
                  <CallPerformanceChart />
                  <Card className="border-0 border-l border-gray-200 bg-white rounded-none">
                    <CardHeader className="border-b border-gray-200 pb-2 py-3">
                      <CardTitle className="text-base font-semibold text-gray-900">Performance Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Weekly Growth</span>
                          <span className="text-sm font-semibold text-green-600">+12.3%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Conversion Rate</span>
                          <span className="text-sm font-semibold text-blue-600">68.7%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Avg Response Time</span>
                          <span className="text-sm font-semibold text-purple-600">1.2s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">AI Confidence</span>
                          <span className="text-sm font-semibold text-orange-600">94.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-1">
                  <AIPerformance />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  )
}
