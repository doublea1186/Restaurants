import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/App';
import YelpPage from "./Pages/Yelp";
import LoginPage from "./Pages/Login"
import RegisterPage from './Pages/Register';
import LogoutPage from './Pages/Logout';
import MapContainer from './Pages/Map';
import RestaurantPage from './Pages/Restaurant'
import YelpDetailsPage from './Pages/YelpDetails';
import LikedPage from './Pages/Liked';
import RecommendedPage from './Pages/Recommended';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';

import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


const RequireAuth = ({ children }) => {
    var loggedIn = localStorage.getItem("isLoggedIn");

    if (loggedIn == 'true') {
        console.log("you are logged in")
        return children
    } else {
        console.log("you are not logged in")
        return <Navigate to="/Login" />
    }
}

ReactDOM.render(
    <div>
        <Router>
            <Routes>
                <Route exact
                    path="/"
                    element={
                        <RequireAuth> <App /> </RequireAuth>
                    } />
                <Route exact
                    path='/yelp'
                    element={
                        <RequireAuth> <YelpPage /> </RequireAuth>
                    } />
                <Route exact
                    path='/yelp/details'
                    element={
                        <RequireAuth> <YelpDetailsPage /> </RequireAuth>
                    } />
                <Route exact
                    path='/login'
                    element={
                        <LoginPage />
                    } />
                <Route exact
                    path='/logout'
                    element={
                        <LogoutPage />
                    } />
                <Route exact
                    path='/register'
                    element={
                        <RegisterPage />
                    } />
                <Route exact
                    path='/map'
                    element={
                        <RequireAuth><MapContainer /> </ RequireAuth>
                    }
                    />
                <Route exact
                    path='/restaurant'
                    element={
                        <RequireAuth> <RestaurantPage /> </RequireAuth>
                    } />
                <Route exact
                    path='/recommended'
                    element={
                        <RequireAuth> <RecommendedPage/> </RequireAuth>
                    } />
                <Route exact
                    path='/liked'
                    element={
                        <RequireAuth> <LikedPage /> </RequireAuth>
                    } />
            </Routes>
        </Router>
    </div>,
    document.getElementById('root')
);
