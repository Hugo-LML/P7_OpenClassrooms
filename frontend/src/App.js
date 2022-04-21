import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './features/user.slice';

const App = () => {
	const [uid, setUid] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}api/jwtid`, {withCredentials: true})
			.then((res) => {
				setUid(res.data.myID);
			})
			.catch((err) => console.log(err));

		if (uid) {
			axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials: true})
				.then((res) => {
					dispatch(getUser(res.data));
				})
				.catch((err) => console.log(err));
		}
	}, [uid, dispatch]);

	return (
		<UidContext.Provider value={uid}>
			<Routes />
		</UidContext.Provider>
	);
};

export default App;
