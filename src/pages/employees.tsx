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
    Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainLayout from '../layouts/MainLayout';
import { getEmployees, addEmployee, editEmployee } from '@/services/apiEmployee';

const EmployeesPage = () => {
    const [employees, setEmployees] = useState<
        { employee_id: number; name: string; phone_number: string; enroll_status: string; emp_status: string; created_on: Date;  }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ name: '', phone: '', enroll_status: '', emp_status: '', created_on: new Date() });
    const [errors, setErrors] = useState({ name: false, phone: false });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [nextEmployeeId, setNextEmployeeId] = useState(1);
    const [snackbarNewEmployeeOpen, setSnackbarNewEmployeeOpen] = useState(false);
    const [snackbarEditSuccessOpen, setSnackbarEditSuccessOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<{ employee_id: number; name: string; phone_number: string; emp_status: string; enroll_status: string,created_on: Date;  } | null>(null);
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
        console.log('State of employess in table:', employees);
    }, []);

    useEffect(() => {
        console.log('Selected Employee updated:', selectedEmployee);
    }, [selectedEmployee]);

    // Handle modal open for adding a new employee
    const handleOpenAddEmployeeModal = () => {
    
        const nextId = employees.length > 0 ? employees[employees.length - 1].employee_id + 1 : 1;
    
        setNextEmployeeId(nextId);
        setNewEmployee({ name: '', phone: '', enroll_status: '', emp_status: '', created_on: new Date() });
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
        newEmployee.enroll_status="New",
        newEmployee.emp_status="Active";
        newEmployee.created_on = new Date();
        const { name, phone, enroll_status,emp_status } = newEmployee;
        const newErrors = {
            name: name.trim() === '',
            phone: phone.trim() === '' || !/^\d+$/.test(phone),
        };

        setErrors(newErrors);
 
        if (!newErrors.name && !newErrors.phone) {
            setIsAdding(true);
            try {
                const createdEmployee = await addEmployee(
                    nextEmployeeId,
                    newEmployee.name,
                    newEmployee.phone,
                    newEmployee.enroll_status,
                    newEmployee.emp_status,
                    newEmployee.created_on
                 );
    
                        setEmployees((prevEmployees) => [
                            ...prevEmployees,
                            {
                                employee_id: nextEmployeeId,
                                name: newEmployee.name,
                                phone_number: newEmployee.phone,
                                enroll_status: newEmployee.enroll_status,
                                emp_status: newEmployee.emp_status,
                                created_on: newEmployee.created_on,
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
    const handleRowClick = (employee: { employee_id: number; name: string; phone_number: string; emp_status: string; enroll_status: string; created_on: Date }) => {
        
   
            setSelectedEmployee({
                ...employee,
                name: employee.name || '', // Ensure 'name' is included

            });
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
                // Update the database
                const response = await editEmployee(
                    selectedEmployee.employee_id,
                    selectedEmployee.name,
                    selectedEmployee.phone_number,
                    selectedEmployee.enroll_status,
                    selectedEmployee.emp_status,
                    new Date() // Assuming the 6th argument is a timestamp or date
                );

                // Update the state
                const updatedEmployee = typeof response === 'string' ? JSON.parse(response) : response;

   
                // Update the state
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
                <Modal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    aria-labelledby="edit-employee-modal-title"
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
                        <Typography id="edit-employee-modal-title" variant="h6" component="h2">
                            Edit Employee
                        </Typography>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={selectedEmployee?.phone_number || ''}
                            onChange={(e) =>
                                setSelectedEmployee((prev) =>
                                    prev ? { ...prev, phone_number: e.target.value } : null
                                )
                            }
                            margin="normal"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button onClick={handleCloseEditModal} sx={{ mr: 1 }}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSaveEdit}
                                disabled={isEditing}
                            >
                                {isEditing ? 'Saving...' : 'Save'}
                            </Button>
                        </Box>
                    </Box>
                </Modal>
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
                    <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => handleOpenAddEmployeeModal()}>
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
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Employee ID</strong></TableCell>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Phone Number</strong></TableCell>
                                <TableCell><strong>Enroll Status</strong></TableCell>
                                <TableCell><strong>Employee Status</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees
                                .filter((employee) => showAllUsers || employee.emp_status === 'Active')
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((employee) => (
                                    <TableRow
                                        key={employee.employee_id}
                                        onClick={() =>
                                            handleRowClick({
                                                employee_id: employee.employee_id,
                                                name: employee.name,
                                                phone_number: employee.phone_number,
                                                emp_status: employee.emp_status,
                                                enroll_status: employee.enroll_status,
                                                created_on: employee.created_on, // Include the missing property
                                            })
                                        }
                                        style={{ cursor: 'pointer' }}
                                    >
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

            {/* Add Employee Modal */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="add-employee-modal-title"
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
                    <Typography id="add-employee-modal-title" variant="h6" component="h2">
                        Add New Employee
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                        error={errors.name}
                        helperText={errors.name ? 'Name is required' : ''}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                        error={errors.phone}
                        helperText={errors.phone ? 'Valid phone number is required' : ''}
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" onClick={handleSaveNewEmployee} disabled={isAdding}>
                            {isAdding ? 'Saving...' : 'Save'}
                        </Button>
                    </Box>
                </Box>
            </Modal>

           {/* Edit Employee Modal */}
           <Modal
    open={isEditModalOpen}
    onClose={handleCloseEditModal}
    aria-labelledby="edit-employee-modal-title"
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
        <Typography id="edit-employee-modal-title" variant="h6" component="h2">
            Edit Employee
        </Typography>
        <TextField
            fullWidth
            label="Name"
            value={selectedEmployee?.name || ''}
            InputProps={{
                readOnly: true,
            }}
            margin="normal"
        />
        <TextField
            fullWidth
            label="Phone Number"
            value={selectedEmployee?.phone_number || ''}
            onChange={(e) =>
                setSelectedEmployee((prev) =>
                    prev ? { ...prev, phone_number: e.target.value } : null
                )
            }
            margin="normal"
        />
        <FormControlLabel
            control={
                <Checkbox
                    checked={selectedEmployee?.enroll_status === 'New'}
                    onChange={(e) =>
                        setSelectedEmployee((prev) =>
                            prev ? { ...prev, enroll_status: e.target.checked ? 'New' : 'Enrolled' } : null
                        )
                    }
                    disabled= {selectedEmployee?.enroll_status === 'New' || 
                    selectedEmployee?.emp_status === 'Terminated' // Disable if enroll_status is "New" }
                }
                />
            }
            label="Reset Enrollment"
        />
        <FormControlLabel
            control={
                <Checkbox
                    disabled={selectedEmployee?.emp_status === 'Terminated'}
                    onChange={(e) =>
                        setSelectedEmployee((prev) =>
                            prev ? { ...prev, emp_status: e.target.checked ? 'Terminated' : 'Active' } : null
                        )
                    }
                />
            }
            label="Terminate?"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleCloseEditModal} sx={{ mr: 1 }}>
                Cancel
            </Button>
            <Button
                variant="contained"
                color="success"
                onClick={handleSaveEdit}
                disabled={isEditing}
            >
                {isEditing ? 'Saving...' : 'Save'}
            </Button>
        </Box>
    </Box>
</Modal>
        </MainLayout>
    );
};

export default EmployeesPage;
