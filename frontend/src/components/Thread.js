import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getPosts } from '../features/post.slice';
import Card from './Post/Card';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const postData = useSelector(state => state.post.value);

    useEffect(() => {
        if (loadPost) {
            axios.get(`${process.env.REACT_APP_API_URL}api/post`, {withCredentials: true})
                .then(res => {
                    dispatch(getPosts(res.data));
                })
                .catch(err => console.log(err));
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);
    
    return (
        <div>
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