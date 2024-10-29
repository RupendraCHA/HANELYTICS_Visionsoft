import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null)

const storeContextProvider = (props) => {

    const contextValue = {
        
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default storeContextProvider
