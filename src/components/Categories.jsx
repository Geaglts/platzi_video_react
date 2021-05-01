import React from "react";
import PropTypes from "prop-types";
import "@styles/components/Categories.scss";

const Categories = ({ children, title }) => {
    return (
        <div className="categories">
            <h2 className="categories__title">{title}</h2>
            {children}
        </div>
    );
};

Categories.propTypes = {
    title: PropTypes.string,
};

export default Categories;
