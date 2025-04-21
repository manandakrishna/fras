import axios from 'axios';

const BASE_URL = 'https://<your-azure-function-app>.azurewebsites.net/api';

export const addEmployee = async (employeeData) => {
    try {
        const response = await axios.post(`${BASE_URL}/employeeManagement/addEmployee`, employeeData);
        return response.data;
    } catch (error) {
        throw new Error('Error adding employee: ' + error.message);
    }
};

export const editEmployee = async (employeeId, employeeData) => {
    try {
        const response = await axios.put(`${BASE_URL}/employeeManagement/editEmployee/${employeeId}`, employeeData);
        return response.data;
    } catch (error) {
        throw new Error('Error editing employee: ' + error.message);
    }
};

export const disableEmployee = async (employeeId) => {
    try {
        const response = await axios.post(`${BASE_URL}/employeeManagement/disableEmployee/${employeeId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error disabling employee: ' + error.message);
    }
};

export const getEmployees = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/employeeManagement/getEmployees`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching employees: ' + error.message);
    }
};

export const recordAttendance = async (attendanceData) => {
    try {
        const response = await axios.post(`${BASE_URL}/attendanceTracking/recordAttendance`, attendanceData);
        return response.data;
    } catch (error) {
        throw new Error('Error recording attendance: ' + error.message);
    }
};

export const getDailyAttendance = async (date) => {
    try {
        const response = await axios.get(`${BASE_URL}/attendanceTracking/getDailyAttendance?date=${date}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching daily attendance: ' + error.message);
    }
};

export const getWeeklySummary = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/attendanceTracking/getWeeklySummary`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching weekly summary: ' + error.message);
    }
};

export const getMonthlyOverview = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/attendanceTracking/getMonthlyOverview`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching monthly overview: ' + error.message);
    }
};

export const enrollFace = async (faceData) => {
    try {
        const response = await axios.post(`${BASE_URL}/faceRecognition/enrollFace`, faceData);
        return response.data;
    } catch (error) {
        throw new Error('Error enrolling face: ' + error.message);
    }
};

export const verifyFace = async (faceData) => {
    try {
        const response = await axios.post(`${BASE_URL}/faceRecognition/verifyFace`, faceData);
        return response.data;
    } catch (error) {
        throw new Error('Error verifying face: ' + error.message);
    }
};