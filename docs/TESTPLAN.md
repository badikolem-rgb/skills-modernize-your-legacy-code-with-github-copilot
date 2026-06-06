# School Accounting System Test Plan

This document describes a validation test plan for the current COBOL school accounting application. It covers the business logic and implementation flow for the account balance, credit, and debit operations.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|--------------|------------------------|----------------|------------|-----------------|---------------|--------------------|----------|
| TC-01 | View current account balance | Application is running, initial balance is set to 1000.00 | 1. Start the app
2. Enter `1` to view balance | Displayed balance is `1000.00` |  |  | Verify initial balance read from DataProgram |
| TC-02 | Credit account with valid amount | Application is running, current balance is 1000.00 | 1. Start the app
2. Enter `2` to credit account
3. Enter `250.00` as credit amount | Balance is read as 1000.00, then updated to 1250.00 and displayed |  |  | Verify write operation updates balance |
| TC-03 | Debit account with sufficient funds | Application is running, current balance is 1250.00 | 1. Start the app
2. Enter `3` to debit account
3. Enter `250.00` as debit amount | Balance is read as 1250.00, then updated to 1000.00 and displayed |  |  | Verify funds are subtracted when sufficient |
| TC-04 | Debit account with insufficient funds | Application is running, current balance is 1000.00 | 1. Start the app
2. Enter `3` to debit account
3. Enter `1500.00` as debit amount | System displays `Insufficient funds for this debit.` and balance remains 1000.00 |  |  | Verify no update occurs on insufficient funds |
| TC-05 | Invalid menu selection handling | Application is running | 1. Start the app
2. Enter `9` or other invalid option | System displays `Invalid choice, please select 1-4.` and continues prompting |  |  | Verify invalid input does not exit app |
| TC-06 | Exit application gracefully | Application is running | 1. Start the app
2. Enter `4` to exit | System displays `Exiting the program. Goodbye!` and terminates |  |  | Verify exit path works cleanly |
| TC-07 | Data persistence within session | Application is running | 1. Start the app
2. Credit or debit an amount
3. View balance in the same session | Balance reflects the updated value after write operation |  |  | Verify in-memory persistence via DataProgram within session |

## Notes

- `Actual Result` and `Status` should be filled in during validation with stakeholders.
- The current implementation stores balance in memory only and resets to `1000.00` on each application restart.
- This test plan is suitable for converting the same behavior into Node.js unit and integration tests.
