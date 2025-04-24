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
    Switch,
    FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainLayout from '../layouts/MainLayout';
import { getEmployees, addEmployee, editEmployee } from '@/services/api';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState<
        { employee_id: number; name: string; phone_number: string; created_on: string; enroll_status: string; emp_status: string; persongroup_id?: string; person_id?: string }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ name: '', phone: '' });
    const [errors, setErrors] = useState({ name: false, phone: false });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [nextEmployeeId, setNextEmployeeId] = useState(1);
    const [snackbarNewEmployeeOpen, setSnackbarNewEmployeeOpen] = useState(false);
    const [snackbarEditSuccessOpen, setSnackbarEditSuccessOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<{ employee_id: number; phone_number: string; emp_status: string; enroll_status: string } | null>(null);
    const [showAllUsers, setShowAllUsers] = useState(false);

    // Fetch employees from API
    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            const employeesData = Array.isArray(response) ? response : [response];
            employeesData.sort((a, b) => a.employee_id - b.employee_id);
            setEmployees(employeesData);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle modal open for adding a new employee
    const handleOpenAddEmployeeModal = () => {
        const nextId = employees.length > 0 ? employees[employees.length - 1].employee_id + 1 : 1;
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
    const handleNewEmployeesSnackbarClose = () => {
        setSnackbarNewEmployeeOpen(false);
    };

    // Handle save new employee
    const handleSaveNewEmployee = async () => {
        const { name, phone } = newEmployee;
        const newErrors = {
            name: name.trim() === '',
            phone: phone.trim() === '' || !/^\d+$/.test(phone),
        };
        setErrors(newErrors);

        if (!newErrors.name && !newErrors.phone) {
            setIsAdding(true);
            try {
                const createdEmployee = await addEmployee({
                    employee_id: nextEmployeeId,
                    name: newEmployee.name,
                    phone_number: newEmployee.phone,
                    created_on: new Date().toISOString(),
                });

                setEmployees((prevEmployees) => [
                    ...prevEmployees,
                    {
                        employee_id: nextEmployeeId,
                        name: createdEmployee.name,
                        phone_number: createdEmployee.phone_number,
                        created_on: createdEmployee.created_on,
                        enroll_status: 'New',
                        emp_status: 'Active',
                    },
                ]);

                handleCloseModal();
                setSnackbarNewEmployeeOpen(true);
            } catch (error) {
                console.error('Failed to add employee:', error);
            } finally {
                setIsAdding(false);
            }
        }
    };

    // Handle row click to open edit modal
    const handleRowClick = (employee: { employee_id: number; phone_number: string; emp_status: string; enroll_status: string }) => {
        setSelectedEmployee(employee);
        setIsEditModalOpen(true);
    };

    // Handle edit modal close
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedEmployee(null);
    };

    // Handle save changes in edit modal
    const handleSaveEdit = async () => {
        if (selectedEmployee) {
            setIsEditing(true);
            try {
                const updatedEmployee = await editEmployee(selectedEmployee.employee_id, {
                    phone_number: selectedEmployee.phone_number,
                    enroll_status: selectedEmployee.enroll_status,
                    emp_status: selectedEmployee.emp_status,
                });

                setEmployees((prevEmployees) =>
                    prevEmployees.map((employee) =>
                        employee.employee_id === updatedEmployee.employee_id
                            ? { ...employee, ...updatedEmployee }
                            : employee
                    )
                );

                handleCloseEditModal();
                setSnackbarEditSuccessOpen(true);
            } catch (error) {
                console.error('Failed to update employee:', error);
            } finally {
                setIsEditing(false);
            }
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <Typography variant="h6">Getting Employees...</Typography>
                </Box>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Employee Management
                </Typography>
                <Toolbar sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleOpenAddEmployeeModal}>
                        Add Employee
                    </Button>
                    <FormControlLabel
                        control={<Switch checked={showAllUsers} onChange={() => setShowAllUsers(!showAllUsers)} />}
                        label={showAllUsers ? 'Show All Users' : 'Show Active Users'}
                    />
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
                            {employees
                                .filter((employee) => showAllUsers || employee.emp_status === 'Active')
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((employee) => (
                                    <TableRow key={employee.employee_id} onClick={() => handleRowClick(employee)}>
                                        <TableCell>{employee.employee_id}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.phone_number}</TableCell>
                                        <TableCell>{employee.enroll_status}</TableCell>
                                        <TableCell>{employee.emp_status}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={employees.length}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                />
            </Box>
        </MainLayout>
    );
};

export default EmployeesPage;
