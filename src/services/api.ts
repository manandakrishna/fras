import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://primary-production-c175.up.railway.app/webhook/4e81377d-c913-4767-a9a3-fae2d5a0aed6';
const API_Add_EMPLOYEE_URL = `https://primary-production-c175.up.railway.app/webhook/be0da3f2-4faa-4023-89d1-060f54c889c5`;
const API_Edit_EMPLOYEE_URL = `https://primary-production-c175.up.railway.app/webhook/278ff182-b8df-4c06-99d9-48793a83f845`;


export const getEmployees = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);

        if (Array.isArray(response.data)) {
            return response.data; // Return all rows if the response is an array
        } else {
            console.warn('Unexpected response format:', response.data);
            return [response.data]; // Wrap single object in an array as a fallback
        }
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

export const addEmployee = async (employee: { employee_id: number; name: string; phone_number: string; created_on: string }) => {
    try {
        const response = await axios.post(`${API_Add_EMPLOYEE_URL}`, employee);
        return response.data; // Return the created employee data
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};


export const editEmployee = async (employeeId: number, { enroll_status, emp_status, phone_number }: { enroll_status: string; emp_status: string; phone_number: string }) => {
    try {
        const response = await axios.put(`${API_Edit_EMPLOYEE_URL}`, { employeeId, enroll_status, emp_status, phone_number });
        return response.data;
    } catch (error) {
        console.error('Error editing employee:', error);
        throw error;
    }
};

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