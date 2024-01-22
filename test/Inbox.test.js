const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const assert = require('assert');

let accounts;

// contract test code will go here
beforeEach(async() => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //use one of those accounts to deploy
    //the contract
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(accounts);
    })
})