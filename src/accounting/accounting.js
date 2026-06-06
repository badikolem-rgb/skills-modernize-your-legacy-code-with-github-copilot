const INITIAL_BALANCE = 1000.0;

class AccountSession {
  constructor(initialBalance = INITIAL_BALANCE) {
    this._balance = Number(initialBalance);
  }

  readBalance() {
    return this._balance;
  }

  writeBalance(newBalance) {
    this._balance = Number(newBalance);
    return this._balance;
  }

  credit(amount) {
    const value = Number(amount);
    if (Number.isNaN(value) || value < 0) {
      throw new Error('Credit amount must be a positive number');
    }

    const currentBalance = this.readBalance();
    const updatedBalance = currentBalance + value;
    this.writeBalance(updatedBalance);
    return updatedBalance;
  }

  debit(amount) {
    const value = Number(amount);
    if (Number.isNaN(value) || value < 0) {
      throw new Error('Debit amount must be a positive number');
    }

    const currentBalance = this.readBalance();
    if (value > currentBalance) {
      throw new Error('Insufficient funds for this debit.');
    }

    const updatedBalance = currentBalance - value;
    this.writeBalance(updatedBalance);
    return updatedBalance;
  }
}

function isValidMenuChoice(choice) {
  return ['1', '2', '3', '4'].includes(String(choice).trim());
}

module.exports = {
  INITIAL_BALANCE,
  AccountSession,
  isValidMenuChoice,
};
