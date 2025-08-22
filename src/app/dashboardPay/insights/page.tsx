'use client'

import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import CustomLineChart from './RevenueChart'

const chartData = [
  { label: 'Aug 1', value: 1220 },
  { label: 'Aug 2', value: 1340 },
  { label: 'Aug 3', value: 1410 },
  { label: 'Aug 4', value: 1500 },
  { label: 'Aug 5', value: 1675 },
  { label: 'Aug 6', value: 1690 },
  { label: 'Aug 7', value: 1725 },
  { label: 'Aug 8', value: 1810 },
  { label: 'Aug 9', value: 1900 },
  { label: 'Aug 10', value: 1855 },
  { label: 'Aug 11', value: 1970 },
  { label: 'Aug 12', value: 2010 },
  { label: 'Aug 13', value: 2115 },
  { label: 'Aug 14', value: 2230 },
]

export default function InsightsCard() {
  const [hoverData, setHoverData] = useState<{ label: string; value: number } | null>(null)

  return (
    <Card className="relative">
      {/* Sticky tooltip */}
      {hoverData && (
      <div className="absolute top-4 right-4 z-10 bg-white border border-zinc-200 rounded-md px-4 py-3 text-black text-sm pointer-events-none">
        <div className="text-sm text-zinc-500">{hoverData.label}</div>
        <div className="text-sm font-semibold tracking-tight text-black">
          {hoverData.value.toLocaleString()} $
        </div>
      </div>
    )}


      <CardHeader className="flex items-start justify-between">
        {/* Revenue block (top-left) */}
        <div className="space-y-1">
          <div className="text-sm text-zinc-500">Total Revenue</div>
          <div className="text-2xl font-semibold tracking-tight text-black">
            $15,231.89
          </div>
          <div className="text-sm text-green-600 font-medium">
            +20.1% from last month
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CustomLineChart data={chartData} onHoverChange={setHoverData} />
      </CardContent>

      <CardFooter className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
        <TrendingUp className="w-4 h-4 text-green-600" />
        Up 7.5% from last week
      </CardFooter>
    </Card>
  )
}
