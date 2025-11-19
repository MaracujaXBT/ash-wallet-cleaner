const addressInput = document.getElementById('addressInput');
const scanButton = document.getElementById('scanButton');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');
const resultsDiv = document.getElementById('results');

scanButton.addEventListener('click', handleScan);
addressInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleScan();
  }
});

async function handleScan() {
  const address = addressInput.value.trim();
  errorDiv.textContent = '';
  resultsDiv.innerHTML = '';

  if (!address) {
    errorDiv.textContent = 'Please enter an address.';
    return;
  }

  setLoading(true);
  scanButton.disabled = true;

  try {
    const response = await fetch(`/api/nfts?address=${encodeURIComponent(address)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || 'Failed to fetch NFTs');
    }

    renderGallery(Array.isArray(data.nfts) ? data.nfts : []);
  } catch (err) {
    console.error(err);
    errorDiv.textContent = err?.message || 'Network error. Please try again.';
  } finally {
    setLoading(false);
    scanButton.disabled = false;
  }
}

function setLoading(isLoading) {
  loadingDiv.style.display = isLoading ? 'block' : 'none';
}

function renderGallery(nfts) {
  if (!nfts.length) {
    resultsDiv.textContent = 'No NFTs found for this address.';
    return;
  }

  const fragment = document.createDocumentFragment();

  nfts.forEach((nft) => {
    const card = document.createElement('div');
    card.className = 'card';

    if (nft.imageUrl) {
      const img = document.createElement('img');
      img.src = nft.imageUrl;
      img.alt = nft.name || 'NFT image';
      card.appendChild(img);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'placeholder';
      placeholder.textContent = 'No image';
      card.appendChild(placeholder);
    }

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h3');
    title.textContent = nft.name || 'Unnamed NFT';
    body.appendChild(title);

    const contract = document.createElement('p');
    contract.textContent = `Contract: ${shortenAddress(nft.contract)}`;
    body.appendChild(contract);

    const token = document.createElement('p');
    token.textContent = `Token ID: ${nft.tokenId}`;
    body.appendChild(token);

    if (nft.imageUrl) {
      const actions = document.createElement('div');
      actions.className = 'actions';

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.textContent = 'Copy URL';
      copyBtn.addEventListener('click', () => copyImageUrl(nft.imageUrl));
      actions.appendChild(copyBtn);

      const downloadBtn = document.createElement('button');
      downloadBtn.type = 'button';
      downloadBtn.textContent = 'Download';
      downloadBtn.addEventListener('click', () => {
        const filename = buildFilename(nft.name, nft.tokenId);
        downloadImage(nft.imageUrl, filename);
      });
      actions.appendChild(downloadBtn);

      body.appendChild(actions);
    }

    card.appendChild(body);
    fragment.appendChild(card);
  });

  resultsDiv.innerHTML = '';
  resultsDiv.appendChild(fragment);
}

function shortenAddress(address) {
  if (typeof address !== 'string' || address.length <= 10) {
    return address || 'Unknown';
  }

  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

async function copyImageUrl(url) {
  try {
    await navigator.clipboard.writeText(url);
    alert('Image URL copied');
  } catch (error) {
    console.error('Failed to copy', error);
    alert('Failed to copy URL');
  }
}

async function downloadImage(url, filename) {
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      throw new Error('Unable to download image');
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Failed to download image', error);
    alert('Failed to download image');
  }
}

function buildFilename(name, tokenId) {
  const safeName = (name || 'nft').toLowerCase().replace(/[^a-z0-9-_]+/gi, '_');
  const safeToken = String(tokenId || 'token').replace(/[^a-z0-9-_]+/gi, '_');
  return `${safeName}-${safeToken}.png`;
}
