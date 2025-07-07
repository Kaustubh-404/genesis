"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DollarSign, Eye, Video, TrendingUp, Download } from "lucide-react"

interface CreatorDashboardProps {
  walletAddress: string
}

// Mock data
const revenueData = [
  { month: "Jan", revenue: 120.5, views: 1200 },
  { month: "Feb", revenue: 180.75, views: 1800 },
  { month: "Mar", revenue: 250.25, views: 2500 },
  { month: "Apr", revenue: 320.8, views: 3200 },
  { month: "May", revenue: 410.3, views: 4100 },
  { month: "Jun", revenue: 520.9, views: 5200 },
]

const myVideos = [
  {
    id: "1",
    title: "Building Web3 Applications",
    views: 1250,
    earnings: "125.50",
    status: "Published",
    adRate: "0.10",
  },
  {
    id: "2",
    title: "Filecoin Storage Deep Dive",
    views: 890,
    earnings: "89.00",
    status: "Published",
    adRate: "0.10",
  },
  {
    id: "3",
    title: "DeFi Trading Strategies",
    views: 2100,
    earnings: "210.00",
    status: "Published",
    adRate: "0.10",
  },
]

export function CreatorDashboard({ walletAddress }: CreatorDashboardProps) {
  const totalEarnings = myVideos.reduce((sum, video) => sum + Number.parseFloat(video.earnings), 0)
  const totalViews = myVideos.reduce((sum, video) => sum + video.views, 0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Creator Dashboard</h2>
        <p className="text-gray-600">Track your content performance and earnings</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">{totalEarnings.toFixed(2)} USDFC</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Videos Published</p>
                <p className="text-2xl font-bold">{myVideos.length}</p>
              </div>
              <Video className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Revenue/View</p>
                <p className="text-2xl font-bold">0.10 USDFC</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>Your monthly earnings and view trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue (USDFC)",
                color: "hsl(var(--chart-1))",
              },
              views: {
                label: "Views",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  name="Revenue (USDFC)"
                />
                <Line yAxisId="right" type="monotone" dataKey="views" stroke="var(--color-views)" name="Views" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* My Videos */}
      <Card>
        <CardHeader>
          <CardTitle>My Videos</CardTitle>
          <CardDescription>Manage your uploaded content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myVideos.map((video) => (
              <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{video.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {video.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      {video.earnings} USDFC
                    </div>
                    <Badge variant="secondary">{video.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payout Section */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Payout</CardTitle>
          <CardDescription>Withdraw your earnings to your wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg mb-4">
            <div>
              <p className="font-semibold">Available Balance</p>
              <p className="text-2xl font-bold text-green-600">{totalEarnings.toFixed(2)} USDFC</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="w-4 h-4 mr-2" />
              Withdraw Earnings
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Earnings are automatically paid out to your connected wallet: {walletAddress.slice(0, 6)}...
            {walletAddress.slice(-4)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
