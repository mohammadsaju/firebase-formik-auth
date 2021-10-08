//we need this beacuse to trac the user
import { createContext, useReducer, useContext } from "react";

//this is the data layer
export const stateContext = createContext();

//build a provider
export const StateProvider = ({reducer, initialstate, children}) => (
    <stateContext.Provider value={useReducer(reducer, initialstate)}>
        {children}
    </stateContext.Provider>
)

export const useStateValue = () => useContext(stateContext);