export default (state = { rReport: {}, sReport: [] }, action) => {
  const { type, payload, status } = action;
  switch (type) {
    case 'GET_PROGRESS_REPORT':
      return {
        ...state,
        ...payload,
        status,
      };
    default:
      return state;
  }
};
