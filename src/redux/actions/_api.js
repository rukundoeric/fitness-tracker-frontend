const API = process.env.REACT_APP_API_URL;

export const login = `${API}/sign_in`;
export const signUp = `${API}/sign_up`;
export const getUser = id => `${API}/user/${id}`;
export const thingsToMeasure = `${API}/things_to_measure`;
export const thingToMeasure = id => `${API}/things_to_measure/${id}`;
export const measurements = `${API}/measurement`;
export const progress = `${API}/progress`;
