export interface TokenData {
  name: string
  sentxName: string
  url: string
  floorPrice: number | null
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
  '0.0.2179656': {
    name: 'Siwas',
    sentxName: 'siwas-by-kabila',
    url: 'https://pbs.twimg.com/media/GUSMdDXXEAEQyzl?format=jpg&name=large',
    floorPrice: null,
    royalties: 7,
    maxSupply: 9700,
    mintedSupply: 4000,
    burntSupply: 0
  },
  '0.0.5959486': {
    name: 'KEIA Card',
    sentxName: 'kabila-early-ino-access',
    url: 'https://arweave.sentx.io/803ntF1lDB0otE-VvG1Fba4gfE8LSJ34EbooxaJhBzk',
    floorPrice: null,
    royalties: 7,
    maxSupply: 100000,
    mintedSupply: 4197,
    burntSupply: 0
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
  },
  '0.0.3958582': {
    name: 'Shroomies',
    sentxName: 'shroomies-2',
    url: 'https://pbs.twimg.com/profile_images/1630605477355704320/qXhgEZfD_400x400.jpg',
    floorPrice: null,
    royalties: 5,
    maxSupply: 2500,
    mintedSupply: 2500,
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
    url: 'https://pbs.twimg.com/profile_images/1553814202669826057/-9qRoWUJ_400x400.jpg',
    floorPrice: null,
    royalties: 8,
    maxSupply: 1000,
    mintedSupply: 1000,
    burntSupply: 613
  },
  '0.0.2033394': {
    name: 'SpartLand DAO',
    sentxName: 'spartland-dao',
    url: 'https://pbs.twimg.com/media/F9NkfPdbQAAqcek?format=jpg&name=large',
    floorPrice: null,
    royalties: 0,
    maxSupply: 100,
    mintedSupply: 43,
    burntSupply: 0
  },
  '0.0.4862817': {
    name: 'UTU Renegades',
    sentxName: 'utu-renegades',
    url: 'https://pbs.twimg.com/profile_images/1711750299243663360/9EZMDm4R_400x400.jpg',
    floorPrice: null,
    royalties: 8,
    maxSupply: 2222,
    mintedSupply: 2210,
    burntSupply: 12
  },
  '0.0.6178137': {
    name: 'Bonzo Desert',
    sentxName: 'bonzo-desert-collectibles',
    url: 'https://pbs.twimg.com/media/GOW01UsXsAI6a6J?format=jpg&name=4096x4096',
    floorPrice: null,
    royalties: 5,
    maxSupply: 2500,
    mintedSupply: 1323,
    burntSupply: 0
  },
  '0.0.6178141': {
    name: 'Bonzo Ocean',
    sentxName: 'bonzo-ocean-collectibles',
    url: 'https://pbs.twimg.com/media/GOW01U5WcAAgNmp?format=jpg&name=4096x4096',
    floorPrice: null,
    royalties: 5,
    maxSupply: 1500,
    mintedSupply: 798,
    burntSupply: 0
  },
  '0.0.6178143': {
    name: 'Bonzo Space',
    sentxName: 'bonzo-space-collectibles',
    url: 'https://pbs.twimg.com/media/GOW01U0WQAEX27s?format=jpg&name=4096x4096',
    floorPrice: null,
    royalties: 5,
    maxSupply: 400,
    mintedSupply: 400,
    burntSupply: 0
  },
  '0.0.6173820': {
    name: 'Bonzo Singularity',
    sentxName: 'bonzo-singularity-collectibles',
    url: 'https://pbs.twimg.com/media/GQC5xmFWYAAwJYn?format=jpg&name=medium',
    floorPrice: null,
    royalties: 5,
    maxSupply: 400,
    mintedSupply: 389,
    burntSupply: 0
  },
  '0.0.732556': {
    name: 'PEC Electromagnetic',
    sentxName: 'planck-epoch-collectibles-electromagnetic',
    url: 'https://pbs.twimg.com/media/GRoDvBNbMAA-jSU?format=jpg&name=small',
    floorPrice: null,
    royalties: 0,
    maxSupply: 1000,
    mintedSupply: 1000,
    burntSupply: 0
  },
  '0.0.1881189': {
    name: 'Infinity Jar',
    sentxName: 'infinity-jar',
    url: 'https://pbs.twimg.com/media/FwgDAYaacAAh5Yo?format=jpg&name=large',
    floorPrice: null,
    royalties: 5,
    maxSupply: 500,
    mintedSupply: 400,
    burntSupply: 0
  },
  '0.0.3853857': {
    name: 'CLEO Cards',
    sentxName: 'cleo-cards',
    url: 'https://pbs.twimg.com/media/GE-PGhWWwAAIIfu?format=jpg&name=large',
    floorPrice: null,
    royalties: 5,
    maxSupply: 1000,
    mintedSupply: 1000,
    burntSupply: 0
  },
  '0.0.1097737': {
    name: 'Earth FC',
    sentxName: 'earth-fc',
    url: 'https://pbs.twimg.com/media/FgmM2ufXEAAXLbe?format=jpg&name=medium',
    floorPrice: null,
    royalties: 5,
    maxSupply: 620,
    mintedSupply: 620,
    burntSupply: 0
  }
}

export default collections
