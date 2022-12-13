import React, {FC} from 'react';
import {Box} from "@mui/material";
import {createImageUrl} from "../Utils";

type Props = {
    path: string;
    ext: string;
}

const imageResolutions = ['216', '300'];//predefined resolution from marvel API
const imageSize = ['portrait_incredible', 'portrait_uncanny']; //predefined sizes from marvel API

const ResponsiveImages: FC<Props> = ({path = '', ext = ""}) => {
    return (
        <Box component="div" sx={{justifyContent: 'center', display: 'flex'}}>
            <picture>
                {imageResolutions.map((item, index) => {
                    return <source media={`(max-width:${parseInt(item, 10) + 40}px)`}
                                   srcSet={createImageUrl(path, ext, imageSize[index])} key={item}/>
                })}
                <img src={createImageUrl(path, ext)} alt="" style={{maxWidth: '100%'}}/>
            </picture>
        </Box>
    )
};

export default ResponsiveImages;