import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    createBrowserRouter,
    RouterProvider,
    Router
} from "react-router-dom";
import Home from './Home'
import Details from './Details'

export default createBrowserRouter([
    {
        path: "/*",
        element: <Home/>,
        // loader: rootLoader,
    },
    {
        path: "/details/:characterId",
        element: <Details/>,
        // loader: rootLoader,
    },
]);

