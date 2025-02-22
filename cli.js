const { json } = require("body-parser");
const dotenv = require("dotenv");
const fetch = require('node-fetch');
dotenv.config();

const USER = "srikanthsrnvs";
const PASS = "runescape";
const TESTNET = true
const port = TESTNET ? 18332 : 8332
const BASEURL = `http://${USER}:${PASS}@127.0.0.1:${port}/`

const headers = {
  "content-type": "text/plain;"
};

function wif_generator(privateKey) {
    const step1 = Buffer.from("80" + privateKey, 'hex');
    const step2 = sha256(step1);
    const step3 = sha256(Buffer.from(step2, 'hex'));
    const checksum = step3.substring(0, 8);
    const step4 = step1.toString('hex') + checksum;
    const privateKeyWIF = base58.encode(Buffer.from(step4, 'hex'));
    return privateKeyWIF;
  }

function generate_datastring(method, params){
    var datastring = `{"jsonrpc":"1.0","id":"curltext","method":"${method}","params":${JSON.stringify(params)}}`;
    console.log("Constructed datastring: ", datastring)
    return datastring
}

async function set_hd_seed(seed, wallet_name) {
    const datastring = generate_datastring("sethdseed", [true, seed])
    var options = {
        method: "POST",
        headers: headers,
        body: datastring
    };
    const response = await fetch(BASEURL + `wallet/${wallet_name}`, options)
    const body = await response.json()
    console.log("Bitcoin-core response: ", body)
    return body
}

async function create_new_wallet(name) {
  const datastring = generate_datastring("createwallet", [name, false, true])
  var options = {
    method: "POST",
    headers: headers,
    body: datastring
  };
  const response = await fetch(BASEURL, options)
  const body = await response.json()
  console.log("Bitcoin-core response: ", body)
  return body
}

async function create_new_address(wallet_name) {
  const datastring = generate_datastring("getnewaddress", ["", "legacy"])
  var options = {
      method: "POST",
      headers: headers,
      body: datastring
  };
  const response = await fetch(BASEURL + `wallet/${wallet_name}`, options)
  const body = await response.json()
  console.log("Bitcoin-core response: ", body)
  return body
}

async function unload_wallet(name) {
  const datastring = generate_datastring("loadwallet", [""])
}

exports.set_hd_seed = set_hd_seed;
exports.wif_generator = wif_generator;
exports.create_new_wallet = create_new_wallet;
exports.create_new_address = create_new_address;