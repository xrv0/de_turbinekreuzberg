import dotenv from 'dotenv';
import { Contract, providers } from 'ethers';
import ckAbi from './lib/abi/KittyCore.json';
dotenv.config()

const provider = new providers.InfuraProvider("rinkeby", {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET
});

const ckContractAddress = "0x16baF0dE678E52367adC69fD067E5eDd1D33e3bF";

//mainnet
//const ckContractAddress = "0x06012c8cf97bead5deae237070f9587f8e7a266d";

const ckContract = new Contract(ckContractAddress, ckAbi, provider);

const main = async () => {
    const owner = process.argv[2];
    try {
        const tokens = await ckContract.tokensOfOwner(owner)
        console.log(tokens);
    } catch (e) {
        console.error(e);
    }

}

main();





// kittieTraderContract.getKittieBalance().then(output => {
//     let kittiesBalance = parseInt(output._hex, 16)
//     const kittiesCounterElement = document.getElementById("kitties-counter");
//     kittiesCounterElement.innerText = kittiesBalance.toString();
// });