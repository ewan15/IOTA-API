import {iota, Converter} from './IOTAPackages.js';

let addressType = {address: String, hasRead: Boolean}

let addressList = [];



export let sendIOTA = function (seed,addr,amount,msg) {
    const transfers = [{
        address: addr,
        value: amount, // 1Ki
        tag: '', // optional tag of `0-27` trytes
        message: Converter.asciiToTrytes(msg) // optional message in trytes
    }]
    iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            // Persist trytes locally before sending to network.
            // This allows for reattachments and prevents key reuse if trytes can't
            // be recovered by querying the network after broadcasting.

            // Does tip selection, attaches to tangle by doing PoW and broadcasts.
            return iota.sendTrytes(trytes, 3, 14)
        })
        .then(bundle => {
            console.log(`Published transaction with tail hash: ${bundle[0].hash}`)
            console.log(`Bundle: ${bundle}`)
        })
        .catch(err => {
            console.log(err)
        })
}

export let generateAddress = function(seed) {

    return iota.getNewAddress(Converter.asciiToTrytes(seed))
        .then(address => {
            addressList.push(addressType[address, false])
            address
        })
        .catch(err => {

        })
}

let onRecieveTransaction = function(func)
{
    iota.findTransactions({ addresses: addressList.address })
        .then(hashes => {
            if (!addressList.find(hashes).hasRead) {
                addressList.find(hashes).hasRead = true;
                func(hashes)
            }
        })
        .catch(err => {
            // handle errors here
        })
}

export let ActivateOnReceieveTransaction = function(func)
{
    setInterval(function() {
        onRecieveTransaction(func)
    }, 5000);
}
