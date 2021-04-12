export default (state = { status: '' }, action) => {
  const { type, payload, status } = action;
  switch (type) {
    case 'USER_LOGIN':
      return {
        ...state,
        ...payload,
        status,
      };

    default:
      return state;
  }
};
