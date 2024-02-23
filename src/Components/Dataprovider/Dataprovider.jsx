
import React, { createContext, useReducer } from 'react';
import { initialState, reducer } from "../../utility/reducer";

export const DataContext = createContext();

 export const Dataprovider = ({children}) => {
    return (
        <DataContext.Provider value={useReducer(reducer,initialState)}>
                {children}
        </DataContext.Provider>
    )
}
