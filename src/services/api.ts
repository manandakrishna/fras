// import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-api-url.azurewebsites.net/api';

// export const getEmployees = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/employeeManagement/getEmployees`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching employees:', error);
//         throw error;
//     }
// };

// export const addEmployee = async (employeeData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/employeeManagement/addEmployee`, employeeData);
//         return response.data;
//     } catch (error) {
//         console.error('Error adding employee:', error);
//         throw error;
//     }
// };

// export const editEmployee = async (employeeId, employeeData) => {
//     try {
//         const response = await axios.put(`${API_BASE_URL}/employeeManagement/editEmployee`, { employeeId, ...employeeData });
//         return response.data;
//     } catch (error) {
//         console.error('Error editing employee:', error);
//         throw error;
//     }
// };

// export const disableEmployee = async (employeeId) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/employeeManagement/disableEmployee`, { employeeId });
//         return response.data;
//     } catch (error) {
//         console.error('Error disabling employee:', error);
//         throw error;
//     }
// };

// export const recordAttendance = async (attendanceData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/attendanceTracking/recordAttendance`, attendanceData);
//         return response.data;
//     } catch (error) {
//         console.error('Error recording attendance:', error);
//         throw error;
//     }
// };

// export const getDailyAttendance = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/attendanceTracking/getDailyAttendance`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching daily attendance:', error);
//         throw error;
//     }
// };

// export const getWeeklySummary = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/attendanceTracking/getWeeklySummary`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching weekly summary:', error);
//         throw error;
//     }
// };

// export const getMonthlyOverview = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/attendanceTracking/getMonthlyOverview`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching monthly overview:', error);
//         throw error;
//     }
// };