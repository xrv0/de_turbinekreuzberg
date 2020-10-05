# CryptoKitties basket

## local dev chain

the chain mines an (empty) block every 15 seconds. Comes with increased gas limit

`docker-compose up -d ganache`
`docker-compose logs -f ganache`

## start developing

1. Create a local Crypto Kitty instance first -> follow instructions in CryptoKitties
   take note of its addresses, create some promotional kitties upfront
2. Create the cryptokitties-shop
   create a utility token first (see Readme there)
   deploy the shop as upgradeable contract locally

   