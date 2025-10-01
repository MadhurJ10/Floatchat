import React, { useContext, useState, useEffect } from "react";
import LeafletMap from "../components/LeafletMap";
import { MapDataContext } from "../context/MapDataProvider";

const Map = () => {
    const [ query, setQuery ] = useState("");
    const { data, setData } = useContext(MapDataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/c/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: query }),
            });

            if (!res.ok) throw new Error("Failed to send data");

            const result = await res.json();
            console.log("API Response:", result.data);

            setData(result.data); // ✅ correct way to update context state
            setQuery(""); // optional: clear input after submit
        } catch (err) {
            console.error("Error:", err);
        }
    };

    // See updated data whenever it changes
    useEffect(() => {
        console.log("Updated data in context:", data.data);
    }, [ data ]);

    return (
        <div className="bg-black text-white flex flex-col h-[200px] w-[200px]">
            <h1 className="text-center py-4">Map Example</h1>

            {/* Input field + button */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 pb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter something"
                    className="flex-1 px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                    Send
                </button>
            </form>

            {/* Map occupies the rest of the space */}
            <div className="flex-1">
                <LeafletMap />
            </div>
        </div>
    );
};

export default Map;
