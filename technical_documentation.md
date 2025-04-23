# Technical Documentation for Admin Web Panel

## Overview

The **Admin Web Panel** is a React-based web application designed for managing employees and monitoring attendance using a face recognition system. It includes features such as employee management, attendance tracking, and a holiday calendar.

---

## Project Structure

The project follows a modular structure for better maintainability and scalability. Below is an overview of the folder structure:
src/ ├── components/ # Reusable UI components ├── layouts/ # Layout components (e.g., MainLayout) ├── pages/ # Application pages (e.g., Employees, Dashboard) ├── services/ # API service calls ├── styles/ # Global and component-specific styles ├── utils/ # Utility functions and helpers └── App.tsx # Main application entry point

---

## Key Features

1. **Employee Management**:
   - Add, edit, and delete employees.
   - View employee details such as ID, phone number, and status.

2. **Attendance Monitoring**:
   - Track attendance using face recognition.
   - Reset enrollment for employees.

3. **Responsive Design**:
   - The application is fully responsive and adapts to different screen sizes.

4. **Navigation**:
   - A collapsible left navigation bar with links to key sections.
   - Top app bar with logout functionality.

---

## Technologies Used

- **React**: Frontend framework.
- **Material-UI**: Component library for UI design.
- **TypeScript**: Strongly typed JavaScript for better code quality.
- **Axios**: HTTP client for API calls.
- **React Router**: For routing between pages.
- **Node.js**: Backend for API services (if applicable).

---

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd admin-web-panel

Install dependencies:
npm install
Start the development server:
npm start
Open the application in your browser:
http://localhost:3000


Components
1. MainLayout
File: src/layouts/MainLayout.tsx
Description: Provides the main layout structure, including the top app bar, left navigation bar, and main content area.
2. EmployeesPage
File: src/pages/employees.tsx
Description: Displays a table of employees with options to add, edit, and filter employees.
3. Reusable Components
Modal: Used for editing employee details.
TablePagination: For paginating employee data.
API Integration
Base URL
The application communicates with the backend API using Axios. The base URL is configured in the src/services/api.ts file.

Endpoints
Get Employees

Method: GET
Endpoint: /api/employees
Description: Fetches the list of employees.
Add Employee

Method: POST
Endpoint: /api/employees
Description: Adds a new employee.
Edit Employee

Method: PUT
Endpoint: /api/employees/:id
Description: Updates an employee's details.
Styling
Material-UI: Used for consistent and responsive styling.
Custom Styles: Additional styles are defined using the sx prop or in the src/styles/ folder.
Known Issues
Drawer Responsiveness:

The left navigation bar may not collapse properly on smaller screens.
Solution: Ensure the isDrawerOpen state dynamically adjusts the layout.
Loading State:

The "Loading..." spinner may not align correctly in some cases.
Solution: Ensure the spinner is centered within the main content area



