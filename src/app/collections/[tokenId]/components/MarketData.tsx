import type { TokenInfo } from './CollectionInfo'

interface MarketDataProps {
  tokenInfo: TokenInfo
}

const MarketData: React.FC<MarketDataProps> = ({ tokenInfo }) => {
  // Utility function to format numbers with commas
  const formatNumber = (number: number) => {
    return number.toLocaleString('en-US')
  }
  let marketCap
  let FDV
  if (tokenInfo.floorPrice !== null && tokenInfo.mintedSupply !== undefined && tokenInfo.burntSupply !== undefined) {
    marketCap = tokenInfo.floorPrice * (tokenInfo.mintedSupply - tokenInfo.burntSupply)
  }
  if (tokenInfo.floorPrice !== null && tokenInfo.maxSupply !== undefined && tokenInfo.burntSupply !== undefined) {
    FDV = tokenInfo.floorPrice * (tokenInfo.maxSupply - tokenInfo.burntSupply)
  } return (
    <>
      <table className="text-neutral-200 table-auto md:hidden">
        <thead>
          <tr>
            <th className="text-left whitespace-nowrap px-4 text-[0.75rem] text-muted-foreground xl:text-sm">Floor Price</th>
            <th className="text-left whitespace-nowrap px-4 text-[0.75rem] text-muted-foreground xl:text-sm">Market Cap</th>
            <th className="text-left whitespace-nowrap px-4 text-[0.75rem] text-muted-foreground xl:text-sm">FDV</th>
            <th className="text-left whitespace-nowrap px-4 text-[0.75rem] text-muted-foreground xl:text-sm">Minted / Supply</th>
            <th className="text-left whitespace-nowrap px-4 text-[0.75rem] text-muted-foreground xl:text-sm">Burnt Supply</th>
            <th className="text-left whitespace-nowrap px-4 text-[0.75rem] text-muted-foreground xl:text-sm">Royalties</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${tokenInfo.floorPrice} ℏ`}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${marketCap} ℏ`}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${FDV} ℏ`}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${tokenInfo.mintedSupply} / ${tokenInfo.maxSupply}`}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{tokenInfo.burntSupply}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${formatNumber(tokenInfo.royalties)}%`}</td>
          </tr>
        </tbody>
      </table>

      <div className='hidden items-center justify-end gap-8 md:grid md:w-fit md:min-w-fit md:grid-cols-3 md:gap-4 2xl:flex 2xl:gap-8 4xl:gap-16'>
        <div className="flex flex-col md:items-end">
          <p className="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">Floor Price</p>
          <div className="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">
            <span id="floor-price">{`${tokenInfo.floorPrice} ℏ`}</span>
          </div>
        </div>
        <div className="flex flex-col md:items-end">
          <p className="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">Market Cap</p>
            <div className="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${marketCap} ℏ`}</div>
        </div>
        <div className="flex flex-col md:items-end">
          <p className="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">FDV</p>
            <div className="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${FDV} ℏ`}</div>
        </div>
        <div className="flex flex-col md:items-end">
          <p className="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">Minted / Supply</p>
            <div className="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${tokenInfo.mintedSupply} / ${tokenInfo.maxSupply}`}</div>
        </div>
        <div className="flex flex-col md:items-end">
          <p className="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">Burnt Supply</p>
            <div className="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{tokenInfo.burntSupply}</div>
        </div>
        <div className='flex flex-col md:items-end'>
          <p className='whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm'>Royalties</p>
            <div className='whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg'>{`${formatNumber(tokenInfo.royalties)}%`}</div>
        </div>
      </div>
    </>
  )
}

export default MarketData
