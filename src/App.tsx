import React from 'react';
import './index.css';
import Router from './Router';

import {RouterProvider} from "react-router-dom";
import ReactQueryClient from "./Service/ReactQueryClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const App = () => {
    return (
        <>
            {/* App Nav */}
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Marvel Character's List
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* End App Nav */}
            <ReactQueryClient>
                <RouterProvider router={Router}/>
                {/* React Router Provider */}
            </ReactQueryClient>
            {/* Footer */}
            <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
            </Box>
            {/* End footer */}
        </>
    )
}


export default App;