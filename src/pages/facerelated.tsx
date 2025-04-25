import React from 'react';

import MainLayout from '../layouts/MainLayout';
import { useEffect, useState } from 'react';
import { listCollections, createCollection } from '../services/faceapi';

const AttendancePage = () => {
    const [collections, setCollections] = useState<string[]>([]);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await listCollections();
                console.log('Collections fetched:', response); 
                if (response && Array.isArray(response)) {
                    setCollections(response);
                } else {
                    console.warn('No collections found or invalid response format.');
                }
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        };
        fetchCollections();
    }, []);
    
    const handleCreateCollection = async () => {
        try {
            const collectionId = 'employees'; 
            const newCollection = await createCollection(collectionId);
            console.log('Collection created:', newCollection);
            setCollections((prev) => [...prev, collectionId]);
        } catch (error) {
            if (error instanceof Error && error.message.includes('already exists')) {
                console.warn('Collection already exists.');
            } else {
                console.error('Error creating collection:', error);
            }
        }
    };
    return (
        <MainLayout>
            <h1>Collections</h1>
            {collections.length === 0 ? (
                <div>
                    <p>No collections found.</p>
                    <button onClick={handleCreateCollection}>Create Collection</button>
                </div>
            ) : (
                <ul>
                    {collections.map((collection, index) => (
                        <li key={index}>{collection}</li>
                    ))}
                </ul>
            )}
        </MainLayout>
    );
};

export default AttendancePage;