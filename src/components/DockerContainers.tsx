import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import DockerContainer from "./DockerContainer";

export default function DockerContainers() {
    const serverSchema = z.object({
        id: z.string().optional(),
        Names: z.string().array(),
        host: z.string(),
        port: z.number().default(2375),
        enable: z.boolean().optional(),
    });

    type ServerType = z.infer<typeof serverSchema>;

    const [containers, setContainers] = useState<ServerType[]>([]);

    const fetchServers = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/containers`);

        setContainers(data);
    };

    useEffect(() => {
        fetchServers();
    }, []);
    return (
        <Box sx={{ width: "90%" }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {containers.map((container) => (
                    <Grid key={container.Names[0]?.slice(1)} xs={3}>
                        <DockerContainer containers={container} containerUpdater={fetchServers} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
