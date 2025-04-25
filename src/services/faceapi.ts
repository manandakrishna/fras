import axios from 'axios';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';


dotenv.config();

AWS.config.update({
    region: process.env.AWS_REGION || 'us-east-1', // Default to 'us-east-1' if not defined
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
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

