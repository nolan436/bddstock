const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
    try {
        const store = getStore({
            name: "resellflow_store",
            consistency: "strong"
        });
        
        if (event.httpMethod === "GET") {
            let data = [];
            try {
                data = await store.get("stock", { type: "json" });
            } catch (e) {
            
            }
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
    } catch (globalError) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: globalError.message })
        };
    }
};
