import { useNavigate } from "react-router-dom";
import { Secret } from "../db";
import { TrashIcon } from '@heroicons/react/24/solid';

export default function ListItem({ secret, handleDelete }: { secret: Secret, handleDelete: (secret: Secret) => void }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/edit/${secret.id}`);
    };

    return (
        <div className='flex flex-row mx-2 my-4 p-4 justify-between border rounded'>
            <p className='text-left'
                role="button"
                onClick={handleClick}>
                {secret.secretKey} - {secret.secretValue}
            </p>
            <button className='text-right text-white px-2 rounded' onClick={() => handleDelete(secret)}>
                <TrashIcon className="size-6 text-red-500 hover:text-red-700" />
            </button>
        </div>
    );
}