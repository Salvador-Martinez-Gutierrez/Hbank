'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import type {
  ChartConfig
} from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import type { NormalizedItem } from '../utils/listedItems'

interface PriceBin {
  range: string
  count: number
}

function createPriceBins (items: NormalizedItem[]): PriceBin[] {
  const prices = items.map(item => item.price)
  const floorPrice = Math.min(...prices)

  // Define percentage thresholds
  const thresholds = [
    { threshold: 1.1, label: '+10%' }, // Floor to +10%
    { threshold: 1.25, label: '+25%' }, // +10% to +25%
    { threshold: 1.5, label: '+50%' }, // +25% to +50%
    { threshold: 2, label: '+100%' }, // +50% to +100%
    { threshold: 3, label: '+200%' }, // +100% to +200%
    { threshold: Infinity, label: '>200%' } // Above +200%
  ]

  const bins: PriceBin[] = []
  let prevThreshold = 1 // Starting at floor price (100%)

  for (const { threshold, label } of thresholds) {
    const count = items.filter(item =>
      item.price >= floorPrice * prevThreshold &&
      item.price < floorPrice * threshold
    ).length

    if (count > 0) {
      bins.push({
        range: label,
        count
      })
    }
    prevThreshold = threshold
  }

  return bins
}

interface ListingPriceDistributionChartProps {
  updatedListedItems: NormalizedItem[]
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export default function ListingPriceDistributionChart ({ updatedListedItems }: ListingPriceDistributionChartProps) {
  const chartData = createPriceBins(updatedListedItems)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Price Distribution</CardTitle>
        <CardDescription>Number of listings per price range</CardDescription>
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
            <Bar dataKey="count" fill="rgb(59 130 246)" radius={8}>
              <LabelList
                dataKey="count"
                position="top"
                offset={12}
                className="fill-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
