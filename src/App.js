import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Routing from "./Router.jsx";
import { Type } from "./utility/action.type";
import { auth } from "./utility/firebase.js";
import { DataContext } from "./Components/Dataprovider/Dataprovider.jsx";
function App() {
	// const [count, setCount] = useState(0);
	const [{ user }, dispatch] = useContext(DataContext);
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// console.log(authUser);
				dispatch({
					type: Type.SET_USER,
					user: authUser,
				});

			} else {
				dispatch({
					type: Type.SET_USER,
					user: null,
				});
			}
		});
	}, []);

	return (
		<>
			<Routing />
		</>
	);
}

export default App;
