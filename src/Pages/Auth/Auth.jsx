import React from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../utility/firebase";
import { DataContext } from "../../Components/Dataprovider/Dataprovider";
import { Type } from "../../utility/action.type";
import { ClipLoader } from "react-spinners";



function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setloading] = useState({
		signIn: false,
		signUp: false,
	});

	const [{ user }, dispatch] = useContext(DataContext);
	const navigate = useNavigate();
	const navStateData = useLocation();
	console.log(navStateData);
	const authHandler = async (e) => {
		e.preventDefault();
		// console.log(e.target.name);
		if (e.target.name === "signin") {
			setloading({ ...loading, signIn: true });
			signInWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setloading({ ...loading, signIn: false });
					navigate(navStateData?.state?.redirect || "/");
				})
				.catch((err) => {
					console.log(err.message);
					setError(err.message);
					setloading({ ...loading, signIn: false });
				});
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userInfo) => {
					setloading({ ...loading, signUp: true });
					dispatch({
						type: Type.SET_USER,
						user: userInfo.user,
					});
					setloading({ ...loading, signUp: false });
					navigate(navStateData?.state?.redirect || "/")
				})
				.catch((err) => {
					console.log(err);
					setError(err.message);
					setloading({ ...loading, signUp: false });
					navigate("/");
				});
		}
	};

	return (
		<section className={classes.login}>
			<Link to={"/"}>
				<img
					src="https://pngimg.com/uploads/amazon/small/amazon_PNG3.png"
					alt="logo"
				/>
			</Link>
			<div className={classes.login_container}>
				<h1>sign In</h1>
				{navStateData?.state?.msg && (
					<small
						style={{
							padding: "5px",
							textAlign: "center",
							color: "red",
							fontWeight: "bold",
						}}>
						{navStateData.state.msg}
					</small>
)}
				<form>
					<div className="">
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email "
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password "
						/>
					</div>
					<button
						type="submit"
						onClick={authHandler}
						name="signin"
						className={classes.sibut}
					>
						{loading.signIn ? (
							<ClipLoader color="#000" size={15}></ClipLoader>
						) : (
							"Sign In"
						)}
					</button>
				</form>
				<p>
					By signing up you hereby agree to AMAZON-CLONE-UNREAL terms and
					conditions.Please check our privacy policy,cookieand interest-based
					ads policy before sigining in.
				</p>

				<button
					type="submit"
					onClick={authHandler}
					name="signup"
					className={classes.button2}
				>
					{loading.signUp ? (
						<ClipLoader color="#000" size={15}></ClipLoader>
					) : (
						"Create New Amazon Account"
					)}
				</button>
				{error && (
					<small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
				)}
			</div>
		</section>
	);
}

export default Auth;
