import {iota, Converter} from './IOTAPackages.js';

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

sendIOTA("EVRJHOK9UXEHGNMGOKAICDZPFESKZCJTMYYCILXOPFVXCVPXQDWEZSV9UVBBVHBWGWPJPXNFZORSSULOM",
    "LOBHTGVOANUDADQOYHQOPNNHMRCPQKUTDXLGIGRHCFDPAIVJSFEYVHXMUMDBARJRMREZMW9AENXHNDIGWCZQWVGPHZ",
    0,
    "Hello bob");