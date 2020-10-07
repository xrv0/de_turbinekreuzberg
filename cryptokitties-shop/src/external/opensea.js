/**
 * @param {string} erc721 
 * @param {string} owner 
 */
export async function retrieveContractAssets(erc721, owner) {
    const url = `https://rinkeby-api.opensea.io/api/v1/assets/?asset_contract_addresses=${erc721}&owner=${owner}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.assets;
}