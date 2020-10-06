# setup a local Cryptokittie instance

you'll need npm from here ;) 

`cd Cryptokitties` && `npm install`

## Contracts setup

### deploy base contracts

`npx oz link @openzeppelin/contracts-ethereum-package`
`npx oz deploy -k regular` ...
(alles regular, wir daten hier nix mehr up ;) )

1. KittyCore
(Adresse merken ;) ) 0x4387497A2231C0c9dc3f62E29ED635282561beEe

2. GeneScience
- _priviledgedBirtherAddress -> ein lokaler Account
- _kittyCoreAddress -> Die Adresse von KittyCore
0x0E93750C96e04029f3D0e99103EC33F2d5b4d298

3. SaleClockAuction (0x0deD98d62e1456F522f0a229d1262428732F11F6)
- _nftAddr -> Die Adresse von KittyCore
- _cut -> 2 (Die Gebühr, die die Auction für den Betreiber einbehält)

4. SiringClockAuction (0x8Fd621e3eCD05660e175d567c3692391E1bDd1e6)
- _nftAddr -> Die Adresse von KittyCore
- _cut -> 2 (Die Gebühr, die die Auction für den Betreiber einbehält)

### start the kittie contract

`npx oz send-tx`...
auf KittyCore:
- setGeneScienceAddress 
- setSaleAuctionAddress
- setSiringAuctionAddress
- unpause

### create promo kitties / gen0 

`send-tx` auf KittyCore `createPromoKittie` (genes, s.u., owner = der neue Owner ;) )

Gen-Samples (kann man auch bei Etherscan / Mainnet / nachschlagen mit getKitty)
```
448850015070492241315743866917352335326399850496111555001933357499189410
621445314446287161179785477406960521486277152950634317531642255405187073
235327235821309680853799563483843563565251677402421571995254103148235872
```

### check balances / meta

`npx oz call`...
```
promoCreatedCount()  
balanceOf()  
tokensOfOwner() // funktioniert jetzt, weil es ja kaum Katzen gibt ;)  
```

### breed new cats

(man muss 2 finney = 2000000000000000 wei / 0.002 Eth mitschicken)
`npx oz send-tx --value=2000000000000000`

`KittyCore::breedWithAuto(matronId: 1,sireId: 2)`
= emittiert ein Pregnant event

auf der lokalen Blockchain müssen jetzt einige Blöcke vergehen... 

`isPregnant(1)` -> true
`pregnantKitties` -> 1 (1 Katze ist trächtig)
`isReadyToBreed(1)` -> false, 1 ist ja schon trächtig

dann `npx oz send-tx` KittyCore `giveBirth(1)`
= erzeugt Katze 4

call KittyCore `getKitty(4)` ->

```
Result {
  isGestating: false,
  isReady: true,
  cooldownIndex: '0',
  nextActionAt: '0',
  siringWithId: '0',
  birthTime: '1601901612',
  matronId: '1',
  sireId: '2',
  generation: '1',
  genes: '455803995852781406063396852439174361830147058868636192968503394713436161'
}
```

## deploy upgradeable Basket
-> see docs in crypotkitties-shop


### local accounts

- 0: 0x8Dccb0559a7c33e9e612537840600dAaaEFE18A9
- 1: 0x176793b9C0fF242c8A0f2496360B9d83a80Fa03d
- 2: 0xa6c885A08F7FADB9AA8a265Da620089618566498
- 3: 0x00Be64BCF5779F9A8b345aD5f1f321039182ee8c
- 4: 0xE697Af07CDfA44Af83C0b0D6416672F9e2A8DEA6
- 5: 0x3De6842DACF2F18bFd0CCf9090a804Cb8d05ae2b
- 6: 0x108131E9FA5d0a5ABEb3d48924198416E4c5DE48
- 7: 0x34Cd14564Ead68cF4c80928539A69Bb7e8203061
- 8: 0xA2e2C4fB3A70fC33c5A3edF57D986c99ab05F6F8
- 9: 0x92b706cf109f4A185b2035DD5632343CcDee23d5
