import axios from "axios";
import { SyntheticEvent } from "react";
import { z } from "zod";
export default function AddServers() {
    const serverSchema = z.object({
        id: z.string().optional(),
        name: z.string(),
        host: z.string(),
        port: z.number().default(2375),
        enable: z.boolean().optional(),
    });

    type ServerType = z.infer<typeof serverSchema>;

    const handleSubmit = async (e: SyntheticEvent) => {
        const name = (e.target as any).SName.value as ServerType["name"];
        const host = (e.target as any).SAddress.value as ServerType["host"];
        const port = Number((e.target as any).SPort.value) === 0 ? 2375 : Number((e.target as any).SPort.value);
        const newServer: ServerType = { name, host, port };
        axios
            .post(`${import.meta.env.VITE_SERVER_API}/api/v1/servers`, newServer)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };

    return (
        <div>
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
                <button type="submit">Add Server</button>
            </form>
        </div>
    );
}
