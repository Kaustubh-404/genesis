"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "@/components/video-player"
import { Play, DollarSign, Clock, Video, Upload, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { synapseIntegration, type UploadedVideo } from "@/lib/synapse-integration"

export function VideoGrid() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [videos, setVideos] = useState<UploadedVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadVideos = () => {
      try {
        const uploadedVideos = synapseIntegration.getUploadedVideos()
        setVideos(uploadedVideos)
        console.log("Loaded videos:", uploadedVideos.length)
      } catch (error) {
        console.error("Error loading videos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVideos()
  }, [])

  const playVideo = async (video: UploadedVideo) => {
    console.log("Playing video:", video.title, "CommP:", video.commp)
    setSelectedVideo(video.id)

    try {
      console.log("Preparing to download video from FilCDN...")
    } catch (error) {
      console.error("Failed to prepare video:", error)
      alert("Failed to load video. Please try again.")
      setSelectedVideo(null)
    }
  }

  if (selectedVideo) {
    const video = videos.find((v) => v.id === selectedVideo)
    return <VideoPlayer video={video!} onBack={() => setSelectedVideo(null)} />
  }

  if (isLoading) {
    return (
      <div className="text-center py-32">
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto animate-spin">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full blur-xl opacity-30" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Loading Videos...</h3>
        <p className="text-gray-400">Fetching content from the decentralized network</p>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-32">
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-white/10">
            <Video className="w-16 h-16 text-gray-400" />
          </div>
          <div className="absolute top-4 right-4">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          No Videos Yet
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Be the first to upload content to Auralis! Share your creativity with the decentralized world.
        </p>

        <Button
          asChild
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white border-0 shadow-2xl text-lg px-12 py-6 rounded-2xl font-bold transition-all duration-300 hover:scale-105"
        >
          <Link
            href="#"
            onClick={() => {
              // Switch to upload tab
              const uploadTab = document.querySelector('[value="upload"]') as HTMLElement
              uploadTab?.click()
            }}
          >
            <Upload className="w-6 h-6 mr-3" />
            Upload Your First Video
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          Discover Amazing Content
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Stream high-quality videos powered by FilCDN with ultra-low latency
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <Card
            key={video.id}
            className="group relative border-0 bg-white/5 backdrop-blur-2xl hover:bg-white/10 transition-all duration-500 hover:scale-105 overflow-hidden cursor-pointer"
            onClick={() => playVideo(video)}
          >
            {/* Hover Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-t-2xl overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg?height=200&width=300"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-black ml-1" fill="black" />
                  </div>
                </div>

                {/* Duration Badge */}
                <Badge className="absolute top-4 right-4 bg-black/70 text-white border-0">
                  <Clock className="w-3 h-3 mr-1" />
                  Video
                </Badge>
              </div>

              {/* Content */}
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-xl text-white line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {video.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{video.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{video.creator.slice(2, 4).toUpperCase()}</span>
                    </div>
                    <span className="text-gray-400 font-mono">
                      {video.creator.slice(0, 6)}...{video.creator.slice(-4)}
                    </span>
                  </div>

                  <span className="text-gray-500 text-xs">{new Date(video.uploadedAt).toLocaleDateString()}</span>
                </div>

                {/* Monetization Info */}
                {video.hasAds && (
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <Badge className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-400 border border-green-500/30">
                      💰 Monetized
                    </Badge>
                    <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                      <DollarSign className="w-4 h-4" />
                      {video.adRate} USDFC/view
                    </div>
                  </div>
                )}

                {/* Technical Info */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>Stored on Filecoin</span>
                    <span className="font-mono">{video.commp.slice(0, 8)}...</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
