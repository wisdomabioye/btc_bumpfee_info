
#### Get BTC bumper fee
This script is used for `Replace-By-Fee (RBF)` i.e `bitcoin-cli bumpfee 'txId'`

A GET request to `/tx/:txId` will return a response similar to

```javascript
    {
        "code": boolean,
        "message": "Fetched",
        "success": boolean,
        "data": {
            "txId": string,
            "txConfirmed": boolean,
            "shouldBump": boolean,
            "prevFee": number,
            "prevSatVbyte": number,
            "idealFee": number,
            "idealSatVbyteFee": number,
            "turboFee": number,
            "turboSatVbyte": number
        }
    }
```

#### Install (requires node.js >= 20.10.0)

`git clone`

`npm install`

###### Development
`npm run dev` 


###### Build for Production
`npm run build`