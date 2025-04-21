import React from 'react';
import { AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const handleLogout = () => {
        // Add your logout logic here (e.g., clearing tokens, redirecting to login page)
        console.log('Logout clicked');
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
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Face Recognition Attendance System
                        </Typography>
                    </Box>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Left Navigation Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <List>
                    <ListItem component="button" onClick={() => handleNavigation('/')}>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem component="button" onClick={() => handleNavigation('/employees')}>
                        <ListItemText primary="Employees" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    marginLeft: `${drawerWidth}px`,
                    marginTop: '64px', // Adjust for AppBar height
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;