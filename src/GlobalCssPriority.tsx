import { StyledEngineProvider } from "@mui/material/styles";
import { ReactNode } from "react";

export default function GlobalCssPriority({ children }: { children: ReactNode }) {
    return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
