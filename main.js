const provider = new ethers.providers.Web3Provider(window.ethereum)

const contractAddress = "0x6ebcae41064dfeb758c6ae2408c8c1a2656ecb1d"
const abi = [ { "inputs": [], "name": "getKittieBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ];
const smartContract = new ethers.Contract(contractAddress, abi, provider);

window.setInterval(() => {
    smartContract.getKittieBalance().then(output => {
        let kittiesBalance = parseInt(output._hex, 16)
        const kittiesCounterElement = document.getElementById("kitties-counter");
        kittiesCounterElement.innerText = kittiesBalance.toString();
    });
}, 2 * 1000);
