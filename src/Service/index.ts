import axios from 'axios';
import {getAuthorizeUrl} from "../Utils";

interface Params {
    headers: any
    method: string
}

const config: Params = {
    headers: {},
    method: 'GET'
};

export const API = async (url: any): Promise<any> => {

    const authorizeUrl = getAuthorizeUrl(url);
    return await axios({
        ...config,
        url: `${authorizeUrl}`,
    }).then((response: any) => {
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error: any) => {
        return {
            status: error.status,
            data: error.response
        }
    })
};