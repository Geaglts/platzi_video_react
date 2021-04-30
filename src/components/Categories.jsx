import React from "react";
import "@styles/components/Categories.scss";

const Categories = ({ children }) => {
    return (
        <div className="categories">
            <h2 className="categories__title">Mi lista</h2>
            {children}
        </div>
    );
};

export default Categories;
