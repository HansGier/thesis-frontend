import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice.js";
import projectsSlice from "./features/projects/projectsSlice.js";
import announcementsSlice from "./features/announcements/announcementsSlice.js";
import commentsSlice from "./features/comments/commentsSlice.js";
import messagesSlice from "./features/messages/messagesSlice.js";
import barangaysSlice from "./features/users/barangaysSlice.js";
import usersSlice from "./features/users/usersSlice.js";
import reactionsSlice from "./features/reactions/reactionsSlice.js";
import updatesSlice from "./features/projects/updatesSlice.js";
import contactsSlice from "./features/contacts/contactsSlice.js";
import mediaSlice from "./features/media/mediaSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        projects: projectsSlice,
        announcements: announcementsSlice,
        comments: commentsSlice,
        messages: messagesSlice,
        barangays: barangaysSlice,
        users: usersSlice,
        reactions: reactionsSlice,
        updates: updatesSlice,
        contacts: contactsSlice,
        media: mediaSlice
    }
});