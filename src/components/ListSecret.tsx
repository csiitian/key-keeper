import { useEffect, useState } from "react";
import { db, Secret } from "../db";
import ListItem from "./ListItem";
import ConfirmationModal from "./ConfirmationModal";

export default function ListSecret() {
    const [secrets, setSecrets] = useState<Secret[]>();
    const [showModal, setShowModal] = useState(false);
    const [deleteSecret, setDeleteSecret] = useState<Secret | null>(null);

    const fetchSecrets = async () => {
        const secrets = await db.secrets.toArray();
        secrets.sort((a, b) => b.id - a.id);
        setSecrets(secrets);
    }

    const handleConfirm = async () => {
        setShowModal(false);
        if (!deleteSecret) {
            return;
        }
        try {
            await db.secrets.delete(deleteSecret.id);
            console.log(`successfully deleted secret with id: ${deleteSecret.id}`);
            fetchSecrets();
        } catch (error) {
            console.error(`failed while deleting secret id: ${deleteSecret.id}`);
        }
    }

    const handleDelete = (secret: Secret) => {
        setShowModal(true);
        setDeleteSecret(secret);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    useEffect(() => {
        fetchSecrets();
    }, []);

    return (
        <div>
            { secrets?.length === 0 && <p className='text-center'>No secrets found</p> }
            <ul className='list-none'>
                {secrets?.map((secret, index) => (
                    <ListItem key={index} secret={secret} handleDelete={handleDelete} />
                ))}
            </ul>
            {showModal && <ConfirmationModal onConfirm={handleConfirm} onCancel={handleCancel} />}
        </div>
    );
}