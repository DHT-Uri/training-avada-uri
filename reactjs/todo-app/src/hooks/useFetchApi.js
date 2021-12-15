import React, {useEffect, useState} from 'react';

/**
 *
 * @param url
 * @returns {{data: *[], setData: (value: (((prevState: *[]) => *[]) | *[])) => void}}
 * @constructor
 */
function GetFetchApi({url}) {
    const [data, setData] = useState([]);

    async function fetchData() {
        try {
            const resp = await fetch(url);
            const respData = await resp.json();

            setData(respData['data']);
        }catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        setData
    }
}

async function PostFetchApi({url, postData, id}) {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "todo": postData,
                "isCompleted": false
            }),
        });

        return await resp.json();

    }catch (e) {
        console.log(e);
    }
}

async function UpdateFetchApi({url, data}) {
    try {
        const resp = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                isCompleted: true
            }),
        })

        return await resp.json();

    }catch (e) {
        console.log(e);
    }
}

async function RemoveFetchApi({url}) {
    try {
        const resp = await fetch(url, {
            method: 'DELETE'
        });

        return await resp.json();

    }catch (e) {
        console.log(e);
    }
}

export default {
    GetFetchApi,
    PostFetchApi,
    UpdateFetchApi,
    RemoveFetchApi
};
