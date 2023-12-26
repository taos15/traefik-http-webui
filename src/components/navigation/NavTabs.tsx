import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import DockerContainers from "../DockerContainers";
import AddServers from "../traefik/AddServers";
import TraefikServers from "../traefik/TraefikServers";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: Readonly<TabPanelProps>) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const NavTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                    <Tab label="Servers" {...a11yProps(0)} />
                    <Tab label="Add Servers" {...a11yProps(1)} />
                    <Tab label="Containers" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <TraefikServers />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <AddServers />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <DockerContainers />
            </CustomTabPanel>
        </>
    );
};

export default NavTabs;
