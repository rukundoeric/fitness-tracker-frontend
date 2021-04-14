const initialState = {
  ttResponce: { data: {} },
  ttmList: [],
};

export default (state = initialState, action) => {
  const { type, payload, status } = action;

  switch (type) {
    case 'GET_THINGS_TO_MEASURE':
      return {
        ...state,
        ttmList: payload,
        status,
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
        ttResponce: { data: {} },
      };

    default:
      return state;
  }
};
