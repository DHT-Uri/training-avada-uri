import {useEffect, useState} from 'react';

/**
 *
 * @param url
 * @returns {{data: *[], setData: (value: (((prevState: *[]) => *[]) | *[])) => void, loading: boolean}}
 */
function useFetchTodo({url}) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    async function fetchData() {
        try {
            setLoading(true);
            const resp = await fetch(url);
            const respData = await resp.json();
            setData(respData['data']);
        }catch (e) {
            console.log(e);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        setData,
        loading
    }
}

export default useFetchTodo;
