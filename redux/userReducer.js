const initialState = {
  userGlobalData: [],
  userGlobalEmail: ""
};
 
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_COLMENA':
      return {
        ...state,
        userGlobalData: action.userData,
      };
    case 'LOAD_EMAIL':
      return {
        ...state,
        userGlobalEmail: action.userEmail,
      };
    default:
      return state;
  }
};