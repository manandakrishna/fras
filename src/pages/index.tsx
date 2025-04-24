import React from 'react';
import { Container, Typography } from '@mui/material';
import MainLayout from '../layouts/MainLayout';
import dotenv from 'dotenv';
dotenv.config();

const HomePage = () => {
    return (
        <MainLayout>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to the Face Recognition Attendance System
                </Typography>
                <Typography variant="body1" paragraph>
                    This admin panel allows you to manage employees and monitor attendance effectively.
                </Typography>
                <Typography variant="body1" paragraph>
                    Use the navigation menu to access employee management, attendance monitoring, and holiday calendar features.
                </Typography>
            </Container>
        </MainLayout>
    );
};

export default HomePage;