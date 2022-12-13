# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## key features of the project
* Built with React 18 and Create react App
* Typescript for static type checkings
* Material UI used for Markup https://mui.com/material-ui/
* All data visualization is from server directly without state management
* Used React Material Table for data visualization (https://www.material-react-table.com/docs/getting-started/install)
* React Query used to query and call API on client
* Column Filters are added Figure 1.1
* Show/hide Column Filter Figure 1.2
* Show/hide Columns Figure 1.3
* Pagination Figure 1.4
* Back functionality to previous url's with previous URL query Params Figure 2.5
* Character Details with Name , description , image. public URLS Figure 3.6
* Stories , Series , Comics , Events will be listed if available Figure 3.7 
* Sorting ,Pagination , Filters are saved in URL query params to the get the data as per URL
* Multi column sort is available you have to hold `SHIFT` key.
* Fully paginated data visualization
* Fully responsive Figure 4 and 5
   
Figure 1 ![](<public/Screenshot 2022-12-13 183034.jpg>)

Figure 2 ![](<public/Screenshot 2022-12-13 183118.jpg>)

Figure 3 ![](<public/Screenshot 2022-12-13 183201.jpg>)

Figure 4 ![](<public/Screenshot 2022-12-13 192759.jpg>)

Figure 5 ![](<public/Screenshot 2022-12-13 192824.jpg>)

## Limitations
* There is no Global search API to fetch search results , that why i added column based search
* In detail page List of Series , Comics , Stories and Events have limited data to show against character , So i didnt call 4 new API's to get whole data , i just render the limited results from Character API with total count of respective list.
* There was no design provided so i focused more on functionality rather then design.
* No test cases added because of my limited time , i can add if i get more time
* Search is very wierd , case and word sensitive.
* Images dont have custom sizes they have predefined sizes , full width image can be less then 750px
* Not much data in the Character API (Eg : images , details)
* No cache applie due to my limited time , can be done if i get more time.

## Setup
* clone the repo `git clone https://github.com/ahsanzaman2489/hamilton-test.git` 
* cd your folder name `Eg : cd hamilton-test`
* `npm install` if error please check `https://www.material-react-table.com/docs/getting-started/install` Install With Required Peer Dependencies
* for development script please check below
* if you want to use your own API keys change `projectroot/.env`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
