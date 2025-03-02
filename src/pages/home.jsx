import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NameApp } from 'src/data';
import HomeView from 'src/sections/home/HomeView';

function Home(props) {
    return (
        <>
            <Helmet>
                <title>{NameApp}</title>
            </Helmet>
            <HomeView />
        </>
    );
}

export default Home;