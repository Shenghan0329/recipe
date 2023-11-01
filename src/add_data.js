export const ADD_DATA = "ADD_DATA";
export const addData = (data) => {
  return {
    type: ADD_DATA,
    payload: data,
  };
};
export default addData;
