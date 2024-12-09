'use client'

import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

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
  ChartTooltip
} from '@/components/ui/chart'
import type { NormalizedItem } from '../utils/listedItems'

interface ListingsPieChartProps {
  updatedListedItems: NormalizedItem[]
}

export function ListingsPieChart ({ updatedListedItems }: ListingsPieChartProps) {
  const chartData = React.useMemo(() => {
    const sentxCount = updatedListedItems.filter(item => item.marketplace === 'Sentx').length
    const kabilaCount = updatedListedItems.filter(item => item.marketplace === 'Kabila').length

    return [
      { market: 'sentx', listings: sentxCount, fill: '#3B82F6' },
      { market: 'kabila', listings: kabilaCount, fill: '#93C5FD' }
    ]
  }, [updatedListedItems])

  const chartConfig = {
    listings: {
      label: 'Listings'
    },
    sentx: {
      label: 'Sentx:',
      color: '#3B82F6'
    },
    kabila: {
      label: 'Kabila:',
      color: '#93C5FD'
    }
  } satisfies ChartConfig

  const totalListings = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.listings, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Market Distribution</CardTitle>
        <CardDescription>Listed Items by Marketplace</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active !== null && payload?.[0]?.payload !== undefined) {
                  const data = payload[0].payload
                  const percentage = ((data.listings / totalListings) * 100).toFixed(1)
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: data.fill }}
                          />
                          <span className="ml-2 capitalize">{data.market}</span>
                        </div>
                        <div>{data.listings} ({percentage}%)</div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Pie
              data={chartData}
              dataKey="listings"
              nameKey="market"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox !== null &&
                    viewBox !== undefined &&
                    'cx' in viewBox &&
                    'cy' in viewBox &&
                    typeof viewBox.cy === 'number' &&
                    !Number.isNaN(viewBox.cy)
                  ) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold"
                        >
                          {totalListings.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                          className="fill-muted-foreground"
                        >
                          Total Listings
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
