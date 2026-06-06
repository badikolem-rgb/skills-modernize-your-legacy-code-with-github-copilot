const { AccountSession, INITIAL_BALANCE, isValidMenuChoice } = require('./accounting');

describe('Accounting application business logic', () => {
  test('TC-01: View current account balance', () => {
    const session = new AccountSession();
    expect(session.readBalance()).toBe(INITIAL_BALANCE);
  });

  test('TC-02: Credit account with valid amount', () => {
    const session = new AccountSession();
    const updatedBalance = session.credit(250.0);
    expect(updatedBalance).toBe(1250.0);
    expect(session.readBalance()).toBe(1250.0);
  });

  test('TC-03: Debit account with sufficient funds', () => {
    const session = new AccountSession();
    session.credit(250.0);
    const updatedBalance = session.debit(250.0);
    expect(updatedBalance).toBe(1000.0);
    expect(session.readBalance()).toBe(1000.0);
  });

  test('TC-04: Debit account with insufficient funds', () => {
    const session = new AccountSession();
    expect(() => session.debit(1500.0)).toThrow('Insufficient funds for this debit.');
    expect(session.readBalance()).toBe(INITIAL_BALANCE);
  });

  test('TC-05: Invalid menu selection handling', () => {
    expect(isValidMenuChoice('9')).toBe(false);
    expect(isValidMenuChoice('wrong')).toBe(false);
    expect(isValidMenuChoice('1')).toBe(true);
  });

  test('TC-06: Exit application gracefully - account session remains stable', () => {
    const session = new AccountSession();
    expect(session.readBalance()).toBe(INITIAL_BALANCE);
  });

  test('TC-07: Data persistence within session', () => {
    const session = new AccountSession();
    session.credit(75.0);
    session.debit(25.0);
    expect(session.readBalance()).toBe(1050.0);
  });
});
