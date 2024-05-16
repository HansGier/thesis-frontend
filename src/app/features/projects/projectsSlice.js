import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProjectThunk, getAllProjectsThunk } from "./projectsThunk.js";
import cloudinary from "../../../utils/cloudinaryConfig.js";

const initialFitlersState = {
    search: "",
    tags: "",
    barangays: "",
    status: "",
    sort: "",
    budgetRange: "",
    progressRange: "",
    viewsRange: ""
};

const initialState = {
    isProjectFetchLoading: false,
    isProjectFetchSuccess: true,
    projectFetchErrorMessage: "",
    isProjectFetchError: false,
    totalProjects: 0,
    projects: [],
    singleProject: null,
    completed: 0,
    ongoing: 0,
    planned: 0,
    cancelled: 0,
    on_hold: 0,
    featuredProjects: [],
    upcomingProjects: [],
    importantAnnouncements: [],
    feedbackSummaries: [],
    uploadedImages: [],
    uploadLoading: false,
    uploadError: null,
    ...initialFitlersState
};

export const uploadImages = createAsyncThunk(
    "projects/uploadImages",
    async (files, { rejectWithValue }) => {
        try {
            const uploadedImages = await Promise.all(
                files.map(async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("upload_preset", "your_upload_preset");

                    const response = await axios.post(
                        `https://api.cloudinary.com/v1_1/${ cloudinary.config().cloud_name }/upload`,
                        formData
                    );

                    const { size, resource_type, secure_url, public_id } = response.data;
                    return { size, resource_type, secure_url, id: public_id };
                })
            );

            return uploadedImages;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteImages = createAsyncThunk(
    "projects/deleteImages",
    async (publicIds, { rejectWithValue }) => {
        try {
            await Promise.all(
                publicIds.map(async (publicId) => {
                    await cloudinary.uploader.destroy(publicId);
                })
            );
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const getAllProjects = createAsyncThunk("projects/getAllProjects", getAllProjectsThunk);
export const createProject = createAsyncThunk("projects/createProject", createProjectThunk);


const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setSingleProject: (state, { payload }) => {
            state.singleProject = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadImages.pending, (state) => {
                state.uploadLoading = true;
                state.uploadError = null;
            })
            .addCase(uploadImages.fulfilled, (state, action) => {
                state.uploadLoading = false;
                state.uploadedImages = action.payload;
            })
            .addCase(uploadImages.rejected, (state, action) => {
                state.uploadLoading = false;
                state.uploadError = action.payload;
            })
            .addCase(deleteImages.fulfilled, (state) => {
                state.uploadedImages = [];
            })

            .addCase(createProject.pending, (state) => {
                state.isProjectFetchSuccess = false;
                state.isProjectFetchError = false;
                state.isProjectFetchLoading = true;
            })
            .addCase(createProject.fulfilled, (state, { payload }) => {
                state.isProjectFetchLoading = false;
                state.isProjectFetchError = false;
                state.isProjectFetchSuccess = true;
                state.projects = payload.projects;
                state.totalProjects = !payload.project ? 0 : payload.totalCount;

            })
            .addCase(createProject.rejected, (state, { payload }) => {
                state.isProjectFetchLoading = false;
                state.isProjectFetchSuccess = false;
                state.projectFetchErrorMessage = payload;
                state.isProjectFetchError = true;
            })
            
            .addCase(getAllProjects.pending, (state) => {
                state.isProjectFetchSuccess = false;
                state.isProjectFetchError = false;
                state.isProjectFetchLoading = true;
            })
            .addCase(getAllProjects.fulfilled, (state, { payload }) => {
                state.isProjectFetchLoading = false;
                state.isProjectFetchError = false;
                state.isProjectFetchSuccess = true;
                state.projects = payload.projects;
                state.totalProjects = !payload.project ? 0 : payload.totalCount;
                state.completed = !payload.projects ? 0 : payload.projects.filter(project => project.status === "completed").length;
                state.ongoing = !payload.projects ? 0 : payload.projects.filter(project => project.status === "ongoing").length;
                state.planned = !payload.projects ? 0 : payload.projects.filter(project => project.status === "planned").length;
                state.cancelled = !payload.projects ? 0 : payload.projects.filter(project => project.status === "cancelled").length;
                state.on_hold = !payload.projects ? 0 : payload.projects.filter(project => project.status === "on_hold").length;

                if (payload.projects) {
                    // Select 3 random featured projects
                    const featuredProjects = [];
                    const shuffledProjects = payload.projects.sort(() => 0.5 - Math.random());
                    const maxFeaturedProjects = Math.min(3, shuffledProjects.length);
                    for (let i = 0; i < maxFeaturedProjects; i++) {
                        featuredProjects.push(shuffledProjects[i]);
                    }
                    state.featuredProjects = featuredProjects;

                    // Select upcoming projects with "planned" status
                    const upcomingProjects = payload.projects.filter(project => project.status === "planned");
                    const maxUpcomingProjects = Math.min(3, upcomingProjects.length);
                    state.upcomingProjects = upcomingProjects.slice(0, maxUpcomingProjects);

                    //select 3 random projects with feedback or comment
                    const feedBackSummaries = [];
                    const shuffledProjects2 = payload.projects.sort(() => 0.5 - Math.random());
                    const maxFeaturedProjects2 = Math.min(3, shuffledProjects2.length);
                    for (let i = 0; i < maxFeaturedProjects2; i++) {
                        feedBackSummaries.push(shuffledProjects2[i]);
                    }
                    state.feedbackSummaries = feedBackSummaries;
                }

            })
            .addCase(getAllProjects.rejected, (state, { payload }) => {
                state.isProjectFetchLoading = false;
                state.isProjectFetchSuccess = false;
                state.projectFetchErrorMessage = payload;
                state.isProjectFetchError = true;
            });

    }
});

export const {
    setSingleProject
} = projectsSlice.actions;
export default projectsSlice.reducer;