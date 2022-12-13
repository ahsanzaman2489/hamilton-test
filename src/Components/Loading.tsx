import React, {FC} from 'react';
import {CircularProgress} from "@mui/material";
import Container from "@mui/material/Container";

const Loading: FC = () => {
    return (
        <Container sx={{
            justifyContent: 'center', display: 'flex', my: '50px'
        }} maxWidth="md"><CircularProgress/></Container>
    )
};

export default Loading;