import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { string, TypeOf, z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createPost } from '../../features/createPost';
import { addPost, fetchPosts } from '../../features/getPost';
import Post from '../../types/post';

const createPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    message: z.string().min(1, 'Message is required'),
    creator: z.string().min(1, 'Creator is required'),
    tags: z.string().transform((val) => val.split(' ')),
    selectedFile: z
        .any()
        .refine((val) => val && val.length > 0, 'Please select a file'),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreatePostInput>({ resolver: zodResolver(createPostSchema) });

    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.createPost);

    //TODO: Add some error popup when creation of post has failed

    const onSubmit = async (val: CreatePostInput) => {
        //convert the image file to a base64 url
        const reader = new FileReader();
        reader.onloadend = async () => {
            val.selectedFile = reader.result;
            dispatch(addPost(val as Post));
            dispatch(createPost(val));
            reset();
        };

        reader.readAsDataURL(val.selectedFile[0]);
    };

    return (
        <div className="w-1/4">
            <form
                className="flex flex-col space-y-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col">
                    <label htmlFor="creator" className="text-lg">
                        Creator
                    </label>
                    <input
                        type="text"
                        id="creator"
                        placeholder="John Doe"
                        className="bg-white rounded-md mt-1 px-3 py-1.5"
                        {...register('creator')}
                    />
                    <p className="text-red-400 text-sm">
                        {errors.creator?.message}
                    </p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter your title here"
                        className="bg-white rounded-md mt-1 px-3 py-1.5"
                        {...register('title')}
                    />
                    <p className="text-red-400 text-sm">
                        {errors.title?.message}
                    </p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="message" className="text-lg">
                        Caption
                    </label>
                    <input
                        type="text"
                        id="message"
                        placeholder="Enter your message here"
                        className="bg-white rounded-md mt-1 px-3 py-1.5"
                        {...register('message')}
                    />
                    <p className="text-red-400 text-sm">
                        {errors.message?.message}
                    </p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="tags" className="text-lg">
                        Tags
                    </label>
                    <input
                        type="text"
                        id="tags"
                        placeholder="add, some, tags"
                        className="bg-white rounded-md mt-1 px-3 py-1.5"
                        {...register('tags')}
                    />
                    <p className="text-red-400 text-sm">
                        {errors.tags?.message}
                    </p>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="selectedFile" className="text-lg">
                        Upload an Image
                    </label>
                    <input
                        type="file"
                        id="selectedFile"
                        placeholder=""
                        className="mt-1"
                        {...register('selectedFile')}
                    />
                    <p className="text-red-400 text-sm">
                        {errors.selectedFile?.message as string}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center">
                    <button
                        type="submit"
                        className="font-semibold  bg-blue-500 text-white rounded-md px-5 py-2.5"
                    >
                        Upload
                    </button>
                    <button
                        type="reset"
                        onClick={() => reset()}
                        className="font-semibold  bg-white text-blue-500 rounded-md px-5 py-2.5"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
