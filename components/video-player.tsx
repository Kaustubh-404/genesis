"use client"

import { synapseIntegration, type UploadedVideo } from "@/lib/synapse-integration"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Pause, Volume2, Maximize, DollarSign } from "lucide-react"
import { AdOverlay } from "@/components/ad-overlay"

interface VideoPlayerProps {
  video: UploadedVideo
  onBack: () => void
}

export function VideoPlayer({ video, onBack }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAd, setShowAd] = useState(false)
  const [adCountdown, setAdCountdown] = useState(5)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isLoadingVideo, setIsLoadingVideo] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Load video from Filecoin (simulated)
    const loadVideo = async () => {
      try {
        setIsLoadingVideo(true)
        setLoadError(null)
        console.log("Starting video download for:", video.title)
        console.log("CommP:", video.commp)

        const downloadResult = await synapseIntegration.downloadVideo(video.commp)

        if (downloadResult.success && downloadResult.videoUrl) {
          console.log("Video download successful")
          console.log("Video URL length:", downloadResult.videoUrl.length)
          console.log("Video URL preview:", downloadResult.videoUrl.substring(0, 100) + "...")

          setVideoUrl(downloadResult.videoUrl)

          // Show ad before video starts if monetized
          if (video.hasAds) {
            console.log("Video has ads enabled, showing ad overlay")
            setShowAd(true)
            const countdown = setInterval(() => {
              setAdCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(countdown)
                  setShowAd(false)
                  console.log("Ad completed, starting video")
                  return 0
                }
                return prev - 1
              })
            }, 1000)
          }
        } else {
          console.error("Video download failed:", downloadResult.error)
          setLoadError(downloadResult.error || "Failed to load video from FilCDN")
        }
      } catch (error) {
        console.error("Error in loadVideo:", error)
        setLoadError("Error loading video: " + error.message)
      } finally {
        setIsLoadingVideo(false)
      }
    }

    loadVideo()

    // No cleanup needed for data URLs
  }, [video.commp, video.hasAds, video.title])

  // Add video load event handlers
  const handleVideoLoad = () => {
    console.log("Video element loaded successfully")
    setLoadError(null)
  }

  const handleVideoError = (e: any) => {
    console.error("Video element error:", e)
    console.error("Video error details:", e.target?.error)
    const errorMessage = e.target?.error?.message || "Unknown video playback error"
    setLoadError("Video playback error: " + errorMessage)
  }

  const handleVideoCanPlay = () => {
    console.log("Video can play - ready for playback")
  }

  const handleVideoLoadStart = () => {
    console.log("Video load started")
  }

  const togglePlay = () => {
    if (videoRef.current && videoUrl) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error)
          setLoadError("Error playing video: " + error.message)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAdComplete = () => {
    setShowAd(false)
    // Here you would send payment to creator
    console.log(`Paying ${video.adRate} USDFC to creator ${video.creator}`)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Button variant="outline" onClick={onBack} className="mb-4 bg-transparent">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Browse
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative bg-black aspect-video">
              {isLoadingVideo ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading video from Filecoin...</p>
                    <p className="text-sm text-gray-300 mt-2">CommP: {video.commp.substring(0, 20)}...</p>
                  </div>
                </div>
              ) : loadError ? (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center p-4 max-w-md">
                    <p className="text-red-400 mb-4">{loadError}</p>
                    <div className="space-y-2">
                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="text-white border-white hover:bg-white hover:text-black"
                      >
                        Retry
                      </Button>
                      <Button
                        onClick={() => synapseIntegration.clearUploadedVideos()}
                        variant="outline"
                        className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white ml-2"
                      >
                        Clear Storage
                      </Button>
                    </div>
                  </div>
                </div>
              ) : showAd ? (
                <AdOverlay countdown={adCountdown} onComplete={handleAdComplete} adRate={video.adRate} />
              ) : videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    src={videoUrl}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onLoadStart={handleVideoLoadStart}
                    onLoadedData={handleVideoLoad}
                    onCanPlay={handleVideoCanPlay}
                    onError={handleVideoError}
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <p className="text-white">Your browser does not support the video tag.</p>
                  </video>

                  {/* Custom Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4">
                      <Button size="sm" variant="ghost" onClick={togglePlay} className="text-white hover:bg-white/20">
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Volume2 className="w-5 h-5" />
                      </Button>
                      <div className="flex-1"></div>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Maximize className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <p>No video data available</p>
                </div>
              )}
            </div>
          </Card>

          {/* Video Info */}
          <Card className="mt-4">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
              <p className="text-gray-600 mb-4">{video.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-600 font-mono">Creator: {video.creator}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="text-sm">Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</div>
                    {video.hasAds && (
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="w-4 h-4" />
                        {video.adRate} USDFC per view
                      </div>
                    )}
                  </div>
                </div>

                {video.hasAds && <Badge className="bg-green-100 text-green-800">💰 Monetized Content</Badge>}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Stored on Filecoin</h3>
                <p className="text-sm text-gray-600 font-mono break-all">CommP: {video.commp}</p>
                <p className="text-sm text-gray-600 mt-1">Delivered via FilCDN for ultra-fast streaming</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Video Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Upload Date</span>
                  <span className="font-medium">{new Date(video.uploadedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ad Rate</span>
                  <span className="font-medium">{video.adRate} USDFC/view</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Storage</span>
                  <span className="font-medium text-blue-600">Filecoin PDP</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Support Creator</h3>
              <p className="text-sm text-gray-600 mb-4">Send USDFC directly to support this creator</p>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                <DollarSign className="w-4 h-4 mr-2" />
                Send Tip
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
