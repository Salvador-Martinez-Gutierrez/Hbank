/*
interface TokenPriceData {
  timestampSeconds: number
  avgUsd: number
}

export async function getPriceVolLiq (
  tokenId: string,
  fromUnixSeconds: number,
  toUnixSeconds: number,
  interval: string
): Promise<ChartData[]> {
  try {
    const response = await fetch(
      `https://api.saucerswap.finance/tokens/prices/${tokenId}?from=${fromUnixSeconds}&to=${toUnixSeconds}&interval=${interval}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: TokenPriceData[] = await response.json()

    // Sort data by timestamp in ascending order (older to newer)
    data.sort((a, b) => a.timestampSeconds - b.timestampSeconds)

    // Process data and return chart data
    const chartData: ChartData[] = data.map((item) => ({
      time: item.timestampSeconds,
      value: item.avgUsd
    }))

    return chartData
  } catch (error) {
    console.error('Error fetching token price data:', error)
    throw error
  }
}
*/
