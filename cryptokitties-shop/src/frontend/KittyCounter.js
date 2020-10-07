const kittiesCounterElement = document.getElementById("kitties-balance");

export default async function setKittyCounter(kittyCount) {
    kittiesCounterElement.innerText = kittyCount;
}
