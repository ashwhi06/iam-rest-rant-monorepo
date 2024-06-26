import { createContext, useEffect, useState } from "react";
// import { get } from "../../../backend/controllers/places";


export const CurrentUser = createContext()

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {

      const getLoggedInUser = async () => {
        let res = await fetch('http://localhost:5000/authentication/profile', { 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      })
        let user = await res.json()
        setCurrentUser(user)
      }
      getLoggedInUser()
    }, [])

      return (
          <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
              {children}
          </CurrentUser.Provider>
      )
}

export default CurrentUserProvider