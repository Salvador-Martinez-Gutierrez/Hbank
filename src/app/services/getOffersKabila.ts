interface KabilaOffer {
  _id: string
  buyerId: string
  tokenId: string
  price: number
  currency: string
  marketplace: string
  nftCollection: {
    name: string
    ImageCid?: string
  }
}

export default async function getOffersKabila (tokenIds: string[]): Promise<KabilaOffer[] | null> {
  try {
    const tokenIdsParam = tokenIds.join(',')
    const url = `https://labs.kabila.app/api/marketplace/manager/nft-collections/offers?tokenIds=${tokenIdsParam}&orderBy=price&oderDir=DESC&fields=buyerId,tokenId,price,currency,nftCollection.name,nftCollection.ImageCid`

    const response = await fetch(url, {
      next: {
        revalidate: 300 // 5 minutes cache
      }
    })

    if (!response.ok) {
      console.error(`Error fetching Kabila Offers: ${response.status} - ${response.statusText}`)
      throw new Error('Error fetching Kabila Offers')
    }

    const data = await response.json()

    // If the data is empty, handle it
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No offers found for tokenIds: ${tokenIdsParam}`)
      return null
    }

    // Add marketplace attribute to each offer
    const offersWithMarketplace = data.map(offer => ({
      ...offer,
      marketplace: 'Kabila'
    }))

    return offersWithMarketplace
  } catch (error) {
    console.error(`Error fetching Kabila Offers for tokenIds: ${tokenIds.join(',')}`, error)
    return null
  }
}
