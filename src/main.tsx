import { ThemeProvider, createTheme } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalCssPriority from "./GlobalCssPriority.tsx";
import "./main.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const theme = createTheme({
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiDialog: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiModal: {
            defaultProps: {
                container: rootElement,
            },
        },
    },
});

root.render(
    <GlobalCssPriority>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </GlobalCssPriority>,
);
