import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://primary-production-c175.up.railway.app/webhook/4e81377d-c913-4767-a9a3-fae2d5a0aed6';
const API_BASE_URL =  'https://kong-production-7544.up.railway.app/rest/v1/employee'
const API_Add_EMPLOYEE_URL = `https://primary-production-c175.up.railway.app/webhook/be0da3f2-4faa-4023-89d1-060f54c889c5`;
const API_Edit_EMPLOYEE_URL = `https://primary-production-c175.up.railway.app/webhook/278ff182-b8df-4c06-99d9-48793a83f845`;
const headers = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmaHBjc3l4ZHJ0b3dqa21zdm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODgxNTAsImV4cCI6MjA1Njc2NDE1MH0.6WDXZcVh3X1oYuMxfKL8W6NTD6a2A0iMFdcE9a4b8zw",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmaHBjc3l4ZHJ0b3dqa21zdm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODgxNTAsImV4cCI6MjA1Njc2NDE1MH0.6WDXZcVh3X1oYuMxfKL8W6NTD6a2A0iMFdcE9a4b8zw"
};

export const getEmployees = async () => {
    try {

const response = await axios.get(`${API_BASE_URL}?select=*`, { headers });

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



export const addEmployee = async (
    employee_id: number,
    name: string,
    phone_number: string,
    enroll_status: string,
    emp_status: string,
    created_on: Date,
) => {
    try {

        const response = await axios.post(
            `${API_BASE_URL}`,
            { employee_id, name, phone_number, enroll_status, emp_status, created_on: new Date().toISOString() },
            {
                headers: {
                    ...headers,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                }
            }
        );
        return response.config.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error response:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};


export const editEmployee = async (
    employee_id: number,
    name: string,
    phone_number: string,
    enroll_status: string,
    emp_status: string,
    updated_on: Date,
) => {
    try {
        const response = await axios.patch(
            `${API_BASE_URL}?employee_id=eq.${employee_id}`,
            { employee_id, name, phone_number, enroll_status, emp_status, created_on: new Date().toISOString() },
            {
                headers: {
                    ...headers,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                }
            }
        );
        return response.config.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error response:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
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