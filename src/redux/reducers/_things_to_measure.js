const initialState = {
  ttResponce: {
    data: {},
  },
  thingsToMeasure: [],
};

export default (state = initialState, action) => {
  const { type, payload, status } = action;
  switch (type) {
    case 'CREATE_THING_TO_MEASURE':
      return {
        ...state,
        ttResponce: {
          ...state.ttResponce,
          ...payload,
          status,
        },
      };
    case 'GET_THINGS_TO_MEASURE':
      return {
        ...state,
        thingsToMeasure: {
          ...payload,
        },
      };
    case 'T_T_M_RESET':
      return {
        ...state,
        ttResponce: {
          ...initialState.ttResponce,
        },
      };
    default:
      return state;
  }
};
