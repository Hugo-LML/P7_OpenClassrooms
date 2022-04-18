import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UidContext } from './components/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.action';

const App = () => {
	const [uid, setUid] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchToken = async () => {
			await axios.get(`${process.env.REACT_APP_API_URL}api/jwtid`, {withCredentials: true})
				.then((res) => {
					setUid(res.data.myID);
				})
				.catch((err) => console.log(err));
		};
		fetchToken();

		if (uid) {
			dispatch(getUser(uid));
		}
	}, [uid, dispatch]);

	return (
		<UidContext.Provider value={uid}>
			<Routes />
		</UidContext.Provider>
	);
};

export default App;
