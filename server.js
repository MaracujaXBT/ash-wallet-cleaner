import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

if (!ALCHEMY_API_KEY) {
  console.warn('Warning: ALCHEMY_API_KEY is not set. /api/nfts requests will fail until it is provided.');
}

app.use(express.static(path.join(__dirname, 'public')));

function isValidAddress(address = '') {
  return typeof address === 'string' && address.startsWith('0x') && address.length === 42;
}

function normalizeImageUrl(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  if (url.startsWith('ipfs://')) {
    const ipfsPath = url.replace('ipfs://', '').replace(/^ipfs\//i, '');
    return `https://ipfs.io/ipfs/${ipfsPath}`;
  }

  return url;
}

app.get('/api/nfts', async (req, res) => {
  const { address } = req.query;

  if (!isValidAddress(address)) {
    return res.status(400).json({ error: 'Invalid address' });
  }

  if (!ALCHEMY_API_KEY) {
    return res.status(500).json({ error: 'Failed to fetch NFTs' });
  }

  const apiUrl = new URL(`https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner`);
  apiUrl.searchParams.set('owner', address);
  apiUrl.searchParams.set('withMetadata', 'true');

  try {
    const response = await fetch(apiUrl.href);

    if (!response.ok) {
      throw new Error(`Alchemy responded with status ${response.status}`);
    }

    const data = await response.json();
    const ownedNfts = Array.isArray(data.ownedNfts)
      ? data.ownedNfts
      : Array.isArray(data.nfts)
        ? data.nfts
        : Array.isArray(data.assets)
          ? data.assets
          : [];

    const normalizedNfts = ownedNfts.map((nft) => {
      const metadata = nft.metadata || {};
      const contractAddress = nft.contract?.address || nft.contractAddress || 'Unknown';
      const tokenId = nft.tokenId || nft.id?.tokenId || 'Unknown';
      const name = metadata.name || nft.title || nft.name || null;

      const potentialUrls = [
        metadata.image,
        metadata.image_url,
        metadata.imageUrl,
        nft.image?.cachedUrl,
        nft.imageUrl,
        nft.media?.[0]?.gateway,
        nft.media?.[0]?.raw,
        nft.tokenUri?.gateway,
        nft.tokenUri?.raw
      ];

      const firstValidUrl = potentialUrls.find((candidate) => typeof candidate === 'string' && candidate.length > 0) || null;

      return {
        contract: contractAddress,
        tokenId,
        name,
        imageUrl: normalizeImageUrl(firstValidUrl)
      };
    });

    return res.json({ nfts: normalizedNfts });
  } catch (error) {
    console.error('Failed to fetch NFTs', error);
    return res.status(500).json({ error: 'Failed to fetch NFTs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
