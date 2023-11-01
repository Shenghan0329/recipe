import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";

const persistConfig = {
  key: "root",
  storage: localforage,
};
const initailState = {
  data: [],
};
const rootReducer = (state = initailState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    default:
      return state;
  }
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware());
const persistor = persistStore(store);
export { persistor };
export default store;
