"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, ChevronDown, Zap } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { synapseIntegration } from "@/lib/synapse-integration"

interface WalletConnectionProps {
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
  walletAddress: string
  setWalletAddress: (address: string) => void
  balance: string
  setBalance: (balance: string) => void
}

export function WalletConnection({
  isConnected,
  setIsConnected,
  walletAddress,
  setWalletAddress,
  balance,
  setBalance,
}: WalletConnectionProps) {
  const [isLoading, setIsLoading] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!")
      return
    }

    setIsLoading(true)
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
        setIsConnected(true)
        await initializeSynapse(accounts[0])
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const initializeSynapse = async (address: string) => {
    try {
      const initialized = await synapseIntegration.initialize()
      if (initialized) {
        const realBalance = await synapseIntegration.getBalance()
        setBalance(realBalance)
      }
    } catch (error) {
      console.error("Failed to initialize Synapse:", error)
      setBalance("0")
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
    setBalance("0")
  }

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        disabled={isLoading}
        className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white border-0 shadow-2xl px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
      >
        <div className="flex items-center gap-3">
          <Wallet className="w-5 h-5" />
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </div>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative bg-white/5 backdrop-blur-2xl border-white/10 text-white hover:bg-white/10 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse" />
              <span className="font-mono text-sm font-medium">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </div>
            <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0 px-3 py-1 font-semibold">
              <Zap className="w-3 h-3 mr-1" />
              {balance} USDFC
            </Badge>
            <ChevronDown className="w-4 h-4 opacity-60" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-2xl border-white/10 text-white rounded-2xl">
        <DropdownMenuItem onClick={disconnectWallet} className="hover:bg-white/10 rounded-xl">
          Disconnect Wallet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
