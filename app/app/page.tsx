"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnection } from "@/components/wallet-connection"
import { VideoUpload } from "@/components/video-upload"
import { VideoGrid } from "@/components/video-grid"
import { CreatorDashboard } from "@/components/creator-dashboard"
import { Play, Upload, BarChart3, Wallet, Sparkles, Zap } from "lucide-react"

export default function AppPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [balance, setBalance] = useState("0")

  return (
    <div className="min-h-screen bg-black relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.1),transparent_50%)]" />
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 bg-black/50 backdrop-blur-2xl sticky top-0">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Play className="w-6 h-6 text-white" fill="white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-30" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  Auralis
                </h1>
                <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Creators First, Always</p>
              </div>
            </div>
            <WalletConnection
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              walletAddress={walletAddress}
              setWalletAddress={setWalletAddress}
              balance={balance}
              setBalance={setBalance}
            />
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {!isConnected ? (
          <div className="text-center py-32">
            <div className="relative mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Wallet className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-xl opacity-30" />
              <div className="absolute top-4 right-4">
                <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
            </div>

            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Connect Your Wallet
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect your MetaMask wallet to unlock the full power of Auralis and start your decentralized streaming
              journey
            </p>

            <div className="flex items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Decentralized</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Creator-First</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto h-full">
            <Tabs defaultValue="browse" className="w-full">
              <TabsList className="grid w-full h-full grid-cols-4 bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-3xl mb-12">
                <TabsTrigger
                  value="browse"
                  className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-300 py-4 px-6 font-semibold"
                >
                  <Play className="w-5 h-5" />
                  Browse
                </TabsTrigger>
                <TabsTrigger
                  value="upload"
                  className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-300 py-4 px-6 font-semibold"
                >
                  <Upload className="w-5 h-5" />
                  Upload
                </TabsTrigger>
                <TabsTrigger
                  value="dashboard"
                  className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-300 py-4 px-6 font-semibold"
                >
                  <BarChart3 className="w-5 h-5" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="wallet"
                  className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white text-gray-300 rounded-2xl transition-all duration-300 py-4 px-6 font-semibold"
                >
                  <Wallet className="w-5 h-5" />
                  Wallet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="mt-8">
                <div className="min-h-screen">
                  <VideoGrid />
                </div>
              </TabsContent>

              <TabsContent value="upload" className="mt-8">
                <div className="min-h-screen">
                  <VideoUpload walletAddress={walletAddress} />
                </div>
              </TabsContent>

              <TabsContent value="dashboard" className="mt-8">
                <div className="min-h-screen">
                  <CreatorDashboard walletAddress={walletAddress} />
                </div>
              </TabsContent>

              <TabsContent value="wallet">
                <div className="max-w-4xl mx-auto">
                  <Card className="border-0 bg-white/5 backdrop-blur-2xl shadow-2xl">
                    <CardHeader className="text-center pb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Wallet className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-white text-3xl font-bold">Wallet Information</CardTitle>
                      <CardDescription className="text-gray-300 text-lg">
                        Your USDFC balance and transaction history
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                          <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-gray-300 text-lg font-medium">USDFC Balance</span>
                              <Zap className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                              {balance}
                            </div>
                          </div>
                        </div>

                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                          <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-gray-300 text-lg font-medium">Wallet Address</span>
                              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                            </div>
                            <div className="text-lg text-gray-300 font-mono bg-white/5 px-4 py-3 rounded-xl">
                              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
