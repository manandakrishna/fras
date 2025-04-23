# Test Cases with Test Data for Employee Management

## Table of Contents

1. [Add Employee Test Cases](#add-employee-test-cases)
2. [Edit Employee Test Cases](#edit-employee-test-cases)
3. [View Employee List Test Cases](#view-employee-list-test-cases)

---

## 1. Add Employee Test Cases

| Test Case ID | User Story ID | Test Case Description                                                                 | Test Steps                                                                                     | Test Data                                                                                     | Expected Outcome                                                                                 |
|--------------|---------------|---------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| TC1          | US1           | Verify that the "Add Employee" modal opens when the "Add Employee" button is clicked. | 1. Navigate to the Employees page. <br> 2. Click the "Add Employee" button.                   | N/A                                                                                            | The "Add Employee" modal should open.                                                          |
| TC2          | US1           | Verify that an employee is added successfully when valid data is entered.             | 1. Open the "Add Employee" modal. <br> 2. Enter valid `Name` and `Phone Number`. <br> 3. Click "Save". | Name: "John Doe" <br> Phone: "1234567890"                                                     | The employee should be added to the list, and a success notification should be displayed.      |
| TC3          | US1           | Verify that the "Save" button is disabled if required fields are empty.               | 1. Open the "Add Employee" modal. <br> 2. Leave the `Name` and `Phone Number` fields empty.    | Name: "" <br> Phone: ""                                                                        | The "Save" button should be disabled.                                                          |
| TC4          | US1           | Verify that an error message is displayed for invalid phone numbers.                  | 1. Open the "Add Employee" modal. <br> 2. Enter a non-numerical value in the `Phone Number` field. <br> 3. Click "Save". | Name: "Jane Doe" <br> Phone: "abc123"                                                         | An error message should be displayed, and the employee should not be added.                    |
| TC5          | US1           | Verify that the modal remains open if the API call fails.                             | 1. Open the "Add Employee" modal. <br> 2. Enter valid data. <br> 3. Simulate an API failure. <br> 4. Click "Save". | Name: "John Smith" <br> Phone: "9876543210"                                                   | The modal should remain open, and an error should be logged.                                   |

---

## 2. Edit Employee Test Cases

| Test Case ID | User Story ID | Test Case Description                                                                 | Test Steps                                                                                     | Test Data                                                                                     | Expected Outcome                                                                                 |
|--------------|---------------|---------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| TC6          | US2           | Verify that the "Edit Employee" modal opens when an employee row is clicked.          | 1. Navigate to the Employees page. <br> 2. Click on an employee row.                           | Employee ID: 1                                                                                | The "Edit Employee" modal should open with pre-filled details.                                  |
| TC7          | US2           | Verify that employee details are updated successfully when valid data is entered.     | 1. Open the "Edit Employee" modal. <br> 2. Update the `Phone Number` field with valid data. <br> 3. Click "Save". | Phone: "1122334455"                                                                           | The employee details should be updated, and a success notification should be displayed.        |
| TC8          | US2           | Verify that the "Save" button is disabled if required fields are empty.               | 1. Open the "Edit Employee" modal. <br> 2. Clear the `Phone Number` field.                     | Phone: ""                                                                                     | The "Save" button should be disabled.                                                          |
| TC9          | US2           | Verify that an error message is displayed for invalid phone numbers.                  | 1. Open the "Edit Employee" modal. <br> 2. Enter a non-numerical value in the `Phone Number` field. <br> 3. Click "Save". | Phone: "invalid123"                                                                           | An error message should be displayed, and the employee details should not be updated.          |
| TC10         | US2           | Verify that the modal remains open if the API call fails.                             | 1. Open the "Edit Employee" modal. <br> 2. Enter valid data. <br> 3. Simulate an API failure. <br> 4. Click "Save". | Phone: "9988776655"                                                                           | The modal should remain open, and an error should be logged.                                   |

---

## 3. View Employee List Test Cases

| Test Case ID | User Story ID | Test Case Description                                                                 | Test Steps                                                                                     | Test Data                                                                                     | Expected Outcome                                                                                 |
|--------------|---------------|---------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| TC11         | US3           | Verify that the employee list displays employee details correctly.                    | 1. Navigate to the Employees page.                                                            | N/A                                                                                            | The employee list should display details such as ID, name, phone number, and status.           |
| TC12         | US3           | Verify that pagination works correctly.                                               | 1. Navigate to the Employees page. <br> 2. Navigate to the next page using the pagination controls. | N/A                                                                                            | The next set of employees should be displayed.                                                 |
| TC13         | US3           | Verify that the toggle switch filters employees correctly.                            | 1. Navigate to the Employees page. <br> 2. Toggle the switch to "Active Users."                | N/A                                                                                            | Only active employees should be displayed.                                                     |
| TC14         | US3           | Verify that a "No employees found" message is displayed when there are no employees.  | 1. Navigate to the Employees page. <br> 2. Ensure the employee list is empty.                  | N/A                                                                                            | A "No employees found" message should be displayed.                                            |
| TC15         | US3           | Verify that an error message is logged if the API call fails.                         | 1. Simulate an API failure when fetching employees.                                            | N/A                                                                                            | An error message should be logged, and an empty list should be displayed.                      |

---

## Notes

- **Test Data** includes both valid and invalid inputs for comprehensive testing.
- **Expected Outcomes** ensure that both positive and negative scenarios are validated.
- Simulated API failures can be tested using mock APIs or network throttling tools.
