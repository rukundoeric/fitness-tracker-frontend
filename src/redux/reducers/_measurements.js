const initialState = {
  cmResponse: {},
};

export default (state = initialState, action) => {
  const { type, payload, status } = action;

  switch (type) {
    case 'CREATE_MEASUREMENT':
      return {
        ...state,
        cmResponse: {
          ...payload,
          status,
        },
      };
    case 'C_M_RESET':
      return {
        ...state,
        cmResponse: {},
      };
    default:
      return state;
  }
};
