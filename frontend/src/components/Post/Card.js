import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getUser, getUsers } from '../../features/user.slice';
import { dateParser } from '../Utils';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);

    const userData = useSelector(state => state.user.getUserValue);
    const usersData = useSelector(state => state.user.getUsersValue);
    const commentsData = useSelector(state => state.comment.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (usersData !== null) {
            setIsLoading(false);
        }
    }, [usersData])
    
    return (
        <div className='card'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="card__header">
                        <div className='card__header__info-poster'>
                            <img src={usersData !== null &&
                                usersData.map((user) => {
                                    if (user.id === post.poster_id) return user.image;
                                    else return null;
                                }).join("")
                            } alt="user-pic" />
                            <p>
                                {usersData !== null &&
                                    usersData.map((user) => {
                                        if (user.id === post.poster_id) return user.pseudo;
                                        else return null;
                                    }).join("")}
                            </p>
                        </div>
                        <p className='card__header__post-date'>{dateParser(post.date)}</p>
                    </div>
                    <div className="card__content">
                        <p className='card__content__text'>{post.message}</p>
                        {post.image !== "No img" &&
                            <img className='card__content__img' src={post.image} alt="card-pic" />
                        }
                        {post.video !== "No video" &&
                            <iframe className='card__content__video'
                                width="500"
                                height="300"
                                src={(post.video).replace("watch?v=", "embed/")}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                          ></iframe>
                        }
                    </div>
                    <div className="card__footer">
                        <div className="card__footer__likes">
                            <img src="./uploads/icons/thumbs-up-regular.svg" alt="thumbs up" />
                            
                        </div>
                        <div className="card__footer_comments">
                            <img src="./uploads/icons/message-regular.svg" alt="message" />
                            {commentsData.map(comment => {
                                if (comment.postCommented_id === post.id) return comment;
                                else return null;
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;