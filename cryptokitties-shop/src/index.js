import masterCss from './css/master.css';

import makeFavicon from './frontend/favicon';
import { connectProvider } from './connectProvider'
import buildContracts from './contracts'
import setBalance from './frontend/ERC20Balance';
import setKittyCounter from './frontend/KittyCounter';

import { retrieveContractAssets } from './external/opensea';
import {renderAssets, renderTokenList, smartContractTokenList, userTokenList} from './frontend/TokenList';

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

async function doSellToken(tokenId) {
    const gasLimit1 = await contracts.kittyCore.estimateGas.approve(contracts.kittyTrader.address, tokenId);
    const txResponse1 = await contracts.kittyCore.approve(contracts.kittyTrader.address, tokenId, { gasLimit: gasLimit1 });
    console.log(txResponse1);
    await txResponse1.wait();

    const gasLimit2 = await contracts.kittyTrader.estimateGas.sellKittie(tokenId);
    const txResponse2 = await contracts.kittyTrader.sellKittie(tokenId, { gasLimit: gasLimit2 });
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
    await setKittyCounter(kittyCount);
    return kittyCount;
}

/**
 * how many erc20 tokens does the smart contract own?
 * @param kittyTrader
 * @returns {Promise<number>}
 */
async function updateERC20Balance(kittyTrader, mohanToken) {
    const output = await mohanToken.balanceOf(process.env.CONTRACT_ADDRESS_KITTY_TRADER);
    const erc20Balance = parseInt(output._hex, 16)
    await setBalance(erc20Balance);
    return erc20Balance;
}

/**
 * which kitties do we own?
 */
async function updateKittyItems(provider, owner, list, methodToCall) {
    const network = await provider.getNetwork();
    if (network.chainId < 100) { //any testnet
        const contractAssets = await retrieveContractAssets(
            contracts.kittyCore.address,
            owner
        );
        renderAssets(contractAssets, list, methodToCall);
    } else {
        const tokens = await contracts.kittyCore.tokensOfOwner(owner);
        renderTokenList(tokens, list, methodToCall);
    }
}

async function main({ contracts, provider }) {
    await updateKittyCount(contracts.kittyTrader);
    await updateERC20Balance(contracts.kittyTrader, contracts.mohanToken);

    await updateKittyItems(provider, contracts.kittyTrader.address, smartContractTokenList, "buyToken");
    await updateKittyItems(provider, await provider.getSigner().getAddress(), userTokenList, "sellToken");
}

/**
 * globally exposed click handler
 * @param {int|string} tokenId 
 */
export async function buyToken(tokenId) {
    await doBuyToken(tokenId);
    await updateKittyCount(contracts.kittyTrader);
    await updateERC20Balance(contracts.kittyTrader, contracts.mohanToken);

    await updateKittyItems(provider, contracts.kittyTrader.address, smartContractTokenList, "buyToken");
    await updateKittyItems(provider, await provider.getSigner().getAddress(), userTokenList, "sellToken");

    window.alert("Successfully bought kittie number " + tokenId);
}

export async function sellToken(tokenId) {
    await doSellToken(tokenId);
    await updateKittyCount(contracts.kittyTrader);
    await updateERC20Balance(contracts.kittyTrader, contracts.mohanToken);

    await updateKittyItems(provider, contracts.kittyTrader.address, smartContractTokenList, "buyToken");
    await updateKittyItems(provider, await provider.getSigner().getAddress(), userTokenList, "sellToken");
    window.alert("Successfully sold kittie number " + tokenId);
}

//this looks intelligent ;) 
setup().then(main);

