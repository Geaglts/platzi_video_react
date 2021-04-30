import React, { useState, useEffect } from "react";
import "@styles/App.scss";

import Header from "@components/Header";
import Search from "@components/Search";
import Categories from "@components/Categories";
import Carousel from "@components/Carousel";
import CarouselItem from "@components/CarouselItem";
import Footer from "@components/Footer";

const App = () => {
    const [videos, setVideos] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/initalState");
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            <Header />
            <Search />
            <Categories title="Mi lista">
                <Carousel>
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                </Carousel>
            </Categories>
            <Categories title="Tendencias">
                <Carousel>
                    <CarouselItem />
                    <CarouselItem />
                </Carousel>
            </Categories>
            <Categories title="Originales de Platzi Video">
                <Carousel>
                    <CarouselItem />
                </Carousel>
            </Categories>
            <Footer />
        </div>
    );
};

export default App;
