const component = document.getElementById("ck-owned-tokens-list");

function clear() {
    component.innerHTML = "";
}
export function renderTokenList(tokens) {
    clear();
    tokens.map(token => {
        const li = document.createElement("li");
        li.innerHTML = `<span>
            <strong>${token}</strong>
            <button onClick="CKShop.buyToken(${token})">buy</button>
            </span>
        `;
        component.appendChild(li);
    })
}

export function renderAssets(assets) {
    clear();
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
            <button class="ck-token-buy-button" onclick="buyToken(${asset.id})">Buy with 1 $MOHAN</button>
            <a href="${asset.external_link}" class="ck-token-original-url">View on CrytoKitties.co</a>
        `
        const li = document.createElement("li");
        li.setAttribute("class", "ck-token");

        li.innerHTML = assetHtml;
        component.appendChild(li);
    });
}