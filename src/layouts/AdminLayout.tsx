import React from 'react';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import MainLayout from './MainLayout';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    return (
        <MainLayout>
            <Container>
                {children}
            </Container>
        </MainLayout>
    );
};

export default AdminLayout;