"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Clock } from "lucide-react"

interface AdOverlayProps {
  countdown: number
  onComplete: () => void
  adRate: string
}

export function AdOverlay({ countdown, onComplete, adRate }: AdOverlayProps) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
      <Card className="max-w-md mx-4">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Supporting Creator</h3>

          <p className="text-purple-100 mb-6">This ad helps creators earn {adRate} USDFC from your view</p>

          <div className="bg-white/20 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-2 text-white">
              <Clock className="w-5 h-5" />
              <span className="text-2xl font-bold">{countdown}</span>
            </div>
            <p className="text-purple-100 text-sm mt-1">seconds remaining</p>
          </div>

          <Badge className="bg-green-500 text-white">💰 Creator Revenue: {adRate} USDFC</Badge>
        </CardContent>
      </Card>
    </div>
  )
}
