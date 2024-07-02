import React from 'react'
import { fetchFloorData } from '../../services/floorPriceSentx'
import styles from '../styles/Tokenomics.module.css'

const Tokenomics = async ( { tokenInfo, tokenId, hbarPrice } ) => {

// Extract Token Info
const { name, royalties, maxSupply, mintedSupply, burntSupply, url } = tokenInfo;

// Calculate Floor Price
const floorPrice = await fetchFloorData(tokenId)

return (
  <>
      <div className={styles.container}>
        <img className={styles.img} src={url} alt='Logo' />
        <div className={styles.tokenomicsContainer}>
          <h2>{name} Tokenomics:</h2>
          <p>- Token Id: {tokenId} </p>
          <p>- Max Supply: {maxSupply}</p>
          <p>- Minted Supply: {mintedSupply}</p>
          <p>- Burnt Supply: {burntSupply}</p>
          <p>- Royalties: {((1 - royalties) * 100).toFixed(1)}%</p>
        </div>
        <div className={styles.marketDataContainer}>
          <h2>Market Value:</h2>
          <p>- Floor Price: {floorPrice} hbar</p>
          <p>- Circulating Market Cap: {(mintedSupply - burntSupply) * floorPrice} hbar</p>
          <p>- Circulating Market Cap: {((mintedSupply - burntSupply) * floorPrice * hbarPrice).toFixed(0)} $</p>
          <p>- Fully Diluted Market Cap: {(maxSupply - burntSupply) * floorPrice} hbar</p>
          <p>- Fully Diluted Market Cap: {((maxSupply - burntSupply) * floorPrice * hbarPrice).toFixed(0)} $</p>
        </div>
      </div>
  </>
);
};

export default Tokenomics;