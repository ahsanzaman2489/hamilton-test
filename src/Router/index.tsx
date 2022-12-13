import * as React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";
import Home from './Home'
import Details from './Details'

export default createBrowserRouter([
    {
        path: "/*",
        element: <Home/>,

    },
    {
        path: "/details/:characterId",
        element: <Details/>,
    },
]);

