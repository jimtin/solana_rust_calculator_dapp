// Import the necessary libraries
const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { AssertionError } = require('chai');
const { SystemProgram } = anchor.web3;

// Tests
describe('mycalculatorapp', () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mycalculatorapp;

  // Test creation of the calculator
  it('Creates a calculator', async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator]
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "Welcome to Solana");
    _calculator = calculator;
  });

  // Test the addition function
  it('Adds two numbers', async function() {
    const calculator = _calculator;

    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts:{
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  // Test the multiplication function
  it('Multiplies two numbers', async function() {
    const calculator = _calculator;

    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts:{
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(6)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  // Test the subtraction function
  it('Subtracts two numbers', async function(){
    const calculator = _calculator;
    
    await program.rpc.subtract(new anchor.BN(3), new anchor.BN(2), {
      accounts:{
        calculator: calculator.publicKey,
      }, 
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(1)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  // Test the division function
  it('Divides two numbers', async function() {
    const calculator = _calculator;

    await program.rpc.divide(new anchor.BN(3), new anchor.BN(2), {
      accounts:{
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(1)));
    console.log(account.remainder);
    assert.ok(account.remainder.eq(new anchor.BN(1)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

});