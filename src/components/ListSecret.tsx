import { useEffect, useState } from "react";
import { db, Secret } from "../db";
import ListItem from "./ListItem";

export default function ListSecret() {

    const [secrets, setSecrets] = useState<Secret[]>();

    const fetchSecrets = async () => {
        const secrets = await db.secrets.toArray();
        secrets.sort((a, b) => b.id - a.id);
        setSecrets(secrets);
    }

    const deleteSecret = async (secret: Secret) => {
        try {
            await db.secrets.delete(secret.id);
            console.log(`successfully deleted secret with id: ${secret.id}`);
            fetchSecrets();
        } catch (error) {
            console.error(`failed while deleting secret id: ${secret.id}`);
        }
    }

    useEffect(() => {
        fetchSecrets();
    }, []);

    return (
        <ul className='list-none'>
            {secrets?.map((secret, index) => (
                <ListItem key={index} secret={secret} deleteSecret={deleteSecret}/>
            ))}
        </ul>
    );
}