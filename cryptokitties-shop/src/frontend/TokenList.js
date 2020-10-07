export const smartContractTokenList = document.getElementById("ck-owned-tokens-list-buy");
export const userTokenList = document.getElementById("ck-owned-tokens-list-sell");

function clear(list) {
    list.innerHTML = "";
}

export function renderTokenList(tokens, list, methodToCall) {
    clear(smartContractTokenList);
    tokens.map(token => {
        const li = document.createElement("li");
        li.innerHTML = `<span>
            <strong>${token}</strong>
            <button onClick="CKShop.${methodToCall}(${token})">Select</button>
            </span>
        `;
        list.appendChild(li);
    });
}

export function renderAssets(assets, list, methodToCall) {
    clear(list);
    assets.map(asset => {
        const assetHtml = `
            <img src="${asset.image_original_url}" alt="" class="ck-token-image" />
            <p>
                <strong class="ck-token-id">
                    ID: ${asset.id}
                </strong>
                <br />
                <span class="ck-token-description">${asset.description}</span>
            </p>
            <button class="ck-token-buy-button" onclick="CKShop.${methodToCall}(${asset.id})">Select</button>
            <a href="${asset.external_link}" class="ck-token-original-url">View on CrytoKitties.co</a>
        `
        const li = document.createElement("li");
        li.setAttribute("class", "ck-token");

        li.innerHTML = assetHtml;
        list.appendChild(li);
    });
}