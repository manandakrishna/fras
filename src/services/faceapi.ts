import axios from 'axios';
import AWS from 'aws-sdk';


// if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
//     console.error('AWS credentials are not defined. Please check your .env file.');
//     throw new Error('Missing AWS credentials');
// }




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
AWS.config.update({
    region: 'us-east-1', // Update to your AWS region
    accessKeyId: "AKIASYJXA34PL5SNA5HQ",
    secretAccessKey: "do8RkrN8b9VUzeB+Q7SiVaZPw5mBsrlI0KVkqFcW",
});

const rekognition = new AWS.Rekognition();

export const listCollections = async () => {
    try {
        const params = {};
        const response = await rekognition.listCollections(params).promise();
        console.log('Collections:', response.CollectionIds);
        return response.CollectionIds; // Return the list of collection IDs
    } catch (error) {
        console.error('Error listing collections:', (error as Error).message);
        throw error;
    }
};

export const createCollection = async (collectionId: string) => {
    try {
        const params = {
            CollectionId: collectionId,
        };
        const response = await rekognition.createCollection(params).promise();
        console.log('Collection created successfully:', response);
        return response; // Return the response from AWS Rekognition
    } catch (error) {
        console.error('Error creating collection:', (error as Error).message);
        throw error;
    }
};

