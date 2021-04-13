const initialState = {
  ttResponce: {},
  ttmList: [],
};

export default (state = initialState, action, status) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_THINGS_TO_MEASURE':
      return {
        ...state,
        ttmList: payload,
      };

    case 'CREATE_THING_TO_MEASURE':
      return {
        ...state,
        ttResponce: {
          ...payload,
          status,
        },
      };

    case 'T_T_M_RESET':
      return {
        ...state,
        ttResponce: { },
      };

    default:
      return state;
  }
};
