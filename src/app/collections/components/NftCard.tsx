import Image from 'next/image'
import SerialBadge from './Badge'
import collections from '@/app/collectionsData/collections'

function NftCard({ token, tokenId }) {
  // Sends the user to the corresponding URL to buy the NFT
  const handleBuyClick = () => {
    if (token.marketplace === 'Sentx') {
      const sentxName = collections[tokenId].sentxName
      window.open(`https://sentx.io/nft-marketplace/${sentxName}/${token.serialNumber}`, '_blank')
    } else if (token.marketplace === 'Kabila') {
      const modifiedTokenId = tokenId.slice(4)
      window.open(`https://market.kabila.app/en/collections/${modifiedTokenId}`, '_blank')
    }
  }
  // IPFs URL for the NFT Image
  const imageUrl = token.imageCid
    ? `https://cyan-certain-partridge-419.mypinata.cloud/ipfs/${token.imageCid.replace('ipfs://', '')}?pinataGatewayToken=CpSGmN7ulVRyThI-BuiHKuSCJSH9bFSxuVW2lXNac1d895Eeb2vHACSgKPD84Inq`
    : '/path/to/default/image.jpg' // Define the image depending on the market the NFT is listed on
  const marketUrl = token.marketplace === 'Kabila' ? '/KabilaLogo.jpg' : '/SentxLogo.png'
  return (
    <div className='overflow-hidden rounded-xl bg-card text-card-foreground shadow-md group relative flex cursor-pointer flex-col shadow-custom'>
      <div className='relative'>
        <div className='absolute top-1 right-1 z-1 w-8 h-8 rounded-full overflow-hidden'>
        <Image
          src={marketUrl}
          alt={token.marketplace}
          width={100}
          height={100}
          className='w-full h-auto overflow-hidden'
        />
        </div>
        <Image
          src={imageUrl}
          alt={token.name}
          width={100}
          height={100}
          className='w-full h-auto overflow-hidden'
        />
      </div>
      <div className='p-2'>
        <div className='flex justify-between text-sm'>
          <SerialBadge serialId={token.serialNumber}/>
          <span className='text-base'>{`${token.price} ℏ`}</span>
        </div>
      </div>
      <button className='h-8 mx-1 mb-1 bg-green-500 text-white rounded-lg' onClick={handleBuyClick}>Buy</button>
    </div>
  )
}

export default NftCard
