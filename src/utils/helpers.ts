// import { Employee } from '../types';

// export const formatEmployeeData = (employee: Employee) => {
//     return {
//         id: employee.id,
//         name: employee.name,
//         email: employee.email,
//         status: employee.isActive ? 'Active' : 'Inactive',
//         profilePicture: employee.profilePicture || '/default-profile.png',
//     };
// };

// export const calculateAttendanceSummary = (attendanceRecords: any[]) => {
//     const totalDays = attendanceRecords.length;
//     const presentDays = attendanceRecords.filter(record => record.status === 'Present').length;
//     const absentDays = totalDays - presentDays;

//     return {
//         totalDays,
//         presentDays,
//         absentDays,
//     };
// };

// export const isValidEmail = (email: string) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
// };

// export const debounce = (func: Function, delay: number) => {
//     let timeoutId: NodeJS.Timeout;
//     return (...args: any[]) => {
//         if (timeoutId) {
//             clearTimeout(timeoutId);
//         }
//         timeoutId = setTimeout(() => {
//             func(...args);
//         }, delay);
//     };
// };