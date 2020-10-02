const contractAbi = [{"inputs":[{"internalType":"string","name":"message","type":"string"}],"name":"postMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getMessagesSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"messages","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}];
const contractAddress = "0x560962D72C77Ad90F5e1839FeF8E8499d46688CB";

const messageBox = document.getElementById("message-box")
const messagesList = document.getElementById("post-list")
const messageSubmitButton = document.getElementById("message-submit-button");
const authorBox = document.getElementById("author-box");

let contract;
let provider;

async function updateMessages() {
    contract.getMessagesSize().then(async output => {
        let size = parseInt(output._hex, 16);
        let existingMessages = messagesList.children.length;

        if (size > existingMessages) {
            for (let i = existingMessages; i < size; i++) {
                await contract.messages(i).then(value => {
                    const args = value.split("$");
                    if(args.length == 2) {
                        const author = args[0];
                        const message = args[1];

                        let li = document.createElement("li");
                        li.innerHTML = "<div><span class='author'>" + author + "</span><div class='message'>"+ message + "</div></div>";
                        messagesList.appendChild(li);
                    }else {
                        let li = document.createElement("li");
                        li.appendChild(document.createTextNode(value));
                        messagesList.appendChild(li);
                    }
                })
            }
        }
    }).then(() => {
        setTimeout(updateMessages, 1000);
    });
}

messageSubmitButton.onclick = () => {
    const text = messageBox.value;
    const author = authorBox.value;

    if(text.length > 0 && author.length > 0) {
        contract.postMessage(author + "$" + text).then(() => {
            console.log("Posted message: " + author + "$" + text);
            messageBox.value = "";
            authorBox.value = "";
        });
    }
}

window.ethereum.enable().then(() => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());

    updateMessages().then(r => console.log("Updated messages!"));
});

