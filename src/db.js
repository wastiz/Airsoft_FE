import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/data'); // Путь к вашему маршруту на сервере
            setData(result.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>{data.message}</h1>
        </div>
    );
};

export default App;