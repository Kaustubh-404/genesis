import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Upload, DollarSign, Zap, Shield, Star, TrendingUp, ArrowRight, Users, Globe, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60" /> */}
        {/* <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40" /> */}
        {/* <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-50" /> */}
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

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/app" className="text-gray-300 hover:text-white transition-all duration-300 font-medium">
                Browse
              </Link>
              <Link href="/app" className="text-gray-300 hover:text-white transition-all duration-300 font-medium">
                Creator Studio
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white border-0 shadow-2xl px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <Link href="/app">
                  Launch App
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 mb-12 hover:bg-white/10 transition-all duration-300">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300 font-medium">Powered by Filecoin PDP & FilCDN</span>
              <Star className="w-4 h-4 text-cyan-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-7xl lg:text-8xl font-black mb-8 leading-none">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                The Future of
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mt-4">
                Video Streaming
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Experience ultra-fast decentralized streaming with instant monetization. Upload, stream, and earn USDFC
              tokens on the most advanced Web3 platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white border-0 shadow-2xl text-xl px-12 py-6 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25"
              >
                <Link href="/app">
                  <Play className="w-6 h-6 mr-3" fill="white" />
                  Upload Now
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-xl text-xl px-12 py-6 rounded-2xl font-bold bg-transparent transition-all duration-300 hover:scale-105"
              >
                <Link href="/app">
                  <Upload className="w-6 h-6 mr-3" />
                  Become a Creator
                </Link>
              </Button>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-gray-400 font-medium">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  1M+
                </div>
                <div className="text-gray-400 font-medium">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  50K+
                </div>
                <div className="text-gray-400 font-medium">Creators</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  $2M+
                </div>
                <div className="text-gray-400 font-medium">Earned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Why Auralis?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Built for creators, powered by cutting-edge Web3 technology
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <Card className="group relative border-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl hover:from-white/10 hover:to-white/5 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-white text-2xl mb-6 font-bold">Lightning Fast</CardTitle>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Ultra-low latency streaming powered by FilCDN delivers instant video loading with zero buffering
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="group relative border-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl hover:from-white/10 hover:to-white/5 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-white text-2xl mb-6 font-bold">Instant Monetization</CardTitle>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Earn USDFC tokens through ads, tips, and subscriptions with transparent, real-time payouts
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="group relative border-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-2xl hover:from-white/10 hover:to-white/5 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-white text-2xl mb-6 font-bold">Truly Decentralized</CardTitle>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Your content lives on Filecoin forever, with guaranteed availability and complete ownership
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative z-10 py-32 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Trusted by Creators Worldwide
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-400">Active Creators</div>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">180+</div>
                <div className="text-gray-400">Countries</div>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">$2M+</div>
                <div className="text-gray-400">Paid Out</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Ready to Go Viral?
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join the revolution. Upload your first video and start earning today.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white border-0 shadow-2xl text-xl px-16 py-8 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25"
            >
              <Link href="/app">
                <Play className="w-6 h-6 mr-3" fill="white" />
                Launch Auralis Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-2xl py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Play className="w-6 h-6 text-white" fill="white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-30" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Auralis</h3>
                <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">Creators First, Always</p>
              </div>
            </div>
            <div className="text-gray-400 font-medium">Powered by Filecoin PDP & FilCDN • Built for the Future</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
