/**
 *
 * @param url
 * @param method
 * @param postData
 * @returns {Promise<any>}
 */
async function makeRequest({url, method, postData}) {
    try {
        const resp = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: postData
        });
        return resp.json();
    }catch (e) {
        console.log(e);
    }
}

export default makeRequest;
