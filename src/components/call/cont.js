import { useState, useEffect } from 'react';
import CalNowPage from './CalNowPage';
import { useAuth } from 'src/pages/AuthContext';

export default function CalNowPageContainer() {
    const [ ip ] = useAuth
    const [data, setData] = useState({ website: '', number: '' });

    useEffect(() => {
        fetch(`${ip}/api/data`, {
            headers: {
                'x-access-token':
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImluZm9AbGV0c2dldGRpZ2kuY29tIiwiaWF0IjoxNjc5MzUxOTczfQ.o8f1Ge1Mw5XnFHwxPLewuzoJh81crwU8KhGDOkBZ1VM',
            },
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <CalNowPage data={data} />
    );
}
