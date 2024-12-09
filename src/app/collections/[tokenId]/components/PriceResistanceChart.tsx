'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import type { ChartConfig } from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import type { NormalizedItem } from '../utils/listedItems'

interface VolumeBin {
  range: string
  volume: number
}

function createVolumeBins (items: NormalizedItem[]): VolumeBin[] {
  const prices = items.map(item => item.price)
  const floorPrice = Math.min(...prices)

  const thresholds = [
    { threshold: 1.1, label: '+10%' },
    { threshold: 1.25, label: '+25%' },
    { threshold: 1.5, label: '+50%' },
    { threshold: 2, label: '+100%' },
    { threshold: 3, label: '+200%' },
    { threshold: 4, label: '+300%' }
  ]

  const bins: VolumeBin[] = []
  let prevThreshold = 1
  let cumulativeVolume = 0

  for (const { threshold, label } of thresholds) {
    const rangeItems = items.filter(item =>
      item.price >= floorPrice * prevThreshold &&
      item.price < floorPrice * threshold
    )

    const volumeInRange = rangeItems.reduce((sum, item) => sum + item.price, 0)

    if (volumeInRange > 0) {
      cumulativeVolume += volumeInRange
      bins.push({
        range: label,
        volume: Number(cumulativeVolume.toFixed(2))
      })
    }
    prevThreshold = threshold
  }

  return bins
}

interface PriceResistanceChartProps {
  updatedListedItems: NormalizedItem[]
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

function formatNumber (num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toLocaleString('en-US', { maximumFractionDigits: 2 }) + 'K'
  }
  return num.toFixed(2)
}

export default function PriceResistanceChart ({ updatedListedItems }: PriceResistanceChartProps) {
  const chartData = createVolumeBins(updatedListedItems)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Price Resistance</CardTitle>
        <CardDescription>HBAR volume needed to move the price</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="range"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              angle={-45}
              textAnchor="end"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="volume" fill="rgb(59 130 246)" radius={8}>
              <LabelList
                dataKey="volume"
                position="top"
                offset={12}
                className="fill-white"
                fontSize={12}
                formatter={formatNumber}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
