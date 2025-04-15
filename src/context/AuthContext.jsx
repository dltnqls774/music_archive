import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStarteChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [user, setUser] = useState();

    useEffect(() => {
        onUserStarteChange((user) => {
            console.log(user);
            setUser(user);
        });
    },[]);
    
    return <AuthContext.Provider value={{user, uid: user && user.uid, login: login, logout: logout}}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}