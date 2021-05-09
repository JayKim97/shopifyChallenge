import {
  CREATE,
  FETCH_ALL,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_ONE,
} from "../constants/actionTypes";

export default (images = [], action) => {
  switch (action.type) {
    case CREATE:
      return [...images, action.payload];
    case FETCH_ALL:
      return action.payload;
    case FETCH_ONE:
      return action.payload;
    case UPDATE:
    case LIKE:
      return images.map((image) =>
        image._id === action.payload._id ? action.payload : image
      );
    case DELETE:
      return images.filter((image) => image._id !== action.payload);
    default:
      return images;
  }
};
