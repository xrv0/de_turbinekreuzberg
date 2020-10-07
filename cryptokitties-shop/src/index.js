import masterCss from './css/master.css';

import makeFavicon from './frontend/favicon';
import { connectProvider } from './connectProvider'
import buildContracts from './contracts'
import setKittyCounter from './frontend/KittyCounter';
import { retrieveContractAssets } from './external/opensea';
import { renderAssets, renderTokenList } from './frontend/TokenList';

let contracts;
let provider;

async function setup() {

    makeFavicon();
    provider = await connectProvider();

    const bn = await provider.getBlockNumber();
    const network = await provider.getNetwork();
    console.debug("running network %s at block number %s", network.chainId, bn);

    contracts = buildContracts(provider, {
        kittyTrader: process.env.CONTRACT_ADDRESS_KITTY_TRADER,
        kittyCore: process.env.CONTRACT_ADDRESS_KITTY_CORE,
        mohanToken: process.env.CONTRACT_ADDRESS_ERC20_TOKEN
    });

    return { contracts, provider };
}

async function doBuyToken(tokenId) {
    const gasLimit1 = await contracts.mohanToken.estimateGas.approve(contracts.kittyTrader.address, 1e18.toString());
    const txResponse1 = await contracts.mohanToken.approve(contracts.kittyTrader.address, 1e18.toString(), { gasLimit: gasLimit1 });
    console.log(txResponse1);

    await txResponse1.wait();

    const gasLimit2 = await contracts.kittyTrader.estimateGas.giveMeKittie(tokenId);
    const txResponse2 = await contracts.kittyTrader.giveMeKittie(tokenId, { gasLimit: gasLimit2 });
    console.log(txResponse2);

    await txResponse2.wait();

    console.log("transactions successful");
}

/**
 * how many kitties have we got in total?
 */
async function updateKittyCount(kittyTrader) {
    const output = await kittyTrader.getKittieBalance();
    const kittyCount = parseInt(output._hex, 16)
    setKittyCounter(kittyCount);
    return kittyCount
}

/**
 * which kitties do we own?
 */
async function updateKittyItems(provider) {
    const network = await provider.getNetwork();
    if (network.chainId < 100) { //any testnet
        const contractAssets = await retrieveContractAssets(
            contracts.kittyCore.address,
            contracts.kittyTrader.address
        );
        renderAssets(contractAssets);
    } else {
        const tokens = await contracts.kittyCore.tokensOfOwner(contracts.kittyTrader.address);
        renderTokenList(tokens);
    }
}

async function main({ contracts, provider }) {
    await updateKittyCount(contracts.kittyTrader);
    await updateKittyItems(provider)
}

/**
 * globally exposed click handler
 * @param {int|string} tokenId 
 */
export async function buyToken(tokenId) {
    await doBuyToken(tokenId);
    await updateKittyCount(contracts.kittyTrader);
    await updateKittyItems(provider);
    window.alert("Successfully bought kittie number " + tokenId);
}

//this looks intelligent ;) 
setup().then(main);

