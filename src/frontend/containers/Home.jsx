import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "@styles/App.scss";

import Search from "@components/Search";
import Categories from "@components/Categories";
import Carousel from "@components/Carousel";
import CarouselItem from "@components/CarouselItem";

const Home = ({ mylist, trends, originals }) => {
    return (
        <>
            <Search />
            {mylist.length > 0 && (
                <Categories title="Mi lista">
                    <Carousel>
                        {mylist.map((item) => (
                            <CarouselItem key={item.id} {...item} isMyList />
                        ))}
                    </Carousel>
                </Categories>
            )}
            <Categories title="Tendencias">
                <Carousel>
                    {trends.map((item) => (
                        <CarouselItem key={item.id} {...item} />
                    ))}
                </Carousel>
            </Categories>
            <Categories title="Originales de Platzi Video">
                <Carousel>
                    {originals.map((item) => (
                        <CarouselItem key={item.id} {...item} />
                    ))}
                </Carousel>
            </Categories>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        mylist: state.mylist,
        trends: state.trends,
        originals: state.originals,
    };
};

Home.propTypes = {
    mylist: PropTypes.array,
    trends: PropTypes.array,
    originals: PropTypes.array,
};

export default connect(mapStateToProps, null)(Home);
