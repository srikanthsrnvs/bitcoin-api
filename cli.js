const dotenv = require("dotenv");
const fetch = require('node-fetch');
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;
const BASEURL = `http://${USER}:${PASS}@127.0.0.1:8332/`

const headers = {
  "content-type": "text/plain;"
};

function generate_datastring(method, params){
    var param_string = "["
    for (const param in params){
        param_string += String(param)
    }
    param_string += "]"
    var datastring = `{"jsonrpc":"1.0","id":"curltext","method":"${method}","params":${param_string}`;
    return datastring
}

async function set_hd_seed(seed) {
    const datastring = generate_datastring("sethdseed", ["true", seed])
    var options = {
        method: "POST",
        headers: headers,
        body: datastring
    };
    const response = await fetch(BASEURL, options)
    return await response.ok
}

exports.set_hd_seed = set_hd_seed;