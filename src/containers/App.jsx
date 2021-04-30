import React from "react";
import "@styles/App.scss";

import Header from "@components/Header";
import Search from "@components/Search";
import Categories from "@components/Categories";
import Carousel from "@components/Carousel";
import CarouselItem from "@components/CarouselItem";
import Footer from "@components/Footer";

const App = () => {
    return (
        <div className="App">
            <Header />
            <Search />
            <Categories>
                <Carousel>
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                    <CarouselItem />
                </Carousel>
            </Categories>
            <Footer />
        </div>
    );
};

export default App;
