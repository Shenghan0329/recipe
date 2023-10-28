import { createContext, useEffect } from "react";
import { useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";
import { useContext } from "react";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [reset, setReset] = useState(false);
  const sub = authUser?.attributes?.sub;
  console.log(sub);
  useEffect(() => {
    if (reset) {
      // To always ensure we first have dbUser then authUser
      Auth.currentAuthenticatedUser({ bypassCache: true }).then((u) => {
        console.log(u);
        if (u?.attributes) {
          DataStore.query(User, (user) => user.sub.eq(u?.attributes?.sub)).then(
            (users) => {
              console.log(users);
              setDbUser(users[0]);
              setAuthUser(u);
            }
          );
        } else {
          setAuthUser(u);
        }
      });
      setReset(false);
    }
  }, [reset]);
  useEffect(() => {
    if (sub) {
      console.log("aaa");
      DataStore.query(User, (user) => user.sub.eq(sub)).then((users) =>
        setDbUser(users[0])
      );
    }
  }, [sub]);

  return (
    <AuthContext.Provider
      value={{ authUser, dbUser, sub, setDbUser, setAuthUser, setReset }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
