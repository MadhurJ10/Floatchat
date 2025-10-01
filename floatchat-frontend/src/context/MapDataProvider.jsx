import React, { createContext, useState } from 'react'


export const MapDataContext = createContext();

const MapDataProvider = ({ children }) => {
    // const data = []
    const [data, setData] = React.useState([]);
    return (
        <MapDataContext.Provider value={{data , setData}}>
            {children}
        </MapDataContext.Provider>
    )
}

export default MapDataProvider
