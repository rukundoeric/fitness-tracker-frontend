const initialState = {
  cmResponse: {},
  mList: {},
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
    case 'GET_MEASUREMENTS':
      return {
        ...state,
        mList: payload,
        status,
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
