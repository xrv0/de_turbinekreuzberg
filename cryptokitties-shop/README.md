# CryptoKitties Shop
Auf der Webseite werden alle Katzen, die dem Smart Contract gehören mit dem entsprechendem Bild angezeigt. Es gibt die Möglichkeit eine auszuwählen und sie dann mit einem SURY Token zu kaufen. Wenn man eine Cryptokittie an den Smart Contract schickt, bekommt man einen SURY Token als Ausgleich.

## initialize node dependencies

(also provide access to oz base contracts)
```
npm install  
npx oz link @openzeppelin/contracts-ethereum-package
npx oz compile
```

### create an ERC20 utility token *before* deploying the shop

aka ("Sury"-)token sample

`npx oz deploy` -> regular -> `@openzeppelin/contracts-ethereum-package/ERC20PresetMinterPauserUpgradeSafe`  
`npx oz send-tx` -> initialize("SURY", "SRY") 
(you cannot call that method twice ;) ) 
`npx oz send-tx` mint(<some receiver>, 20000000000000000000) 
(tokens must me given in wei following the 18 decimals standard in ERC20)

## Deploy an upgradeable cryptokitties-shop instance locally

1. install a local KittyCore instance first (see CryptoKitties) or put down an address of a kitty core contract before compiling / deploying this.

2. npx oz deploy 
 upgradeable / CryptoKittiesShop
    -> might take a while (deploys all base contracts first)

3. call a method -> yes -> initialize(<the cryptokittie Core contract's address>,<the utility contract's address>)

4. take down this upgradeable base address

## transfers

1. use the CryptoKitty's contract to transfer kitties to the basket's address
2. check the basket balance `npx oz call` -> `getKittieBalance`
3. transfer back the kitty `npx oz send-tx` -> `giveMeKittie(number)`


# setup the frontend

copy .env to .env.local and change the contract addresses
`npm run dev`  

sometimes you need to `rm -rf .cache` so parcel loves you again.

(change the production build command to npm run build and add environment secrets to your fleek instance)


