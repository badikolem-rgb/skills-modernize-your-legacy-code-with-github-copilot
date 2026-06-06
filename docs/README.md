# School Accounting System COBOL Overview

This document summarizes the COBOL source files in `src/cobol/` and explains how they work together to support a simple school account management system.

## File Purposes

### `src/cobol/main.cob`
- Acts as the user interface and program entry point.
- Displays a menu with options:
  1. View Balance
  2. Credit Account
  3. Debit Account
  4. Exit
- Accepts a numeric choice from the user and routes the request to `Operations`.
- Keeps running until the user selects Exit.

### `src/cobol/operations.cob`
- Contains the business logic for account operations.
- Receives an operation type from `MainProgram` and performs one of:
  - `TOTAL`: read and display the current account balance.
  - `CREDIT`: prompt for an amount, add it to the balance, write the updated balance.
  - `DEBIT`: prompt for an amount, verify sufficient funds, subtract and write the updated balance.
- Uses `DataProgram` for reading and writing the stored balance.
- Enforces basic validation for debit operations.

### `src/cobol/data.cob`
- Handles balance storage and retrieval.
- Provides two operations via `LINKAGE SECTION`:
  - `READ`: returns the current stored balance.
  - `WRITE`: updates the stored balance with a new value.
- Uses `STORAGE-BALANCE` in working storage as the in-memory account balance.

## Key Functions and Flow

1. `MainProgram` displays the menu and passes the selected operation to `Operations`.
2. `Operations` determines the requested action and uses `DataProgram` for persistence.
3. `DataProgram` reads or writes the balance for the current session.

## Business Rules

- The system manages a single student account balance.
- Initial balance is set to `1000.00`.
- A credit operation adds the entered amount to the current balance.
- A debit operation only succeeds if the current balance is greater than or equal to the requested debit amount.
- If funds are insufficient, the system displays `Insufficient funds for this debit.` and does not change the balance.
- The system accepts only numeric menu input and loops until `Exit` is selected.

## Notes and Limitations

- Account storage is in-memory only; there is no external file or database persistence.
- `STORAGE-BALANCE` is initialized each run, so the balance resets to `1000.00` when the program restarts.
- The system is structured as a simple three-program COBOL application with clear separation of UI, operations, and data handling.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User as User
    participant Main as MainProgram
    participant Ops as Operations
    participant Data as DataProgram

    User->>Main: choose menu option
    Main->>Ops: CALL 'Operations' USING operation

    alt View Balance
        Ops->>Data: CALL 'DataProgram' USING 'READ', FINAL-BALANCE
        Data-->>Ops: return FINAL-BALANCE
        Ops-->>User: display current balance
    else Credit Account
        Ops-->>User: prompt credit amount
        User-->>Ops: enter AMOUNT
        Ops->>Data: CALL 'DataProgram' USING 'READ', FINAL-BALANCE
        Data-->>Ops: return FINAL-BALANCE
        Ops: ADD AMOUNT TO FINAL-BALANCE
        Ops->>Data: CALL 'DataProgram' USING 'WRITE', FINAL-BALANCE
        Ops-->>User: display new balance
    else Debit Account
        Ops-->>User: prompt debit amount
        User-->>Ops: enter AMOUNT
        Ops->>Data: CALL 'DataProgram' USING 'READ', FINAL-BALANCE
        Data-->>Ops: return FINAL-BALANCE
        alt sufficient funds
            Ops: SUBTRACT AMOUNT FROM FINAL-BALANCE
            Ops->>Data: CALL 'DataProgram' USING 'WRITE', FINAL-BALANCE
            Ops-->>User: display new balance
        else insufficient funds
            Ops-->>User: display error
        end
    end
```
