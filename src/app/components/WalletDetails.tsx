import { Wallet, ArrowUpRight, ArrowDownLeft, Coins } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletData } from '@/app/search/page';
interface WalletDetailsProps {
  walletData: WalletData | null;
  isLoading: boolean;
}

const WalletDetails: React.FC<WalletDetailsProps> = ({ walletData, isLoading })  => {
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-4 sm:mt-8 px-4">
        <div className="glass-panel p-4 sm:p-6 animate-pulse">
          <div className="h-6 sm:h-8 bg-gray-700/50 rounded w-1/3 mb-4"></div>
          <div className="space-y-2 sm:space-y-3">
            <div className="h-3 sm:h-4 bg-gray-700/50 rounded w-full"></div>
            <div className="h-3 sm:h-4 bg-gray-700/50 rounded w-5/6"></div>
            <div className="h-3 sm:h-4 bg-gray-700/50 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!walletData) return null

  const { address, balance, transactions } = walletData

  return (
    <div className="w-full max-w-7xl mx-auto mt-4 sm:mt-8 px-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-400">Wallet Balance</CardTitle>
            <Coins className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-white">{balance} ETH</div>
            <p className="text-xs text-gray-400 mt-1">Last updated: {new Date().toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-400">Recent Outgoing</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-white">{transactions?.outgoing || 0}</div>
            <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-400">Recent Incoming</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-white">{transactions?.incoming || 0}</div>
            <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl flex items-center text-white font-extra-bold">
              <Wallet className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              Wallet Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4 text-gray-400">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-400">Address</p>
                <p className="font-mono text-xs sm:text-sm mt-1 text-white break-all">{address}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-400">First Transaction</p>
                <p className="text-xs sm:text-sm mt-1 text-white">{transactions?.firstTx || "No transactions found"}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-400">Last Transaction</p>
                <p className="text-xs sm:text-sm mt-1 text-white">{transactions?.lastTx || "No transactions found"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default WalletDetails;
