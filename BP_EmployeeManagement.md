# Business Process for Employee Management

## Overview

The **Employee Management** process in the Admin Web Panel allows administrators to manage employee data, including adding, editing, and viewing employee details. This document outlines the key steps, actions, and validations involved in the process.

---

## Table of Contents

1. [Add Employee Process](#add-employee-process)
2. [Edit Employee Process](#edit-employee-process)
3. [View Employee List Process](#view-employee-list-process)
4. [Notifications and Feedback](#notifications-and-feedback)
5. [Process Flow Diagrams](#process-flow-diagrams)

---

## 1. Add Employee Process

### Objective
To allow administrators to add new employees to the system.

### Steps
1. **Open Add Employee Modal**:
   - Admin clicks the "Add Employee" button.
   - The system calculates the next employee ID based on the existing employee list.
   - The "Add Employee" modal opens with empty fields for `Name` and `Phone Number`.

2. **Validate Input**:
   - Admin enters the employee's name and phone number.
   - The system validates the input:
     - `Name` must not be empty.
     - `Phone Number` must be numerical.

3. **Save Employee**:
   - Admin clicks the "Save" button.
   - The system sends a request to the `addEmployee` API with the employee details.
   - On success:
     - The new employee is added to the employee list.
     - The modal closes.
     - A success notification is displayed.

4. **Error Handling**:
   - If the API call fails, an error message is logged, and the modal remains open.

---

## 2. Edit Employee Process

### Objective
To allow administrators to edit existing employee details.

### Steps
1. **Open Edit Employee Modal**:
   - Admin clicks on an employee row in the table.
   - The "Edit Employee" modal opens with pre-filled details for the selected employee.

2. **Update Employee Details**:
   - Admin updates the `Phone Number`, `Employee Status`, or `Enroll Status`.
   - The system validates the input:
     - `Phone Number` must be numerical.
     - `Employee Status` and `Enroll Status` must follow business rules:
       - `Employee Status` cannot be changed to "Active" if it is "Terminated."
       - `Enroll Status` cannot be reset if the employee is "Terminated."

3. **Save Changes**:
   - Admin clicks the "Save" button.
   - The system sends a request to the `editEmployee` API with the updated details.
   - On success:
     - The employee details are updated in the employee list.
     - The modal closes.
     - A success notification is displayed.

4. **Error Handling**:
   - If the API call fails, an error message is logged, and the modal remains open.

---

## 3. View Employee List Process

### Objective
To allow administrators to view and manage the list of employees.

### Steps
1. **Fetch Employee Data**:
   - The system fetches employee data from the `getEmployees` API when the page loads.
   - The data is sorted by `Employee ID`.

2. **Display Employee List**:
   - The employee list is displayed in a table with the following columns:
     - `Employee ID`
     - `Name`
     - `Phone Number`
     - `Enroll Status`
     - `Employee Status`

3. **Filter and Pagination**:
   - Admin can toggle between "Active Users" and "All Users" using a switch.
   - The table supports pagination, allowing admins to navigate through the employee list.

4. **Error Handling**:
   - If the API call fails, an error message is logged, and an empty list is displayed with a "No employees found" message.

---

## 4. Notifications and Feedback

### Success Notifications
- **Add Employee**:
  - A success notification ("Employee Added Successfully") is displayed after successfully adding a new employee.
- **Edit Employee**:
  - A success notification ("Changes Saved Successfully") is displayed after successfully editing an employee.

### Loading Indicators
- A loading spinner is displayed in the main content area while fetching employee data.

### Error Handling
- If an API call fails, an error message is logged, and the user is informed through appropriate feedback.

---

## 5. Process Flow Diagrams

### Add Employee Process

```plaintext
[Admin] --> [Click Add Employee Button] --> [Open Add Employee Modal]
[Admin] --> [Enter Name and Phone Number] --> [Validate Input]
[Valid Input] --> [Call addEmployee API] --> [Success Notification]
[Invalid Input] --> [Show Validation Errors]
[API Error] --> [Log Error and Keep Modal Open]


Edit Employee Process
[Admin] --> [Click Employee Row] --> [Open Edit Employee Modal]
[Admin] --> [Update Details] --> [Validate Input]
[Valid Input] --> [Call editEmployee API] --> [Success Notification]
[Invalid Input] --> [Show Validation Errors]
[API Error] --> [Log Error and Keep Modal Open]



View Employee List Process
[Page Load] --> [Fetch Employee Data from API]
[API Success] --> [Display Employee List with Pagination]
[API Error] --> [Log Error and Show "No Employees Found"]