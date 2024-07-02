const MarketData = ({ tokenInfo }) => {
  // Utility function to format numbers with commas
  const formatNumber = (number: number) => {
    return number.toLocaleString('en-US')
  }
  const marketCap = tokenInfo.floorPrice * (tokenInfo.mintedSupply - tokenInfo.burntSupply)
  const FDV = tokenInfo.floorPrice * (tokenInfo.maxSupply - tokenInfo.burntSupply)
  return (
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
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${tokenInfo.floorPrice} ℏ` ?? '-'}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${marketCap} ℏ` ?? '-'}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${FDV} ℏ` ?? '-'}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${tokenInfo.mintedSupply} / ${tokenInfo.maxSupply}`}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{tokenInfo.burntSupply}</td>
            <td className="text-left px-4 whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${formatNumber(tokenInfo.royalties)}%`}</td>
          </tr>
        </tbody>
      </table>

      <div class="hidden items-center justify-end gap-8 md:grid md:w-fit md:min-w-fit md:grid-cols-3 md:gap-4 2xl:flex 2xl:gap-8 4xl:gap-16">
        <div class="flex flex-col md:items-end">
          <p class="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">Floor Price</p>
          <div class="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">
            <span id="floor-price">{`${tokenInfo.floorPrice} ℏ` ?? '-'}</span>
          </div>
        </div>
        <div class="flex flex-col md:items-end">
          <p class="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">Market Cap</p>
            <div class="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${marketCap} ℏ` ?? '-'}</div>
        </div>
        <div class="flex flex-col md:items-end">
          <p class="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">FDV</p>
            <div class="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${FDV} ℏ` ?? '-'}</div>
        </div>
        <div class="flex flex-col md:items-end">
          <p class="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">Minted / Supply</p>
            <div class="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${tokenInfo.mintedSupply} / ${tokenInfo.maxSupply}`}</div>
        </div>
        <div class="flex flex-col md:items-end">
          <p class="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">Burnt Supply</p>
            <div class="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{tokenInfo.burntSupply}</div>
        </div>
        <div class="flex flex-col md:items-end">
          <p class="whitespace-nowrap text-[0.65rem] text-muted-foreground xl:text-sm">Royalties</p>
            <div class="whitespace-nowrap text-sm font-semibold tabular-nums xl:text-lg">{`${formatNumber(tokenInfo.royalties)}%`}</div>
        </div>
      </div>
    </>
  )
}

export default MarketData
