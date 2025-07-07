"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Video, DollarSign, Sparkles, Zap } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { synapseIntegration } from "@/lib/synapse-integration"

interface VideoUploadProps {
  walletAddress: string
}

export function VideoUpload({ walletAddress }: VideoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [enableAds, setEnableAds] = useState(true)
  const [adRevenue, setAdRevenue] = useState("0.10")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file)
    } else {
      alert("Please select a valid video file")
    }
  }

  const uploadVideo = async () => {
    if (!selectedFile || !title) {
      alert("Please select a video file and enter a title")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      console.log("Initializing Synapse SDK...")
      setUploadProgress(10)

      const initialized = await synapseIntegration.initialize()
      if (!initialized) {
        throw new Error("Failed to initialize Synapse SDK")
      }

      setUploadProgress(20)
      console.log("Approving operators...")
      await synapseIntegration.approveOperators()

      setUploadProgress(40)

      console.log("Uploading video to Filecoin...")
      setUploadProgress(60)

      const uploadResult = await synapseIntegration.uploadVideo(selectedFile, {
        title,
        description,
        hasAds: enableAds,
        adRate: adRevenue,
      })

      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "Upload failed")
      }

      setUploadProgress(100)

      alert(
        `Video uploaded successfully to Filecoin!\n\nCommP: ${uploadResult.commp}\n\nYour video is now available in the Browse section.`,
      )
      console.log("Upload result:", uploadResult)

      setSelectedFile(null)
      setTitle("")
      setDescription("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      window.location.reload()
    } catch (error) {
      console.error("Upload failed:", error)
      alert(`Upload failed: ${error.message}`)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="flex items-center gap-3 justify-center text-white text-2xl">
            Upload Video
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </CardTitle>
          <CardDescription className="text-purple-200 text-lg">
            Upload your video to the decentralized network and start earning USDFC
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* File Upload */}
          <div className="space-y-3">
            <Label htmlFor="video-file" className="text-purple-100 text-lg font-medium">
              Video File
            </Label>
            <div className="border-2 border-dashed border-purple-400/30 rounded-2xl p-12 text-center hover:border-purple-400/50 transition-colors bg-gradient-to-br from-purple-500/5 to-cyan-500/5">
              <input
                ref={fileInputRef}
                id="video-file"
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="mb-6 text-white bg-white/10 backdrop-blur-sm"
              >
                <Video className="w-5 h-5 mr-2" />
                Choose Video File
              </Button>
              {selectedFile && (
                <div className="mt-6 p-6 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-xl border border-white/10">
                  <p className="font-medium text-white text-lg">{selectedFile.name}</p>
                  <p className="text-purple-200 mt-1">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Video Details */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-purple-100 text-lg font-medium">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400 text-lg p-4"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-purple-100 text-lg font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your video"
                rows={4}
                className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400 text-lg p-4"
              />
            </div>
          </div>

          {/* Monetization Settings */}
          <Card className="border-0 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-purple-500/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-green-400" />
                Monetization Settings
                <Zap className="w-5 h-5 text-cyan-400" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-ads" className="text-purple-100 text-lg font-medium">
                    Enable Ads
                  </Label>
                  <p className="text-purple-300 mt-1">Allow ads on your video to earn revenue</p>
                </div>
                <Switch id="enable-ads" checked={enableAds} onCheckedChange={setEnableAds} />
              </div>

              {enableAds && (
                <div className="space-y-3">
                  <Label htmlFor="ad-revenue" className="text-purple-100 text-lg font-medium">
                    Ad Revenue Rate (USDFC per view)
                  </Label>
                  <Input
                    id="ad-revenue"
                    type="number"
                    step="0.01"
                    value={adRevenue}
                    onChange={(e) => setAdRevenue(e.target.value)}
                    placeholder="0.10"
                    className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 focus:border-green-400 text-lg p-4"
                  />
                  <p className="text-green-300 text-sm">Estimated earnings: {adRevenue} USDFC per ad view</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-4">
              <div className="flex justify-between text-purple-100">
                <span className="font-medium">Uploading to Filecoin...</span>
                <span className="font-bold">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full h-3 bg-purple-900/50" />
            </div>
          )}

          {/* Upload Button */}
          <Button
            onClick={uploadVideo}
            disabled={!selectedFile || !title || isUploading}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0 shadow-xl text-lg py-6"
            size="lg"
          >
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-3" />
                Upload to Filecoin
              </>
            )}
          </Button>

          {enableAds && (
            <div className="text-center p-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-2xl border border-green-400/20">
              <Badge className="bg-gradient-to-r from-green-500 to-cyan-500 text-white border-0 text-base px-4 py-2">
                💰 Monetization Enabled
              </Badge>
              <p className="text-green-300 mt-3 text-lg">
                Your video will display ads and earn {adRevenue} USDFC per view
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
