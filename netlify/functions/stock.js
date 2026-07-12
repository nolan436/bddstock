exports.handler = async (event) => {
    const token = process.env.NETLIFY_BLOBS_TOKEN;
    const siteId = process.env.NETLIFY_BLOBS_SITE_ID;
    
    const url = `https://api.netlify.com/api/v1/sites/${siteId}/blobs/stores/resellflow_store/keys/stock`;
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    try {
        if (event.httpMethod === "GET") {
            const res = await fetch(url, { headers });
            if (res.status === 404) {
                return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify([]) };
            }
            const data = await res.json();
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };
        }

        if (event.httpMethod === "POST") {
            await fetch(url, {
                method: "PUT",
                headers,
                body: event.body
            });
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ success: true })
            };
        }

        return { statusCode: 405 };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};
