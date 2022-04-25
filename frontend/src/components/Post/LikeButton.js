import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import axios from 'axios';
import { setLike } from '../../features/post.slice';

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const likesData = useSelector(state => state.post.getLikesValue);
    const likeData = useSelector(state => state.post.setLikeValue);

    const like = () => {
        axios.patch(`${process.env.REACT_APP_API_URL}api/post/likeUnlike/${post.id}`, {
            liker_id: uid
        },
        {withCredentials: true})
            .then(res => {
                dispatch(setLike(post.id)); // CHECK FS VIDEO
                // if (likeData === false) {
                //     dispatch(setLike(true));
                // }
                // else if (likeData === true) {
                //     dispatch(setLike(false));
                // }
            })
            .catch(err => console.log(err));
    }

    const unlike = () => {

    }

    useEffect(() => {
        likesData.forEach((like) => {
            if (like.liker_id === uid && like.postLiked_id === post.id) {
                setLiked(true);
            }
        });
    }, [uid, likesData, post.id, liked]);

    return (
        <>
            {liked === false ? (
                <img src="./uploads/icons/thumbs-up-regular.svg" alt="thumbs up" onClick={like}/>
            ) : (
                <img src="./uploads/icons/thumbs-up-solid.svg" alt="thumbs up" onClick={like}/>
            )}
        </>
    );
};

export default LikeButton;