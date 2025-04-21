import React from 'react';
import AttendanceMonitoring from '../components/AttendanceMonitoring';
import MainLayout from '../layouts/MainLayout';

const AttendancePage = () => {
    return (
        <MainLayout>
            <h1>Attendance Monitoring</h1>
            <AttendanceMonitoring />
        </MainLayout>
    );
};

export default AttendancePage;