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
import { getEmployees, addEmployee } from '@/services/api';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState<
        { employee_id: number; name: string; phone_number: string; created_on: string; enroll_status: string; emp_status: string }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
    const [selectedEmployee, setSelectedEmployee] = useState<{ name: string; phone_number: string } | null>(null); // Selected employee for editing
    const [newEmployee, setNewEmployee] = useState({ name: '', phone: '' });
    const [errors, setErrors] = useState({ name: false, phone: false });
    const [isAdding, setIsAdding] = useState(false); // State to freeze the modal during API call
    const [nextEmployeeId, setNextEmployeeId] = useState(1); // Variable to store the next employee ID
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility

    // Fetch employees from API
    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            console.log('API Response:', response); // Log the raw API response

            // Normalize the response to always be an array
            const employeesData = Array.isArray(response) ? response : [response];
            console.log('Normalized Employees Data:', employeesData); // Log the normalized employees data

            // Set the employees state
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
    const handleOpenModal = () => {
        const rowCount = employees.length;
        const nextId = rowCount > 0 ? employees[rowCount - 1].employee_id + 1 : 1;
        setNextEmployeeId(nextId);

        setNewEmployee({ name: '', phone: '' });
        setErrors({ name: false, phone: false });
        setIsModalOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Handle Snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Handle row click to open edit modal
    const handleRowClick = (employee: { name: string; phone_number: string }) => {
        setSelectedEmployee(employee);
        setIsEditModalOpen(true);
    };

    // Handle edit modal close
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedEmployee(null);
    };

    // Handle save changes in edit modal
    const handleSaveEdit = () => {
        if (selectedEmployee) {
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.name === selectedEmployee.name
                        ? { ...employee, phone_number: selectedEmployee.phone_number }
                        : employee
                )
            );
            handleCloseEditModal();
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
                        onClick={handleOpenModal}
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
                            {employees.length > 0 ? (
                                employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                                    <TableRow
                                        key={employee.employee_id}
                                        onClick={() => handleRowClick(employee)} // Open edit modal on row click
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{employee.employee_id}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.phone_number}</TableCell>
                                        <TableCell>{employee.enroll_status}</TableCell>
                                        <TableCell>{employee.emp_status}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
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
                    rowsPerPageOptions={[5, 10, 25]}
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

                {/* Edit Modal */}
                <Modal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal} // Close modal when clicked outside
                    aria-labelledby="edit-employee-modal"
                    aria-describedby="edit-employee-modal-description"
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
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            value={selectedEmployee?.name || ''}
                            disabled // Name is not editable
                        />
                        <TextField
                            label="Phone Number"
                            fullWidth
                            margin="normal"
                            value={selectedEmployee?.phone_number || ''}
                            onChange={(e) =>
                                setSelectedEmployee((prev) =>
                                    prev ? { ...prev, phone_number: e.target.value } : null
                                )
                            }
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveEdit}
                                sx={{ marginBottom: 2 }}
                            >
                                Save
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleCloseEditModal}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </MainLayout>
    );
};

export default EmployeesPage;
