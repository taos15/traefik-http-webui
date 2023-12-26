import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { z } from "zod";
export default function TraefikServers() {
    const serverSchema = z.object({
        id: z.string().optional(),
        name: z.string(),
        host: z.string(),
        port: z.number().default(2375),
        enable: z.boolean().optional(),
    });

    type ServerType = z.infer<typeof serverSchema>;

    const [serversList, setServersList] = useState<ServerType[]>([]);

    const fetchServers = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/servers`);

        setServersList(data);
    };

    const handleDelete = async (serverId: ServerType["id"]) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_API}/api/v1/servers/${serverId}`);
            setServersList((prevServers) => prevServers.filter((server) => server.id !== serverId));
        } catch (error) {
            console.error((error as Error).message);
        }
    };

    useEffect(() => {
        fetchServers();
    }, []);
    return (
        <div>
            <ul>
                {serversList?.map((server) => (
                    <li id={server.id} key={server.id}>
                        <p>
                            {server.name} Server, Address: {server.host}, Port: {server.port}, Enable?:{" "}
                            {server.enable && "True"}
                        </p>
                        <button onClick={() => handleDelete(server.id)}>Remove Server</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
