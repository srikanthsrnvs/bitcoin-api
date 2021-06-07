const dotenv = require("dotenv");
const fetch = require('node-fetch');
dotenv.config();

const USER = "bitcoinrpc";
const PASS = "runescape";
const BASEURL = `http://${USER}:${PASS}@127.0.0.1:8332/`

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
    var param_string = "["
    for (const param in params){
        param_string += `"${String(params[param])}"`
        if (param != (params.length - 1)){
            param_string += ","
        }
    }
    param_string += "]"
    var datastring = `{"jsonrpc":"1.0","id":"curltext","method":"${method}","params":${param_string}}`;
    console.log("Constructed datastring: ", datastring)
    return datastring
}

async function set_hd_seed(seed) {
    const datastring = generate_datastring("sethdseed", ["true", "Kz8p5ycnkQqq2T3bxWHt7pRoG3HRmUbUpf5cr7qyy8qLLhuMgJSp"])
    var options = {
        method: "POST",
        headers: headers,
        body: datastring
    };
    const response = await fetch(BASEURL, options)
    const body = await response.json()
    console.log(body)
    return body
}

exports.set_hd_seed = set_hd_seed;
exports.wif_generator = wif_generator;