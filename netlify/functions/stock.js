const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    const store = getStore("resellflow_store");
    
    if (event.httpMethod === "GET") {
        const data = await store.get("stock", { type: "json" });
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data || [])
        };
    }
    
    if (event.httpMethod === "POST") {
        const stockData = JSON.parse(event.body);
        await store.setJSON("stock", stockData);
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: true })
        };
    }
    
    return { statusCode: 405 };
};
