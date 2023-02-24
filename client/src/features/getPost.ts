import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Post from '../types/post';

interface InitialState {
    loading: boolean;
    posts: Post[];
    error: string;
}

const initialState: InitialState = {
    loading: false,
    posts: [],
    error: '',
};

export const fetchPosts = createAsyncThunk('getPost/fetchPosts', async () => {
    return axios
        .get('http://localhost:1337/api/posts')
        .then((resp) => resp.data)
        .catch((err) => err.message);
});

const getPostSlice = createSlice({
    name: 'getPosts',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchPosts.fulfilled,
            (state, action: PayloadAction<Post[]>) => {
                (state.loading = false), (state.posts = action.payload);
                state.error = '';
            }
        );
        builder.addCase(fetchPosts.rejected, (state, action) => {
            (state.loading = false),
                (state.error = action.error.message || 'Something happened');
            state.posts = [];
        });
    },
});

export default getPostSlice.reducer;

export const { addPost } = getPostSlice.actions;
