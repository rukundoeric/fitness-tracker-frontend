const initialState = { status: '', data: {} };
export default (state = initialState, action) => {
  const { type, payload, status } = action;
  switch (type) {
    case 'USER_LOGIN':
      return {
        ...state,
        ...payload,
        status,
      };
    case 'AUTH_RESET':
      return initialState;
    default:
      return state;
  }
};
