require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");
const mnemonic = process.env.MNEMONIC;

const provider = new HDWalletProvider(
  mnemonic,
  "https://sepolia.infura.io/v3/136e7cebfea84fd7a9fcf2c3cfe4340b"
);

const web3 = new Web3(provider);

// deploy code will go here

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const res = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi There"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", res.options.address);
  provider.engine.stop();
};

deploy();
