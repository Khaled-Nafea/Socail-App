import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
let baseURL= import.meta.env.VITE_BASE_URL;

export const ProfileContext = createContext();

export default function ProfileContextProvider({ children }) {
    const localStorageToken = localStorage.getItem("userToken");
    const [userProfile, setUserProfile] = useState(null);

    async function getUserProfile() {
        let data = await axios.get(`${baseURL}/users/profile-data`,
            {
                headers: {
                    token: localStorage.getItem("userToken"),
                },
            }
        );
        setUserProfile(data.data.data.user);
    }

    useEffect(() => {
        if (localStorageToken) {
            getUserProfile();
        }
    }, [localStorageToken]);


    return (
        <ProfileContext.Provider value={{ userProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}
