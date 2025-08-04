"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Loader2 } from "lucide-react"

export function CallTrigger() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    prospectName: "",
    prospectPhone: "",
    agent: "",
    callType: "outbound",
    propertyInterest: "",
  })

  const handleTriggerCall = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Reset form
    setFormData({
      prospectName: "",
      prospectPhone: "",
      agent: "",
      callType: "outbound",
      propertyInterest: "",
    })
  }

  return (
    <Card className="border-0 bg-white rounded-none h-full">
      <CardHeader className="pb-2 py-3 border-b border-gray-200">
        <CardTitle className="text-base font-semibold text-gray-900 flex items-center">Trigger Call</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div className="space-y-1">
          <Label htmlFor="prospectName" className="text-sm font-medium text-gray-700">
            Prospect Name
          </Label>
          <Input
            id="prospectName"
            placeholder="Enter prospect name"
            value={formData.prospectName}
            onChange={(e) => setFormData((prev) => ({ ...prev, prospectName: e.target.value }))}
            className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-none h-8"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="prospectPhone" className="text-sm font-medium text-gray-700">
            Phone Number
          </Label>
          <Input
            id="prospectPhone"
            placeholder="+1 (555) 000-0000"
            value={formData.prospectPhone}
            onChange={(e) => setFormData((prev) => ({ ...prev, prospectPhone: e.target.value }))}
            className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-none h-8"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="agent" className="text-sm font-medium text-gray-700">
            AI Agent
          </Label>
          <Select value={formData.agent} onValueChange={(value) => setFormData((prev) => ({ ...prev, agent: value }))}>
            <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-none h-8">
              <SelectValue placeholder="Select AI agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ai-agent-1">AI Agent v2.1 (Primary)</SelectItem>
              <SelectItem value="ai-agent-2">AI Agent v2.0 (Backup)</SelectItem>
              <SelectItem value="ai-agent-3">AI Agent v1.9 (Testing)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="propertyInterest" className="text-sm font-medium text-gray-700">
            Property Interest
          </Label>
          <Input
            id="propertyInterest"
            placeholder="e.g., 2BR downtown, waterfront studio"
            value={formData.propertyInterest}
            onChange={(e) => setFormData((prev) => ({ ...prev, propertyInterest: e.target.value }))}
            className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-none h-8"
          />
        </div>

        <Button
          onClick={handleTriggerCall}
          disabled={isLoading || !formData.prospectName || !formData.prospectPhone || !formData.agent}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-none h-8"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Initiating Call...
            </>
          ) : (
            <>
              <Phone className="w-4 h-4 mr-2" />
              Start Call
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
