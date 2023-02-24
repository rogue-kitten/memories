import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CreatePostInput } from '../components/form/Form';

interface InitialState {
    loading: boolean;
    error: string;
    post: boolean;
}

const initialState: InitialState = {
    loading: false,
    error: '',
    post: false,
};

export const createPost = createAsyncThunk(
    'createPost/createPost',
    (data: CreatePostInput) => {
        console.log(data);
        axios.post('http://localhost:1337/api/posts', data).then((resp) => {
            return resp.data;
        });
    }
);

const createPostReducer = createSlice({
    name: 'createPost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createPost.fulfilled, (state, action) => {
            (state.loading = false), (state.error = ''), (state.post = true);
        });
        builder.addCase(createPost.rejected, (state, action) => {
            (state.loading = false),
                (state.post = false),
                (state.error = action.error.message || 'Something happened');
        });
    },
});

export default createPostReducer.reducer;
