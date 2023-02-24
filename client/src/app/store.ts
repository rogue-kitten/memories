import { configureStore } from '@reduxjs/toolkit';
import createPostReducer from '../features/createPost';
import getPostReducer from '../features/getPost';

const store = configureStore({
    reducer: {
        getPost: getPostReducer,
        createPost: createPostReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
