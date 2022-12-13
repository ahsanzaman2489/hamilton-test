import React, {FC} from 'react';
import {
    useParams,
    useNavigate
} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Character, CharacterListApiResponse} from "../Types";
import {API} from "../Service";

import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link} from "@mui/material";
import ResponsiveImages from "../Components/ResponsiveImages";
import Loading from "../Components/Loading";
import Listing from "../Components/List";

const Details: FC = () => {
    const {characterId} = useParams();
    const navigate = useNavigate();

    const {data: characterData, isError, isFetching, isLoading} =
        useQuery<CharacterListApiResponse>(
            [
                characterId
            ],
            async () => {

                const url = ('characters/' + characterId);
                const response = await API(url);

                return (await response.data) as CharacterListApiResponse;
            },
            {keepPreviousData: false},
        );


    if (isLoading && isFetching) {
        return <Loading/>
    }

    const character = characterData?.data?.results[0];

    const detailSections = [
        'stories',
        'comics',
        'series',
        'events',
    ];

    const linksMap: any = {
        detail: 'details',
        wiki: 'wiki',
        comiclink: 'comic'
    };

    const theme = createTheme();

    const RenderLinks = ({links}: any) => {
        if (!links.length) return <></>;
        return <Stack
            sx={{py: 2}}
            direction="row"
            spacing={2}
            justifyContent="center"
        >
            {links.map(({url, type}: { url: string, type: string }) => {
                return <a href={`${url}`} key={url} target={'_blank'} style={{textDecoration: 'none'}}><Button
                    variant="contained">{linksMap[type]}</Button></a>
            })}
        </Stack>
    };

    const renderList = (section: keyof Character) => {
        const sectionData: any = character?.[section];
        if (!sectionData.available) return;
        return (
            <>
                <Listing data={sectionData} title={section}/>
            </>
        )
    };

    const handleBack = () => navigate(-1);

    return (
        <ThemeProvider theme={theme}>
            <main>
                <Box
                    sx={{
                        py: 4,
                    }}
                >
                    <Container sx={{maxWidth: '750px', px: {xs: '20px', md: '0px'}}} maxWidth={false} disableGutters>
                        <Link style={{textDecoration: 'none'}} onClick={handleBack}>
                            <Button
                                variant="contained" sx={{
                                mb: 4,
                                background: 'gray'
                            }}>Back</Button>
                        </Link>
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            color="text.primary"
                            sx={{mb: 4}}
                        >
                            {character?.name}
                        </Typography>
                        <ResponsiveImages path={character?.thumbnail?.path!} ext={character?.thumbnail?.extension!}/>

                        {character?.description &&
                        <Typography sx={{pt: 2}} variant="h5" align="center" color="text.secondary" paragraph>
                            {character?.description}
                        </Typography>}
                        <RenderLinks links={character?.urls}/>
                        <Grid container spacing={3}>
                            {detailSections.map((section: any) => <Grid item xs={12}
                                                                        md={6}
                                                                        key={section}>{renderList(section)}</Grid>)}
                        </Grid>
                    </Container>
                </Box>

            </main>
        </ThemeProvider>
    )
};

export default Details;