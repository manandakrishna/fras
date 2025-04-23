# Epics, Features, and User Stories for Employee Management

## Table of Contents

1. [Epics](#epics)
2. [Features](#features)
3. [User Stories with Acceptance Criteria](#user-stories-with-acceptance-criteria)

---

## Epics

| Epic ID | Epic Name                          | Description                                                                 |
|---------|------------------------------------|-----------------------------------------------------------------------------|
| E1      | Employee Management               | Manage employees, including adding, editing, and viewing employee details. |

---

## Features

| Feature ID | Epic ID | Feature Name               | Description                                                                 |
|------------|---------|---------------------------|-----------------------------------------------------------------------------|
| F1         | E1      | Add Employee              | Allow admins to add new employees to the system.                           |
| F2         | E1      | Edit Employee             | Allow admins to edit existing employee details.                            |
| F3         | E1      | View Employee List        | Display a list of employees with pagination and filtering options.         |

---

## User Stories with Acceptance Criteria

### 1. Add Employee

| User Story ID | Feature ID | User Story                                                                 |
|---------------|------------|---------------------------------------------------------------------------|
| US1           | F1         | As an admin, I want to add a new employee so that they can be managed.   |

#### Acceptance Criteria

| Criteria Type | Acceptance Criteria                                                                                     |
|---------------|-------------------------------------------------------------------------------------------------------|
| Positive      | The "Add Employee" modal should open when the "Add Employee" button is clicked.                       |
| Positive      | The employee should be added successfully when valid data is entered and the "Save" button is clicked.|
| Positive      | A success notification should be displayed after the employee is added.                               |
| Negative      | The "Save" button should be disabled if required fields (e.g., name, phone) are empty.                |
| Negative      | An error message should be displayed if the phone number is not numerical.                            |
| Negative      | If the API call fails, the modal should remain open, and an error should be logged.                   |

---

### 2. Edit Employee

| User Story ID | Feature ID | User Story                                                                 |
|---------------|------------|---------------------------------------------------------------------------|
| US2           | F2         | As an admin, I want to edit employee details so that I can update their information. |

#### Acceptance Criteria

| Criteria Type | Acceptance Criteria                                                                                     |
|---------------|-------------------------------------------------------------------------------------------------------|
| Positive      | The "Edit Employee" modal should open when an employee row is clicked.                                |
| Positive      | The employee details should be updated successfully when valid data is entered and the "Save" button is clicked. |
| Positive      | A success notification should be displayed after the employee details are updated.                    |
| Negative      | The "Save" button should be disabled if required fields are empty.                                    |
| Negative      | An error message should be displayed if the phone number is not numerical.                            |
| Negative      | If the API call fails, the modal should remain open, and an error should be logged.                   |

---

### 3. View Employee List

| User Story ID | Feature ID | User Story                                                                 |
|---------------|------------|---------------------------------------------------------------------------|
| US3           | F3         | As an admin, I want to view a list of employees so that I can manage them easily. |

#### Acceptance Criteria

| Criteria Type | Acceptance Criteria                                                                                     |
|---------------|-------------------------------------------------------------------------------------------------------|
| Positive      | The employee list should display employee details such as ID, name, phone number, and status.         |
| Positive      | The list should support pagination and display the correct number of rows per page.                   |
| Positive      | Admin should be able to toggle between "Active Users" and "All Users" using a switch.                 |
| Negative      | A "No employees found" message should be displayed if there are no employees in the system.           |
| Negative      | If the API call fails, an error message should be logged, and an empty list should be displayed.       |

---

## Notes

- Each feature and user story is designed to ensure a seamless user experience.
- The acceptance criteria include both positive and negative scenarios to ensure comprehensive testing.
