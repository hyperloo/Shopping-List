import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from "./Types";
import axios from "axios";

export const getItems = () => dispatch => {
  dispatch(LoadItems());
  axios.get("/api/items").then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

export const addItem = item => dispatch => {
  axios.post("/api/items", item).then(res =>
    dispatch({
      type: ADD_ITEMS,
      payload: res.data
    })
  );
};

export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEMS,
      payload: id
    })
  );
};

export const LoadItems = () => {
  return {
    type: ITEMS_LOADING
  };
};
