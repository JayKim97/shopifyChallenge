import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_ONE,
} from "../constants/actionTypes";

import * as api from "../api";

export const createImage = (image) => async (dispatch) => {
  try {
    const { data } = await api.createImage(image);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getImages = () => async (dispatch) => {
  try {
    const { data } = await api.fetchImages();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateImage = (id, image) => async (dispatch) => {
  try {
    const { data } = await api.updateImage(id, image);
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteImages = (id) => async (dispatch) => {
  try {
    await api.deleteImages(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeImages = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeImages(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchImage = (id) => async (dispatch) => {
  try {
    api.fetchImage(id);
    dispatch({ type: FETCH_ONE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
