// Returns the royalties of an NFT by tokenID

const getNftRoyalties = async (tokenId: string): Promise<number> => {
  try {
      const response = await fetch(`https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${tokenId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const royaltyFees = data.custom_fees.royalty_fees;
      let totalRoyalties = 0;

      // Sum up the numerators from royalty_fees array
      for (const fee of royaltyFees) {
          totalRoyalties += fee.amount.numerator;
      }

      return totalRoyalties;
  } catch (error) {
      console.error('Error fetching token royalties:', error);
      throw error; // Optionally handle or rethrow the error
  }
};

export default getNftRoyalties;
  