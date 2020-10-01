const contractAbi = [{"inputs":[{"internalType":"string","name":"message","type":"string"}],"name":"postMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getMessagesSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"messages","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const contractAddress = "0x560962D72C77Ad90F5e1839FeF8E8499d46688CB";

const messageBox = document.getElementById("message-box")
const messagesList = document.getElementById("post-list")
const messageSubmitButton = document.getElementById("message-submit-button");

let contract;
let provider;

function updateMessages() {
    contract.getMessagesSize().then(output => {
        let size = parseInt(output._hex, 16);
        let existingMessages = messagesList.children.length;

        if(size > existingMessages) {
            for(let i = existingMessages; i < size; i++) {
                contract.messages(i).then(message => {
                    let li = document.createElement("li");
                    li.appendChild(document.createTextNode(message));
                    messagesList.appendChild(li);
                })
            }
        }
    });
}

messageSubmitButton.onclick = () => {
    const text = messageBox.value;
    if(text.length > 0) {
        contract.postMessage(text).then(() => {
            console.log("Posted message: " + text);
        });
    }
}

window.ethereum.enable().then(() => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());

    updateMessages();
    setInterval(updateMessages, 2000)
});

