export const smartContractTokenList = document.getElementById("ck-owned-tokens-list-buy");
export const userTokenList = document.getElementById("ck-owned-tokens-list-sell");

function clear(list) {
    list.innerHTML = "";
}

export function renderTokenList(tokens, list, methodToCall, buttonText) {
    clear(list);

    //This just uses a placeholder image for now
    tokens.map(token => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="kitty-offer-outer">
            <div class="kitty-offer-name">
              <strong># ${token}</strong>
            </div>
            <img src="https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1671786.svg" alt="">
            <div class="kitty-offer-buy-button-outer">
              <button class="kitty-offer-buy-button" onclick="CKShop.${methodToCall}(${token})">${buttonText}</button>
            </div>
        </div>
        `;
        list.appendChild(li);
    });
}

export function renderAssets(assets, list, methodToCall, buttonText) {
    clear(list);
    assets.map(asset => {
        const assetHtml = `
        <div class="kitty-offer-outer">
            <div class="kitty-offer-name">
              <strong># ${asset.id}</strong>
            </div>
            <img src="${asset.image_original_url}" alt="">
            <div class="kitty-offer-buy-button-outer">
              <button class="kitty-offer-buy-button" onclick="CKShop.${methodToCall}(${asset.id})">${buttonText}</button>
            </div>
        </div>
        `;

        const li = document.createElement("li");
        li.setAttribute("class", "ck-token");

        li.innerHTML = assetHtml;
        list.appendChild(li);
    });
}