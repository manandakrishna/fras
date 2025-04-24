import axios from 'axios';


if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('AWS credentials are not defined. Please check your .env file.');
    throw new Error('Missing AWS credentials');
}




// const AZURE_FACE_API_BASE_URL = 'https://gpax-attend.cognitiveservices.azure.com/face/v1.2-preview.1/persongroups';
// const AZURE_FACE_API_KEY = 'DVpzStKYd7qV6LSTUC2hrCODP8YyYlA2hndcgbfqNdyEKWVtf54LJQQJ99BDACYeBjFXJ3w3AAAKACOGZOXg';

// export const createFacePersonGroup = async (personGroupId: string, name: string) => {
//     try {
//         const url = `${AZURE_FACE_API_BASE_URL}/${personGroupId}`;
//         const headers = {
//             'Ocp-Apim-Subscription-Key': AZURE_FACE_API_KEY,
//             'Content-Type': 'application/json',
//         };
//         const body = {
//             name,
//         };

//         const response = await axios.put(url, body, { headers });

//         console.log('Person group created successfully:', response.status);
//         return response.status; // Return the status code
//     } catch (error) {
//         const err = error as any;
//         if (err.response?.status === 409) { // 409 Conflict indicates the group already exists
//             console.log('Face group already created:', err.response.status);
//             return 'Face Group already created';
//         }
//         console.error('Error creating person group:', err.response?.data || err.message);
//         throw error;
//     }
// };
