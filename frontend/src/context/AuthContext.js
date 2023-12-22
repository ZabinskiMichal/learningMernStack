import React from 'react';
import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null}
        default:
            return state
    }
}


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // ten use efect odpowiada za to,ze jesli odświeymy strone, user bedzie nadal zalogowany
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user})
        }
    }, []) // dzieki pustej tablicy ten use effect odpali sie tylko w przypadku pierwszego renderu komponentu

    console.log("AuthContext state: ", state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>

            { children }

        </AuthContext.Provider>
    )
}