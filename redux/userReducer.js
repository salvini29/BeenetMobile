const initialState = {
  userGlobalData: [],
};
 
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_COLMENA':
      return {
        ...state,
        userGlobalData: action.userData,
      };
    default:
      return state;
  }
};