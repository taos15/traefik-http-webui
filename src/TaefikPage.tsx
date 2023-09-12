import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { z } from "zod";
export default function TaefikPage() {
    const serverSchema = z.object({
        id: z.string().optional(),
        name: z.string(),
        host: z.string(),
        port: z.number().default(2375),
        enable: z.boolean().optional(),
    });

    type ServerType = z.infer<typeof serverSchema>;

    const [serversList, setServerList] = useState<ServerType[]>([]);

    const fetchServers = async () => {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/1/servers`);
        const data = await res.data;
        setServerList(data);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        const name = (e.target as any).SName.value as ServerType["name"];
        const host = (e.target as any).SAddress.value as ServerType["host"];
        const port = Number((e.target as any).SPort.value) === 0 ? 2375 : Number((e.target as any).SPort.value);
        const newServer: ServerType = { name, host, port };
        console.log(newServer);
        axios
            .post(`${import.meta.env.VITE_SERVER_API}/api/1/servers`, newServer)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };
    const handleDelete = async (serverId: ServerType["id"]) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER_API}/api/1/servers/${serverId}`);
            setServerList((prevServers) => prevServers.filter((server) => server.id !== serverId));
        } catch (error) {
            console.error((error as Error).message);
        }
    };

    useEffect(() => {
        fetchServers();
    }, []);
    return (
        <div>
            <div>servers</div>
            <ul>
                {serversList?.map((server) => (
                    <li id={server.id} key={server.id}>
                        <p>
                            Server: {server.name}, Address: {server.host}, Port: {server.port}, Enable?:{" "}
                            {server.enable && "True"}
                        </p>
                        <button onClick={() => handleDelete(server.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Add a new Server</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="SName">Server Name: </label>
                <input placeholder="Unraid" type="text" id="SName" /> <br />
                <br />
                <label htmlFor="SAddress">Server Address: </label>
                <input placeholder=" http://192.168.1.1" type="text" id="SAddress" /> <br />
                <br />
                <label htmlFor="SPort">Server Port: </label>
                <input placeholder="2375" type="number" id="SPort" /> <br />
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}
