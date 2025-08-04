"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bot, Play, Pause, Download, Search, Clock, Phone } from "lucide-react"

const callHistory = [
  {
    id: 1,
    name: "Jennifer Walsh",
    phone: "+1-555-1234",
    duration: "420s",
    outcome: "scheduled_tour",
    timestamp: "Aug 3, 13:18",
    sentiment: "positive",
  },
  {
    id: 2,
    name: "David Thompson",
    phone: "+1-555-5678",
    duration: "285s",
    outcome: "qualified_lead",
    timestamp: "Aug 3, 13:18",
    sentiment: "positive",
  },
  {
    id: 3,
    name: "Lisa Park",
    phone: "+1-555-9012",
    duration: "180s",
    outcome: "not_interested",
    timestamp: "Aug 3, 13:18",
    sentiment: "negative",
  },
  {
    id: 4,
    name: "Michael Chen",
    phone: "+1-555-3456",
    duration: "340s",
    outcome: "callback_requested",
    timestamp: "Aug 3, 12:45",
    sentiment: "neutral",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    phone: "+1-555-7890",
    duration: "195s",
    outcome: "info_provided",
    timestamp: "Aug 3, 12:30",
    sentiment: "positive",
  },
]

const transcriptData = {
  1: {
    messages: [
      {
        speaker: "agent",
        content:
          "Hello Jennifer, this is your AI assistant from Premium Leasing. I understand you're interested in scheduling a tour?",
        timestamp: "00:00",
        confidence: 0.98,
      },
      {
        speaker: "prospect",
        content: "Yes, I'd love to see the 2-bedroom unit downtown that I inquired about.",
        timestamp: "00:05",
        confidence: 0.95,
      },
      {
        speaker: "agent",
        content: "Perfect! I have availability tomorrow at 2 PM or Thursday at 10 AM. Which works better for you?",
        timestamp: "00:12",
        confidence: 0.97,
      },
      {
        speaker: "prospect",
        content: "Tomorrow at 2 PM would be perfect. Should I bring anything specific?",
        timestamp: "00:18",
        confidence: 0.94,
      },
    ],
  },
}

const getOutcomeBadge = (outcome: string) => {
  switch (outcome) {
    case "scheduled_tour":
      return <Badge className="bg-green-100 text-green-700 border-green-200 rounded-none">scheduled tour</Badge>
    case "qualified_lead":
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-none">qualified lead</Badge>
    case "not_interested":
      return <Badge className="bg-red-100 text-red-700 border-red-200 rounded-none">not interested</Badge>
    case "callback_requested":
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 rounded-none">callback requested</Badge>
    case "info_provided":
      return <Badge className="bg-purple-100 text-purple-700 border-purple-200 rounded-none">info provided</Badge>
    default:
      return <Badge className="rounded-none">{outcome}</Badge>
  }
}

const getSentimentEmoji = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "😊"
    case "negative":
      return "😞"
    case "neutral":
      return "😐"
    default:
      return "😐"
  }
}

export function TranscriptViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAgent, setSelectedAgent] = useState("all")
  const [selectedOutcome, setSelectedOutcome] = useState("all")
  const [selectedCall, setSelectedCall] = useState<number | null>(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredCalls = callHistory.filter((call) => {
    const matchesSearch =
      call.name.toLowerCase().includes(searchQuery.toLowerCase()) || call.phone.includes(searchQuery)
    const matchesAgent = selectedAgent === "all" || true // All calls use AI agents
    const matchesOutcome = selectedOutcome === "all" || call.outcome === selectedOutcome

    return matchesSearch && matchesAgent && matchesOutcome
  })

  const currentTranscript = selectedCall ? transcriptData[selectedCall as keyof typeof transcriptData] : null

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">Call Transcripts</h1>
          <p className="text-gray-600">Review and analyze conversation details</p>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search transcripts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 rounded-lg"
            />
          </div>

          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="w-40 border-gray-300 rounded-lg">
              <SelectValue placeholder="All Agents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="ai-v2.1">AI Agent v2.1</SelectItem>
              <SelectItem value="ai-v2.0">AI Agent v2.0</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedOutcome} onValueChange={setSelectedOutcome}>
            <SelectTrigger className="w-48 border-gray-300 rounded-lg">
              <SelectValue placeholder="All Outcomes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outcomes</SelectItem>
              <SelectItem value="scheduled_tour">Scheduled Tour</SelectItem>
              <SelectItem value="qualified_lead">Qualified Lead</SelectItem>
              <SelectItem value="not_interested">Not Interested</SelectItem>
              <SelectItem value="callback_requested">Callback Requested</SelectItem>
              <SelectItem value="info_provided">Info Provided</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-gray-300 rounded-lg bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4">
        {/* Call History */}
        <div className="col-span-1 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Call History</h2>
          </div>
          <div className="overflow-y-auto">
            {filteredCalls.map((call) => (
              <div
                key={call.id}
                onClick={() => setSelectedCall(call.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedCall === call.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{call.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{call.phone}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{call.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-lg">{getSentimentEmoji(call.sentiment)}</span>
                    {getOutcomeBadge(call.outcome)}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{call.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Transcript Content */}
        <div className="col-span-3">
          {selectedCall && currentTranscript ? (
            <Card className="border-0 bg-white rounded-none h-full">
              <CardHeader className="pb-2 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold text-gray-900">
                      {callHistory.find((c) => c.id === selectedCall)?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Duration: {callHistory.find((c) => c.id === selectedCall)?.duration} •
                      {callHistory.find((c) => c.id === selectedCall)?.timestamp}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="border-gray-200 rounded-none"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 bg-transparent rounded-none">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 h-[calc(100%-80px)] overflow-y-auto">
                <div className="space-y-4">
                  {currentTranscript.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 ${
                        message.speaker === "agent" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 flex items-center justify-center ${
                          message.speaker === "agent"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600"
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
                        }`}
                      >
                        {message.speaker === "agent" ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 ${message.speaker === "agent" ? "text-right" : ""}`}>
                        <div
                          className={`inline-block max-w-xs lg:max-w-md xl:max-w-lg p-3 ${
                            message.speaker === "agent"
                              ? "bg-blue-50 text-blue-900 border border-blue-200"
                              : "bg-gray-50 text-gray-900 border border-gray-200"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                            <span>{message.timestamp}</span>
                            <Badge variant="outline" className="text-xs rounded-none">
                              {Math.round(message.confidence * 100)}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Phone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a call to view transcript</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
