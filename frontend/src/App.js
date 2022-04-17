import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UidContext } from './components/AppContext';
import axios from 'axios';

const App = () => {
	const [uid, setUid] = useState('');

	useEffect(() => {
		const fetchToken = async () => {
			await axios.get(`${process.env.REACT_APP_API_URL}api/jwtid`, {withCredentials: true})
				.then((res) => {
					console.log(res);
					setUid(res.data);
				})
				.catch((err) => console.log('No token'));
		};
		fetchToken();
	}, []);

	return (
		<UidContext.Provider value={uid}>
			<Routes />
		</UidContext.Provider>
	);
};

export default App;
