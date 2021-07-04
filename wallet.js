const {WalletClient, NodeClient, Network} = require('bcoin');
const network = Network.get('testnet');

const clientOptions = {
  network: network.type,
  port: network.rpcPort,
  apiKey: 'runescape'
}
const client = new NodeClient(clientOptions);
const API_KEY = "runescape"
const walletOptions = {
  network: network.type,
  port: network.walletPort,
  apiKey: 'runescape'
}
const walletClient = new WalletClient(walletOptions);


async function create_wallet(name, mnemonic){
  const options = {
    mnemonic
  };
  const result = await walletClient.createWallet(id, options);
  console.log(result);
  return result
}

async function get_wallet(name, mnemonic){
  const wallet = await create_wallet(name, mnemonic);
  const wallet = walletClient.wallet(name);
  const result = await wallet.getInfo();
  console.log(result);
}



exports.create_wallet = create_wallet
exports.get_wallet = get_wallet