import { ethers } from "ethers";

/**
 * @see https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents
 * better would be to use @metamask/detect-provider but that's not returning a signer...
 */
export async function connectProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (provider) {
        await window.ethereum.enable();
        console.debug('Ethereum successfully detected!')
        return provider;
    } else {
        alert('Please install MetaMask!')
    }
}
