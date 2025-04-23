import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Toolbar,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Modal,
    TextField,
    Snackbar,
    Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainLayout from '../layouts/MainLayout';
import { getEmployees, addEmployee, editEmployee } from '@/services/api';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState<
        { employee_id: number; name: string; phone_number: string; created_on: string; enroll_status: string; emp_status: string }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ name: '', phone: '' });
    const [errors, setErrors] = useState({ name: false, phone: false });
    const [isAdding, setIsAdding] = useState(false); // State to freeze the modal during API call
    const [isEditing, setIsEditing] = useState(false); // State to freeze the modal during API call
    const [nextEmployeeId, setNextEmployeeId] = useState(1); // Variable to store the next employee ID
    const [snackbarNewEmployeeOpen, setSnackNewEmployeebarOpen] = useState(false); // State to control Snackbar visibility
    const [snackbarEditEmployeeOpen, setSnackEditEmployeebarOpen] = useState(false); // State to control Snackbar visibility
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
    const [selectedEmployee, setSelectedEmployee] = useState<{ employee_id: number; phone_number: string; emp_status: string; enroll_status: string;} | null>(null); // Selected employee for editing
    const [snackbarEditSuccessOpen, setSnackbarEditSuccessOpen] = useState(false); // State to control Snackbar visibility for edit success

    // Fetch employees from API
    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            const employeesData = Array.isArray(response) ? response : [response];

            // Sort employees by employee_id
            employeesData.sort((a, b) => a.employee_id - b.employee_id);

            setEmployees(employeesData);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
            setEmployees([]); // Fallback to an empty array on error
        } finally {
            setLoading(false); // Ensure loading is set to false
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle modal open for adding a new employee
    const handleOpenAddEmployeeModal = () => {
        // Calculate the next employee ID based on the number of rows
        const rowCount = employees.length;
        const nextId = rowCount > 0 ? employees[rowCount - 1].employee_id + 1 : 1;
        setNextEmployeeId(nextId); // Update nextEmployeeId only for Add Employee

        // Reset fields and errors
        setNewEmployee({ name: '', phone: '' });
        setErrors({ name: false, phone: false });

        // Open the Add Employee modal
        setIsModalOpen(true);
    };

    // Handle modal open for editing an employee
    const handleOpenEditEmployeeModal = (employee: { employee_id: number; phone_number: string; emp_status: string; enroll_status: string }) => {
        // Set the selected employee for editing
        setSelectedEmployee(employee); // Use the enroll_status directly from the employee object

        // Open the Edit Employee modal
        setIsEditModalOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Handle Snackbar close
    const handleNewEmployeesSnackbarClose = () => {
        setSnackNewEmployeebarOpen(false);
    };

    // Handle save new employee
    const handleSaveNewEmployee = async () => {
        const { name, phone } = newEmployee;

        // Validate fields
        const newErrors = {
            name: name.trim() === '',
            phone: phone.trim() === '' || !/^\d+$/.test(phone), // Ensure phone is numerical
        };
        setErrors(newErrors);

        // If there are no errors, save the employee
        if (!newErrors.name && !newErrors.phone) {
            setIsAdding(true); // Freeze the modal
            try {
                // Call the addEmployee API
                const createdEmployee = await addEmployee({
                    employee_id: nextEmployeeId, // Include employee_id
                    name: newEmployee.name,
                    phone_number: newEmployee.phone,
                    created_on: new Date().toISOString(),
                });

                console.log('Employee added successfully:', createdEmployee);

                // Update the employees state with the new employee
                setEmployees((prevEmployees) => [
                    ...prevEmployees,
                    {
                        employee_id: nextEmployeeId, // Use the calculated next employee ID
                        name: createdEmployee.name,
                        phone_number: createdEmployee.phone_number,
                        created_on: createdEmployee.created_on,
                        enroll_status: 'New', // Default value
                        emp_status: 'Active', // Default value
                    },
                ]);

                // Close the modal
                handleCloseModal();

                // Show success Snackbar
                setSnackNewEmployeebarOpen(true);
            } catch (error) {
                console.error('Failed to add employee:', error);
            } finally {
                setIsAdding(false); // Unfreeze the modal
            }
        }

    };

    // Handle row click to open edit modal
    const handleRowClick = (employee: { employee_id: number; phone_number: string; emp_status: string; enroll_status: string }) => {
        handleOpenEditEmployeeModal(employee);
    };

    // Handle edit modal close
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedEmployee(null);
    };

    // Handle save changes in edit modal
    const handleSaveEdit = async () => {
        console.log('Selected Employee:', selectedEmployee);
        if (selectedEmployee) {
            setIsEditing(true); // Freeze the modal
            try {
                // Call the API to save changes
                const updatedEmployee = await editEmployee(
                    selectedEmployee.employee_id,
                    {
                        phone_number: selectedEmployee.phone_number,
                        enroll_status: selectedEmployee.enroll_status,
                        emp_status: selectedEmployee.emp_status,
                    }
                );

                // Update the local state with the edited employee
                setEmployees((prevEmployees) =>
                    prevEmployees.map((employee) =>
                        employee.employee_id === updatedEmployee.employee_id
                            ? {
                                  ...employee,
                                  phone_number: updatedEmployee.phone_number,
                                  enroll_status: updatedEmployee.enroll_status,
                                  emp_status: updatedEmployee.emp_status,
                              }
                            : employee
                    )
                );

                handleCloseEditModal();

                // Show success Snackbar for "Saved Changes"
                setSnackbarEditSuccessOpen(true);
            } catch (error) {
                console.error('Failed to update employee:', error);
            } finally {
                setIsEditing(false); // Unfreeze the modal
            }
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <MainLayout>
            <Box sx={{ padding: 0 }}>
                <Typography variant="h4" gutterBottom>
                    Employee Management
                </Typography>
                <Toolbar sx={{ marginBottom: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        sx={{ marginRight: 2 }}
                        onClick={handleOpenAddEmployeeModal}
                    >
                        Add Employee
                    </Button>
                </Toolbar>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Enroll Status</TableCell>
                                <TableCell>Employee Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                                <TableRow key={employee.employee_id} onClick={() => handleRowClick(employee)}>
                                    <TableCell>{employee.employee_id}</TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.phone_number}</TableCell>
                                    <TableCell>{employee.enroll_status}</TableCell>
                                    <TableCell>{employee.emp_status}</TableCell>
                                </TableRow>
                            ))}
                            {employees.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No employees found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={employees.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />

                {/* Modal for Adding Employee */}
                <Modal
                    open={isModalOpen}
                    onClose={() => {
                        if (!isAdding) {
                            handleCloseModal(); // Only close the modal if not adding
                        }
                    }}
                    aria-labelledby="add-employee-modal"
                    aria-describedby="add-employee-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography id="add-employee-modal" variant="h6" component="h2" gutterBottom>
                            Add New Employee
                        </Typography>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                            error={errors.name}
                            helperText={errors.name ? 'Name is required' : ''}
                            disabled={isAdding} // Disable field while adding
                        />
                        <TextField
                            label="Phone Number"
                            fullWidth
                            margin="normal"
                            value={newEmployee.phone}
                            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                            error={errors.phone}
                            helperText={errors.phone ? 'Phone Number must be numerical' : ''}
                            disabled={isAdding} // Disable field while adding
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveNewEmployee}
                                disabled={isAdding} // Disable button while adding
                            >
                                {isAdding ? 'Adding Employee...' : 'Save'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCloseModal}
                                sx={{ marginTop: 2 }}
                                disabled={isAdding} // Disable cancel button while adding
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Modal for Editing Employee */}
                <Modal
                    open={isEditModalOpen}
                    onClose={() => {
                        if (!isEditing) {
                            handleCloseEditModal(); // Only close the modal if not editing
                        }
                    }}
                    aria-labelledby="edit-employee-modal"
                    aria-describedby="edit-employee-modal-description"
                    BackdropProps={{
                        style: { pointerEvents: isEditing ? 'none' : 'auto' }, // Disable backdrop clicks while editing
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography id="edit-employee-modal" variant="h6" component="h2" gutterBottom>
                            Edit Employee
                        </Typography>
                         {selectedEmployee && (
                            <>
                                <TextField
                                    label="Employee ID"
                                    fullWidth
                                    margin="normal"
                                    value={selectedEmployee.employee_id}
                                    disabled // Employee ID is not editable
                                />
                                <TextField
                                    label="Phone Number"
                                    fullWidth
                                    margin="normal"
                                    value={selectedEmployee.phone_number}
                                    onChange={(e) =>
                                        setSelectedEmployee({ ...selectedEmployee, phone_number: e.target.value })
                                    }
                                    disabled={isEditing} // Disable editing while saving
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                                    <Typography sx={{ marginRight: 2 }}>Terminate?</Typography>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployee.emp_status === 'Terminated'}
                                        disabled={selectedEmployee.emp_status === 'Terminated'} // Disable if already terminated
                                        onChange={(e) =>
                                            setSelectedEmployee({
                                                ...selectedEmployee,
                                                emp_status: e.target.checked ? 'Terminated' : 'Active',
                                            })
                                        }
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: 2,
                                        color: 'blue', // Highlight Reset Enroll in blue
                                    }}
                                >
                                    <Typography sx={{ marginRight: 2 }}>Reset Enroll</Typography>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployee.enroll_status === 'New'}
                                        disabled={
                                            (selectedEmployee.enroll_status === 'New' && selectedEmployee.emp_status === 'Active')  || // Disable if already "New"
                                            selectedEmployee.emp_status === 'Terminated' || // Disable if "Terminated"
                                            (selectedEmployee.enroll_status === 'Enrolled' && selectedEmployee.emp_status === 'Terminated') // Disable if "Enrolled" and "Terminated"
                                        }
                                        onChange={(e) =>
                                            setSelectedEmployee({
                                                ...selectedEmployee,
                                                enroll_status: e.target.checked ? 'New' : 'Enrolled', // Update enroll_status
                                            })
                                        }
                                    />
                                </Box>
                            </>
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveEdit}
                                disabled={isEditing}
                            >
                                {isEditing ? 'Editing Employee...' : 'Save'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCloseEditModal}
                                sx={{ marginTop: 2 }}
                                disabled={isEditing}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                {/* Snackbar for Success Message */}
                <Snackbar
                    open={snackbarNewEmployeeOpen}
                    autoHideDuration={3000} // Close after 3 seconds
                    onClose={handleNewEmployeesSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleNewEmployeesSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        Employee Added Successfully
                    </Alert>
                </Snackbar>

                {/* Snackbar for Edit Success Message */}
                <Snackbar
                    open={snackbarEditSuccessOpen}
                    autoHideDuration={3000} // Close after 3 seconds
                    onClose={() => setSnackbarEditSuccessOpen(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSnackbarEditSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
                        Changes Saved Successfully
                    </Alert>
                </Snackbar>
            </Box>
        </MainLayout>
    );
};

export default EmployeesPage;
