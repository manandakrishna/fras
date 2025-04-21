import React, { useState } from 'react';
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
    Drawer,
    TextField,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MainLayout from '../layouts/MainLayout';

const EmployeesPage = () => {
    // Mock employee data
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe', phone: '123-456-7890', enrollStatus: true, status: 'Active', terminated: false },
        { id: 2, name: 'Jane Smith', phone: '987-654-3210', enrollStatus: false, status: 'Inactive', terminated: false },
        { id: 3, name: 'Alice Johnson', phone: '555-123-4567', enrollStatus: true, status: 'Active', terminated: false },
        { id: 4, name: 'Bob Brown', phone: '444-555-6666', enrollStatus: false, status: 'Inactive', terminated: false },
    ]);

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Drawer state
    const [selectedRow, setSelectedRow] = useState<{
        id: number;
        name: string;
        phone: string;
        enrollStatus: boolean;
        status: string;
        terminated: boolean;
    } | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Handle pagination
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle row click
    const handleRowClick = (row: any) => {
        setSelectedRow({ ...row }); // Clone the row to allow editing
        setIsDrawerOpen(true);
    };

    // Handle drawer close
    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setSelectedRow(null);
    };

    // Handle save changes
    const handleSave = () => {
        if (selectedRow) {
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.id === selectedRow.id ? selectedRow : employee
                )
            );
        }
        handleDrawerClose();
    };

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
                    >
                        Add Employee
                    </Button>
                </Toolbar>

                {/* Material UI Table */}
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
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((employee) => (
                                    <TableRow
                                        key={employee.id}
                                        hover
                                        onClick={() => handleRowClick(employee)}
                                        sx={{
                                            cursor: 'pointer',
                                            backgroundColor: selectedRow?.id === employee.id ? 'rgba(0, 123, 255, 0.1)' : 'inherit',
                                        }}
                                    >
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.phone}</TableCell>
                                        <TableCell>{employee.enrollStatus ? 'Enrolled' : 'Not Enrolled'}</TableCell>
                                        <TableCell>{employee.status}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={employees.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                {/* Drawer */}
                <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    onClose={handleDrawerClose}
                    PaperProps={{
                        sx: { marginTop: '64px', width: 300 }, // Adjust drawer to be below the top bar
                    }}
                >
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Employee Details
                        </Typography>
                        {selectedRow && (
                            <>
                                <TextField
                                    label="Phone Number"
                                    fullWidth
                                    margin="normal"
                                    value={selectedRow.phone}
                                    onChange={(e) =>
                                        setSelectedRow({ ...selectedRow, phone: e.target.value })
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedRow.enrollStatus}
                                            onChange={(e) =>
                                                setSelectedRow({ ...selectedRow, enrollStatus: e.target.checked })
                                            }
                                        />
                                    }
                                    label="Enrolled"
                                />
                                <Typography variant="body1" sx={{ marginTop: 2 }}>
                                    <strong>Employee Status:</strong> {selectedRow.status}
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedRow.terminated}
                                            onChange={(e) =>
                                                setSelectedRow({ ...selectedRow, terminated: e.target.checked })
                                            }
                                        />
                                    }
                                    label="Terminated"
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleSave}>
                                        Save
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={handleDrawerClose}>
                                        Cancel
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </Drawer>
            </Box>
        </MainLayout>
    );
};

export default EmployeesPage;
