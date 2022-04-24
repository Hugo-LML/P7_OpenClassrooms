import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getPosts } from '../features/post.slice';
import Card from './Post/Card';
import { getUsers } from '../features/user.slice';
import { getComments } from '../features/comment.slice';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const postData = useSelector(state => state.post.getPostsValue);

    useEffect(() => {
        if (loadPost) {
            axios.get(`${process.env.REACT_APP_API_URL}api/post`, {withCredentials: true})
                .then(res => {
                    dispatch(getPosts(res.data));
                })
                .catch(err => console.log(err));
            setLoadPost(false);
        }

        axios.get(`${process.env.REACT_APP_API_URL}api/user`, {withCredentials: true})
            .then(res => {
                dispatch(getUsers(res.data));
            })
            .catch(err => console.log(err));

        axios.get(`${process.env.REACT_APP_API_URL}api/comment`, {withCredentials: true})
            .then(res => {
                dispatch(getComments(res.data));
            })
            .catch(err => console.log(err));

        axios.get(`${process.env.REACT_APP_API_URL}api/post/like`, {withCredentials: true})
            .then(res => {
                dispatch(getComments(res.data));
            })
            .catch(err => console.log(err));
    }, [loadPost, dispatch]);
    
    return (
        <div className='thread'>
            {!loadPost && postData !== null ? (
                postData.map(post => {
                    return <Card key={post.id} post={post} />;
                })
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Thread;