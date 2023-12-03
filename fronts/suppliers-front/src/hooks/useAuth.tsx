import React, { useState, useEffect, useRef } from "react";
import keycloakClient from "../KeycloakClient";

const useAuth = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isLogin, setLogin] = useState<boolean>(false);
  const isRun = useRef(false);
  useEffect(()=> {
    if (isRun.current) return;
    isRun.current = true;
  
    keycloakClient.init({
      onLoad: 'login-required',
    }).then((res: boolean)=> {
      console.log({tokenParsed : keycloakClient.tokenParsed});
      const test = keycloakClient.loadUserInfo();
      console.log(test);
      setToken(keycloakClient.token);
      setLogin(res)
    })
  
  })
 
  // useEffect(() => {
  //   if (isRun.current) return;

  //   isRun.current = true;
  //   client
  //     .init({
  //       onLoad: "login-required",
  //     })
  //     .then((res: any) => {
  //       const token = client.token;
  //       setLogin(res);
  //       setToken(token);
  //     });
  // }, []);

  return {isLogin, token};
};

export default useAuth;