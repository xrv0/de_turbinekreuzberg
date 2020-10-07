const kittiesCounterElement = document.getElementById("kitties-counter");

export default async function setKittyCounter(kittyCount) {
    kittiesCounterElement.innerText = kittyCount;
}
