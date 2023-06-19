import AsyncStorage from "@react-native-async-storage/async-storage";
import React ,{useState,useEffect}from "react";
import {createContext}from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
   const register =(name,email,password,address,role,phone_number)=>{
    setIsLoading(true);
    axios
    .post(`http://192.168.100.171:3000/user`, {
      name,
      email,
      password,
      address,
      phone_number,
      role
    })
    .then(res=>{ 
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
        setIsLoading(false);
        console.log(userInfo);

    })
    .catch(e=>{
        console.log(`register error ${e}`);    })
        setIsLoading(false);

    }
    const login = (email, password) => {
        setIsLoading(true);
    
        axios
          .post(`/login`, {
            email,
            password,
          })
          .then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
          })
          .catch(e => {
            console.log(`login error ${e}`);
            setIsLoading(false);
          });
      };
      const logout = () => {
        setIsLoading(true);
    
        axios
          .post(
            `}/logout`,
            {},
            {
              headers: {Authorization: `Bearer ${userInfo.access_token}`},
            },
          )
          .then(res => {
            console.log(res.data);
            AsyncStorage.removeItem('userInfo');
            setUserInfo({});
            setIsLoading(false);
          })
          .catch(e => {
            console.log(`logout error ${e}`);
            setIsLoading(false);
          });
      };
      const isLoggedIn = async () => {
        try {
          setSplashLoading(true);
    
          let userInfo = await AsyncStorage.getItem('userInfo');
          userInfo = JSON.parse(userInfo);
    
          if (userInfo) {
            setUserInfo(userInfo);
          }
    
          setSplashLoading(false);
        } catch (e) {
          setSplashLoading(false);
          console.log(`is logged in error ${e}`);
        }
      };
    
      useEffect(() => {
        isLoggedIn();
      }, []);




    return(
    <AuthContext.Provider value={{
        isLoading,
        userInfo,
        register
    }}>{children}</AuthContext.Provider>
    );
}