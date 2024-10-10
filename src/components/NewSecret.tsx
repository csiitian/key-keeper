import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../db';

export default function NewSecret({ isEdit = false }: { isEdit?: boolean }) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [secretKey, setSecretKey] = useState<string>('');
    const [secretValue, setSecretValue] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        if (isEdit && !id) {
            console.error('ID is required for editing but is undefined.');
            setLoading(false);
            return;
        }
        const fetchSecret = async () => {
            const numericId = Number(id); // Convert id to a number
            if (isNaN(numericId)) {
                console.error('ID must be a valid number');
                setLoading(false);
                return;
            }
            const secret = await db.secrets.get(numericId);
            setSecretKey(secret?.secretKey || '');
            setSecretValue(secret?.secretValue || '');
            setLoading(false);
        };
        fetchSecret();
    }, []);

    const handleAddSecret = async (): Promise<void> => {
        if (!secretKey || !secretValue) {
            console.error('secret should not be empty');
            return;
        }
        console.log(`Adding secret: ${secretKey} : ${secretValue}`);

        try {
            const id = await db.secrets.add({
                secretKey,
                secretValue
            });

            resetForm();
            console.log(`successfully added secret with id: ${id}`);
            navigate('/');
        } catch (error) {
            console.error(`failed to add secret ${error}`);
        }
    }

    const handleEditSecret = async () : Promise<void> => {
        if (!secretKey || !secretValue) {
            console.error('secret should not be empty');
            return;
        }
        console.log(`Editing secret: ${secretKey} : ${secretValue}`);

        try {
            const rowsUpdated = await db.secrets.update(Number(id), {
                secretKey,
                secretValue
            });

            if (rowsUpdated < 1) {
                throw new Error('failed to edit secret in database.');
            }

            resetForm();
            console.log(`successfully edited secret with id: ${id}`);
            navigate('/');
        } catch (error) {
            console.error(`failed to edit secret ${error}`);
        }
    }

    const resetForm = () => {
        setSecretKey('');
        setSecretValue('');
    }

    return (
        <div className='flex flex-col space-y-4 p-4'>
            <h1
                className='text-2xl font-bold'
            >
                {isEdit ? 'Edit' : 'New'} Secret
            </h1>
            {loading ?
                <>
                    <p>Loading ...</p>
                </> :
                <>
                    <input
                        className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        type='text'
                        placeholder='Enter Secret Key'
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                    />
                    <input
                        className='flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        type='text'
                        placeholder='Enter Secret Value'
                        value={secretValue}
                        onChange={(e) => setSecretValue(e.target.value)}
                    />
                    <button
                        className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'
                        onClick={isEdit ? handleEditSecret : handleAddSecret}>
                        Save
                    </button>
                </>
            }
        </div>
    );
}