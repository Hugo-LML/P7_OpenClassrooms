import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getLikes, getPosts } from '../features/post.slice';
import Card from './Post/Card';
import { getUsers } from '../features/user.slice';
import { getComments } from '../features/comment.slice';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    // const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const postData = useSelector(state => state.post.getPostsValue);

    // const loadMore = () => {
    //     if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
    //         setLoadPost(true);
    //     }
    // }

    useEffect(() => {
        if (loadPost) {
            axios.get(`${process.env.REACT_APP_API_URL}api/post`, {withCredentials: true})
                .then(res => {
                    // const postToDispatch = res.data.slice(0, count);
                    dispatch(getPosts(res.data));
                    setLoadPost(false);
                    // setCount(count + 5);
                })
                .catch(err => console.log(err));
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
            
            axios.get(`${process.env.REACT_APP_API_URL}api/post/likeUnlike`, {withCredentials: true})
            .then(res => {
                dispatch(getLikes(res.data));
            })
            .catch(err => console.log(err));
            
            // window.addEventListener('scroll', loadMore);
            // return () => window.removeEventListener('scroll', loadMore);

        }, [loadPost, dispatch, /*count*/]);
        
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