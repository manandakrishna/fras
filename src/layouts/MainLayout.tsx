import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const drawerWidth = 200;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

    const handleLogout = () => {
        router.push('/login'); // Redirect to login page
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* Top Bar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: '#0d47a1', // Deep blue color for a professional look
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" noWrap component="div" sx={{ color: '#ffffff' }}>
                            Face Recognition Attendance System
                        </Typography>
                    </Box>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                variant="persistent"
                sx={{
                    width: isDrawerOpen ? drawerWidth : 60, // Adjust width based on drawer state
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: isDrawerOpen ? drawerWidth : 60, // Adjust width based on drawer state
                        boxSizing: 'border-box',
                        backgroundColor: '#1e293b', // Dark blue-gray background
                        color: '#ffffff', // White text color
                        marginTop: '64px', // Adjust for AppBar height
                        position: 'fixed', // Fix the drawer below the AppBar
                        transition: 'width 0.3s', // Smooth transition for collapsing
                    },
                }}
                open={isDrawerOpen}
            >
                {/* Navigation Items */}
                <List sx={{ paddingTop: 0 }}>
                    <ListItem
                        component="a"
                        href="/"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: '#475569' }, // Different color for hover
                            backgroundColor: router.pathname === '/' ? '#334155' : 'inherit', // Highlight when selected
                        }}
                    >
                        <ListItemText
                            primary="Dashboard"
                            sx={{ color: '#ffffff' }} // Bright white color
                        />
                    </ListItem>
                    <ListItem
                        component="a"
                        href="/employees"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: '#475569' }, // Different color for hover
                            backgroundColor: router.pathname === '/employees' ? '#334155' : 'inherit', // Highlight when selected
                        }}
                    >
                        <ListItemText
                            primary="Employees"
                            sx={{ color: '#ffffff' }} // Bright white color
                        />
                    </ListItem>
                    <ListItem
                        component="a"
                        href="/facerelated"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: '#475569' }, // Different color for hover
                            backgroundColor: router.pathname === '/facerelated' ? '#334155' : 'inherit', // Highlight when selected
                        }}
                    >
                        <ListItemText
                            primary="Face Related"
                            sx={{ color: '#ffffff' }} // Bright white color
                        />
                    </ListItem>
                </List>
            </Drawer>

            {/* Toggle Button */}
            <Box
                sx={{
                    position: 'fixed', // Position relative to the viewport
                    top: '50%', // Center vertically relative to the viewport
                    left: isDrawerOpen ? `${drawerWidth - 10}px` : '0px', // Adjust based on drawer state
                    transform: 'translateY(-50%)',
                    backgroundColor: '#1e293b', // Match the color of the left navigation bar
                    borderRadius: '0 5px 5px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '40px',
                    color: '#ffffff', // Match the text color of the left navigation bar
                    zIndex: 1301, // Ensure it overlays the drawer
                    boxShadow: '0px 0px 5px rgba(8, 8, 8, 0.5)', // Add shadow for better visibility
                }}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                    {isDrawerOpen ? '<' : '>'}
                </Typography>
            </Box>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
marginLeft: isDrawerOpen ? `5px` : '10px', // Adjust margin based on drawer state
                    marginTop: '64px', // Adjust for AppBar height
                    transition: 'margin-left 0.3s', // Smooth transition for responsiveness
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;