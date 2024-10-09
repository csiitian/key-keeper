import { useNavigate } from "react-router-dom";
import { Secret } from "../db";
import { TrashIcon } from '@heroicons/react/24/solid';

export default function ListItem({ secret, deleteSecret }: { secret: Secret, deleteSecret: (secret: Secret) => void }) {

    const navigate = useNavigate();

    const handleDelete = () => {
        deleteSecret(secret);
    }

    const handleClick = () => {
        navigate(`/edit/${secret.id}`);
    };

    return (
        <div
            className='flex flex-row mx-2 my-4 p-4 justify-between border rounded'
            onClick={handleClick}
            role="button"
        >
            <p className='text-left'>{secret.secretKey} - {secret.secretValue}</p>
            <button className='text-right text-white px-2 rounded' onClick={handleDelete}>
                <TrashIcon className="size-6 text-blue-500 hover:text-blue-700" />
            </button>
        </div>
    );
}