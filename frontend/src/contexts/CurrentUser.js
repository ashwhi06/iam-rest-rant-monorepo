import { createContext, useEffect, useState } from "react";


export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)
   useEffect(() => {

     const getLoggedInUser = async () => {
       let res = await fetch('http://localhost:5000/authentication/profile')
       let user = await res.json()
       //const data = await res.json()
       setCurrentUser(user)
     }
   })

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    )
}

export default CurrentUserProvider