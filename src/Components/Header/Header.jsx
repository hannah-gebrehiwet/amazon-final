import React from "react";
import { useState } from "react";
import classes from "./Header.module.css";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../../Components/Dataprovider/Dataprovider";
import { useContext } from "react";
import { auth } from "../../utility/firebase";

function Header() {
	const [{ user, basket }, dispatch] = useContext(DataContext);
	const totalItem = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);
	// console.log(basket);
	return (
		<section className={classes.fixed}>
			<section>
				<div className={classes.header_container}>
					<div className={classes.logo_container}>
						<Link to="/">
							<img
								src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
								alt=""
							/>
						</Link>

						<div className={classes.delivery}>
							<span>
								<SlLocationPin />
							</span>
							<div>
								<p> Delivered to</p>
								<span>A.A,Ethiopia</span>
							</div>
						</div>
					</div>

					{/* search */}
					<div className={classes.search}>
						<select name="" id="">
							<option value="">All</option>
						</select>
						<input type="text" />
						<BsSearch size={25} />
					</div>

					{/* other section */}

					<div className={classes.order_container}>
						<Link to="/orders" className={classes.language}>
							<img
								src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg"
								alt=""
							/>
							<select name="" id="">
								<option value="">EN</option>
							</select>
						</Link>

						<Link to={!user && "/auth"}>
							<div>
								{user ? (
									<>
										<p>Hello {user?.email?.split("@")[0]}</p>
										<span
											onClick={() => {
												auth.signOut();
											}}
										>
											{" "}
											SignOut
										</span>
									</>
								) : (
									<>
										<p>Sign In</p>
										<span> Account & Lists</span>
									</>
								)}
							</div>
						</Link>
						{/* orders */}

						<Link to="/Orders">
							<p> returns</p>
							<span> & orders</span>
						</Link>

						{/* cart */}

						<Link to="/Cart" className={classes.cart}>
							<BiCart size={35} />
							<span>{totalItem}</span>
						</Link>
					</div>
				</div>
			</section>
			<LowerHeader />
		</section>
	);
}

export default Header;
