import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../features/user.slice';
import { UidContext } from '../AppContext';
import { timestampParser } from '../Utils';

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [img, setImg] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector(state => state.user.getUserValue);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);

    const handleImage = () => {

    }

    const handlePost = () => {

    }

    const cancelPost = () => {
        setMessage('');
        setImg('');
        setVideo('');
        setFile('');
    }

    useEffect(() => {
        if (uid) {
            axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials: true})
            	.then((res) => {
            		dispatch(getUser(res.data));
                    setIsLoading(false);
            	})
            	.catch((err) => console.log(err));
        }
    }, [uid, userData, dispatch])

    return (
        <div className='post-container'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <NavLink end to="/profil" className="user-info">
                        <img src={userData[0].image} alt="user-img" />
                        <p>{userData[0].pseudo}</p>
                    </NavLink>
                    <div className="form">
                        <textarea name='message' id='message' placeholder='Quoi de neuf ?'
                        onChange={e => setMessage(e.target.value)} value={message} />
                        {message || img || video.length > 20 ? (
                            <div className="prev-container">
                                <div className="prev-header">
                                    <div className="info-poster">
                                        <img src={userData[0].image} alt="user-pic" />
                                        <p>{userData[0].pseudo}</p>
                                    </div>
                                    <p>{timestampParser(Date.now())}</p>
                                </div>
                                <div className="prev-content">
                                    <p>{message}</p>
                                    <img src={img} alt="" />
                                    {video && (
                                        <iframe className='video'
                                            width="500"
                                            height="300"
                                            src={(video).replace("watch?v=", "embed/")}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={video}
                                        ></iframe>
                                    )}
                                </div>
                            </div>
                        ) : null}
                        <div className="form-footer">
                            <div className="img-icon">
                                {video === '' && (
                                    <>
                                        <img src="./uploads/icons/file-image-solid.svg" alt="file-icon" />
                                        <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png"
                                        onChange={e => handleImage(e)} />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                                )}
                            </div>
                            <div className="buttons">
                                {message || img || video.length > 20 ? (
                                    <>
                                        <button onClick={cancelPost}>Annuler</button>
                                        <button onClick={handlePost}>Envoyer</button>
                                    </>
                                ) : <button onClick={handlePost}>Envoyer</button>}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;