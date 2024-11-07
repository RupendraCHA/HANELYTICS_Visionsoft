import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null)

const storeContextProvider = (props) => {

    let backendURL = "https://hanelytics-visionsoft.onrender.com/";

    const contextValue = {
        backendURL
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default storeContextProvider
