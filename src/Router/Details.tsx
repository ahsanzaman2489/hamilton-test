import React, {FC} from 'react';
import {
    useParams
} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {CharacterListApiResponse} from "../Types";
import {API} from "../Service";

const Details: FC = () => {
    const {characterId} = useParams();

    const {data, isError, isFetching, isLoading} =
        useQuery<CharacterListApiResponse>(
            [
                characterId
            ],
            async () => {

                // const getAllSearchParams = setSearchParams();

                // navigate({
                //     pathname: '/',
                //     search: getAllSearchParams
                // }, {replace: true});

                const url = ('characters/' + characterId);
                const response = await API(url);

                return (await response.data) as CharacterListApiResponse;
            },
            {keepPreviousData: false},
        );

    const character = data?.data?.results[0];
    console.log(character)
    return (<div>{characterId}</div>)
};

export default Details;