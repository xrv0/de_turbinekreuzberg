# CryptoKitties Shop
Auf der Webseite werden alle Katzen, die dem Smart Contract gehören mit dem entsprechendem Bild angezeigt. Es gibt die Möglichkeit eine auszuwählen und sie dann mit einem SURY Token zu kaufen. Wenn man eine Cryptokittie an den Smart Contract schickt, bekommt man einen SURY Token als Ausgleich.

## Deploy locally & upgradeable

1. install a local KittyCore instance first or put down an address of a kitty core contract before compiling / deploying this.

npm install  
npx oz compile

2. npx oz deploy 
 upgradeable / CryptoKittiesBasket
    -> might take a while (deploys all base contracts first)

3. call a method -> yes -> initialize(<the cryptokittie Core contract's address>)

4. take down this upgradeable base address

## transfers

1. use the CryptoKitty's contract to transfer kitties to the basket's address
2. check the basket balance `npx oz call` -> `getKittieBalance`
3. transfer back the kitty `npx oz send-tx` -> `giveMeKittie(number)`
 
