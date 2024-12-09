import ListedItemsClient from './ListedItemsClient'
import { getNftRoyalties } from '@/app/address/[accountId]/nft-analytics/[tokenId]/services/getNftRoyalties'
import { updateListedItems } from '../utils/listedItems'

interface ListedItemsProps {
  tokenId: string
}

const ListedItems: React.FC<ListedItemsProps> = async ({ tokenId }) => {
  const updatedListedItems = await updateListedItems(tokenId)
  const royalty: number = await getNftRoyalties(tokenId)

  return (
    <ListedItemsClient updatedListedItems={updatedListedItems} tokenId={tokenId} royalty={royalty}/>
  )
}

export default ListedItems
