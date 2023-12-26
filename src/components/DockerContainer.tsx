import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function DockerContainer({
    containers,
    containerUpdater,
}: {
    containers: any;
    containerUpdater: () => Promise<void>;
}) {
    const handleDockerAction = async (
        id: string,
        server: string,
        command: "start" | "stop" | "pause" | "unpause" | "restart",
    ) => {
        const actionBody = { name: server, command };

        axios
            .post(`${import.meta.env.VITE_SERVER_API}/api/v1/containers/${id}`, actionBody)
            .then((res) => {
                containerUpdater();
                console.log(res);
            })
            .catch((err) => console.error(err));
    };
    // uncommet to show container description
    // const description: string =
    //     containers?.Labels["org.label-schema.description"] ??
    //     containers?.Labels["org.opencontainers.image.description"];
    // let cleanDescription = "";
    // const startMarkdown = description?.indexOf("[");
    // const endMarkdown = description?.indexOf(")");
    // console.log(startMarkdown, endMarkdown);
    // if (startMarkdown && endMarkdown) {
    //     cleanDescription = description?.slice(0, startMarkdown) + description?.slice(endMarkdown + 3);
    // }

    return (
        <Card sx={{ maxWidth: 345, maxHeight: 345 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <CardMedia
                    sx={{ height: 70, width: 70, objectFit: "contain" }}
                    image={containers?.Labels["net.unraid.docker.icon"]}
                    title="container icon"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {containers?.Names[0]?.slice(1)}
                    </Typography>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Server: {containers?.serverName}
                    </Typography>
                    {containers?.State === "running" ? (
                        <Typography sx={{ mb: 1.5, color: "green" }} color="text.secondary">
                            Running
                        </Typography>
                    ) : (
                        <Typography sx={{ mb: 1.5, color: "red" }} color="text.secondary">
                            Stopped
                        </Typography>
                    )}
                    {/* <Typography overflow={"hidden"} variant="body2" color="text.secondary">
                        {cleanDescription}
                    </Typography> */}
                </CardContent>
            </Box>
            <CardActions>
                <Button onClick={() => handleDockerAction(containers.Id, containers?.serverName, "start")} size="small">
                    Start
                </Button>
                <Button
                    onClick={() => handleDockerAction(containers.Id, containers?.serverName, "restart")}
                    size="small"
                >
                    Restart
                </Button>
                <Button onClick={() => handleDockerAction(containers.Id, containers?.serverName, "stop")} size="small">
                    Stop
                </Button>
            </CardActions>
        </Card>
    );
}
