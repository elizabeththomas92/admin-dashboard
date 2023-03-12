const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  age: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return action.payload;

    case "RETRIEVE_USER":
      return action.payload;

    case "UPDATE_USER":
      let userDetailsArray = state;

      userDetailsArray[action.payload.key] = action.payload.value;
      return userDetailsArray;

    case "REMOVE_USER":
      let educationArray = state;
      educationArray.splice(action.payload.index, 1);
      return educationArray;
    default:
      return state;
  }
};
