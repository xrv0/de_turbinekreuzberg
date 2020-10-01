let contract;
let signer;
let provider;
const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "postMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMessagesSize",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "messages",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const contractAddress = "0x560962D72C77Ad90F5e1839FeF8E8499d46688CB";

window.ethereum.enable().then(() => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    contract = new ethers.Contract(contractAddress, contractAbi, signer);

    let messages = [];
    setInterval(() => {
        contract.getMessagesSize().then(output => {
            const messagesList = document.querySelector("#post-list")

            while(messagesList.firstChild) {
                messagesList.removeChild(messagesList.firstChild);
            }

            let size = parseInt(output._hex, 16);
            console.log("Found " + size + " messages!");
            for(let i = 0; i < size; i++) {
                contract.messages(i).then(message => {
                    messages.push(message);

                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(message));
                    messagesList.appendChild(li);
                })
            };
        });
    }, 10 * 1000);
});

const messageBox = document.getElementById("message-box")

function submitMessage() {
    const text = messageBox.value;
    console.log(text);
    if(text.length > 0) {
        contract.postMessage(text).then(() => {
            console.log("Posted! Text: " + text);
        });
    }
}