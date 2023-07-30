import { createContext, useEffect } from "react";
import { useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";
import { useContext } from "react";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const sub = authUser?.attributes?.sub;
  console.log(sub);
  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((u) => {
      console.log(u);
      setAuthUser(u);
    });
  }, []);
  useEffect(() => {
    if (sub) {
      DataStore.query(User, (user) => user.sub.eq(sub)).then((users) =>
        setDbUser(users[0])
      );
    }
  }, [sub]);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
