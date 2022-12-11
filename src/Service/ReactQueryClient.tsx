import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React, {FC, ReactNode} from "react";

const queryClient = new QueryClient();
type Props = { children: ReactNode }

const ReactQueryClient: FC<Props> = ({children}) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

export default ReactQueryClient;