export interface TokenData {
  name: string
  sentxName: string
  url: string
  floorPrice: null | number
  royalties: number
  maxSupply: number
  mintedSupply: number
  burntSupply: number
}

const collections: Record<string, TokenData> = {
  '0.0.4573896': {
    name: 'Kabila Early Supporters',
    sentxName: 'kabila-early-supporters-2',
    url: 'https://pbs.twimg.com/media/GFp9eEwW8AAV-8n?format=jpg&name=medium',
    floorPrice: null,
    royalties: 7,
    maxSupply: 750,
    mintedSupply: 750,
    burntSupply: 0
  },
  '0.0.2179656': {
    name: 'Siwas',
    sentxName: 'siwas-by-kabila',
    url: 'https://pbs.twimg.com/profile_images/1776203956831600640/FB1gmUBp_400x400.jpg',
    floorPrice: null,
    royalties: 7,
    maxSupply: 9700,
    mintedSupply: 4000,
    burntSupply: 0
  },
  '0.0.1384991': {
    name: 'SpartPunk Army',
    sentxName: 'spartpunk-army',
    url: 'https://pbs.twimg.com/media/FaiTktGaQAANbdV?format=jpg&name=900x900',
    floorPrice: null,
    royalties: 7,
    maxSupply: 300,
    mintedSupply: 150,
    burntSupply: 0
  },
  '0.0.1454449': {
    name: 'SpartPunk Badge',
    sentxName: 'spartpunk-badge',
    url: 'https://pbs.twimg.com/media/GMU1qrZWMAAf1Z-?format=jpg&name=900x900',
    floorPrice: null,
    royalties: 8,
    maxSupply: 1000,
    mintedSupply: 1000,
    burntSupply: 613
  },
  '0.0.4608024': {
    name: 'Bonacci',
    sentxName: 'bonacci',
    url: 'https://pbs.twimg.com/media/GLxlmiHX0AA4XO8?format=jpg&name=4096x4096',
    floorPrice: null,
    royalties: 6,
    maxSupply: 4444,
    mintedSupply: 1000,
    burntSupply: 0
  },
  '0.0.1350444': {
    name: 'Hangry Barboons',
    sentxName: 'hangry-barboons',
    url: 'https://pbs.twimg.com/media/GMJjauXXMAA44Uw?format=jpg&name=large',
    floorPrice: null,
    royalties: 7,
    maxSupply: 4444,
    mintedSupply: 4444,
    burntSupply: 0
  },
  '0.0.3837554': {
    name: 'Hangry Rebels',
    sentxName: 'hangry-rebels',
    url: 'https://pbs.twimg.com/media/GMIejGoXkAAzRHx?format=jpg&name=large',
    floorPrice: null,
    royalties: 7,
    maxSupply: 565,
    mintedSupply: 565,
    burntSupply: 0
  },
  '0.0.1299294': {
    name: 'Kabila Supreme KES',
    sentxName: 'kabila-supreme-kes',
    url: 'https://pbs.twimg.com/media/FdptC7PXgAEcwCw?format=jpg&name=large',
    floorPrice: null,
    royalties: 8,
    maxSupply: 70,
    mintedSupply: 70,
    burntSupply: 0
  },
  '0.0.1299305': {
    name: 'Kabila Legendary KES',
    sentxName: 'kabila-legendary-kes',
    url: 'https://pbs.twimg.com/media/FdnV06QWQAECwNK?format=jpg&name=large',
    floorPrice: null,
    royalties: 8,
    maxSupply: 30,
    mintedSupply: 30,
    burntSupply: 0
  },
  '0.0.878200': {
    name: 'Dead Pixels Ghost Club',
    sentxName: 'dead-pixels-ghost-club',
    url: 'https://pbs.twimg.com/media/GL43kGKaAAAlxfj?format=png&name=large',
    floorPrice: null,
    royalties: 5,
    maxSupply: 10000,
    mintedSupply: 3900,
    burntSupply: 0
  },
  '0.0.5330090': {
    name: 'Peculiar Peeps',
    sentxName: 'peculiar-peeps',
    url: 'https://pbs.twimg.com/media/GMVxKsDXsAAM7-D?format=jpg&name=medium',
    floorPrice: null,
    royalties: 5,
    maxSupply: 10000,
    mintedSupply: 8501,
    burntSupply: 0
  }
}

export default collections
