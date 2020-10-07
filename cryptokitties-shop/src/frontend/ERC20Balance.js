const kittiesCounterElement = document.getElementById("sry-balance");

export default async function setBalance(kittyCount) {
    kittiesCounterElement.innerText = kittyCount;
}
