export default (state = { signupResponce: { data: {} } }, action) => {
  const { type, payload, status } = action;
  switch (type) {
    case 'USER_SIGNUP':
      return {
        ...state,
        signupResponce: {
          ...payload,
          status,
        },
      };

    default:
      return state;
  }
};
