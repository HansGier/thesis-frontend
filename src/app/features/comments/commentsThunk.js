import customFetch, { checkForUnauthorizedResponse } from "../../../utils/axios.js";
import { PROJECTS_URL } from "../../constants.js";
import { getAllComments } from "./commentsSlice.js";

export const getAllCommentsThunk = async (id, thunkAPI) => {
    try {
        const state = thunkAPI.getState().auth;
        const headers = state.user.role === "guest" ? { Authorization: `Bearer guest` } : { Authorization: `Bearer ${ state.user.accessToken }` };
        const response = await customFetch.get(`${ PROJECTS_URL }/${ id }/comments`, { headers });
        return response.data;
    } catch (e) {
        return checkForUnauthorizedResponse(e, thunkAPI);
    }
};

export const postCommentThunk = async ({ id, comments }, thunkAPI) => {
    try {
        const state = thunkAPI.getState().auth;
        const headers = { Authorization: `Bearer ${ state.user.accessToken }` };
        const response = await customFetch.post(`${ PROJECTS_URL }/${ id }/comments`, comments, { headers });
        thunkAPI.dispatch(getAllComments(id));
        return response.data;
    } catch (e) {
        return checkForUnauthorizedResponse(e, thunkAPI);
    }
};

