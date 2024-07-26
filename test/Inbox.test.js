const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const assert = require('assert');
const { abi, evm } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

// contract test code will go here
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //use one of those accounts to deploy
    //the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bycode.object, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' });
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0], gas: '1000000'});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    })
})