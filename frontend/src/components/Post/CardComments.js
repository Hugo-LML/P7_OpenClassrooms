import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import { dateParser } from '../Utils';

const CardComments = ({ post }) => {
    const [text, setText] = useState("");
    const uid = useContext(UidContext);
    const usersData = useSelector(state => state.user.getUsersValue);
    const commentsData = useSelector(state => state.comment.value);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();
        if (text) {
            // Coder ici come on big guy you're almost done
        }
    }

    return (
        <div className="comments-container">
            {commentsData.map(comment => {
                if (comment.postCommented_id === post.id) {
                    return (
                        <div className={comment.commenter_id === uid ?
                        'comment by-user' : 'comment'} key={comment.id}>
                            <div className="comment-header">
                                <div className="info-commenter">
                                    <img src={usersData !== null &&
                                        usersData.map((user) => {
                                            if (user.id === comment.commenter_id) return user.image;
                                            else return null;
                                        }).join("")
                                    } alt="user-pic" />
                                    <p>
                                        {usersData !== null &&
                                            usersData.map((user) => {
                                                if (user.id === comment.commenter_id) return user.pseudo;
                                                else return null;
                                            }).join("")}
                                    </p>
                                </div>
                                <p className='comment-date'>{dateParser(post.date)}</p>
                            </div>
                            <p>{comment.message}</p>
                        </div>
                    )
                }
                else return null;
            })}
            <form onSubmit={handleComment} className="comment-form">
                <input type="text" name="text"
                onChange={e => setText(e.target.value)} value={text} placeholder="Laisser un commentaire" />
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default CardComments;