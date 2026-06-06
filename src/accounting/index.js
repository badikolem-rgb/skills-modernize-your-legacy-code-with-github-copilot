const readline = require('readline');
const { AccountSession } = require('./accounting');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

async function run() {
  const session = new AccountSession();
  let continueRunning = true;

  while (continueRunning) {
    showMenu();
    const choice = await askQuestion('Enter your choice (1-4): ');

    switch (choice) {
      case '1': {
        const balance = session.readBalance();
        console.log(`Current balance: ${balance.toFixed(2)}`);
        break;
      }
      case '2': {
        const amount = await askQuestion('Enter credit amount: ');
        const value = Number(amount);
        if (Number.isNaN(value) || value < 0) {
          console.log('Invalid amount. Please enter a positive number.');
          break;
        }
        const updatedBalance = session.credit(value);
        console.log(`Amount credited. New balance: ${updatedBalance.toFixed(2)}`);
        break;
      }
      case '3': {
        const amount = await askQuestion('Enter debit amount: ');
        const value = Number(amount);
        if (Number.isNaN(value) || value < 0) {
          console.log('Invalid amount. Please enter a positive number.');
          break;
        }
        try {
          const updatedBalance = session.debit(value);
          console.log(`Amount debited. New balance: ${updatedBalance.toFixed(2)}`);
        } catch (error) {
          console.log(error.message);
        }
        break;
      }
      case '4': {
        continueRunning = false;
        console.log('Exiting the program. Goodbye!');
        break;
      }
      default: {
        console.log('Invalid choice, please select 1-4.');
      }
    }
  }

  rl.close();
}

if (require.main === module) {
  run();
}

module.exports = {
  run,
  showMenu,
};
