import React, {FC} from 'react';
import {List, ListItem, ListItemText} from "@mui/material";

import Typography from "@mui/material/Typography";
import {Collections} from "../Types";

type Props = {
    data: {
        available: number;
        items: Array<Collections>
    };
    title: string;
}

const Listing: FC<Props> = ({data, title}) => {
    return (
        <>
            <Typography sx={{my: 4, textTransform: 'uppercase'}} variant="h4" component="div">
                {title} <Typography variant="h6"
                                    component="span">({data.available})
            </Typography>
            </Typography>
            <List sx={{
                width: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': {padding: 0},
            }}>
                {data?.items.map((data: Collections) => <ListItem key={data.name}>
                    <ListItemText primary={data.name} sx={{borderBottom: '1px solid #d7d7d7'}}/>
                </ListItem>)}
            </List>
        </>
    )
};

export default Listing;