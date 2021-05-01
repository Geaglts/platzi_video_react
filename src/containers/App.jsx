import React, { useState, useEffect } from "react";
import "@styles/App.scss";

import Header from "@components/Header";
import Search from "@components/Search";
import Categories from "@components/Categories";
import Carousel from "@components/Carousel";
import CarouselItem from "@components/CarouselItem";
import Footer from "@components/Footer";

const App = () => {
    const [videos, setVideos] = useState(null);

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

    if (!videos) {
        return null;
    }

    return (
        <div className="App">
            <Header />
            <Search />
            {videos.mylist.length > 0 && (
                <Categories title="Mi lista">
                    <Carousel>
                        <CarouselItem />
                        <CarouselItem />
                        <CarouselItem />
                    </Carousel>
                </Categories>
            )}
            <Categories title="Tendencias">
                <Carousel>
                    {videos.trends.map((item) => (
                        <CarouselItem key={item.id} {...item} />
                    ))}
                </Carousel>
            </Categories>
            <Categories title="Originales de Platzi Video">
                <Carousel>
                    {videos.originals.map((item) => (
                        <CarouselItem key={item.id} {...item} />
                    ))}
                </Carousel>
            </Categories>
            <Footer />
        </div>
    );
};

export default App;
