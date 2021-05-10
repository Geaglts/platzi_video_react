import { useState, useEffect } from "react";

const useInitialState = (API) => {
    const [videos, setVideos] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            setVideos(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return videos;
};

export default useInitialState;
