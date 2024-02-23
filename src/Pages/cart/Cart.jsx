
import React, { useContext } from "react";
import classes from "./Cart.module.css";

import { DataContext } from "../../Components/Dataprovider/Dataprovider";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/Product/ProductCard"
import CurrencyFormat from "../../Components/CurrencyFormat/Currencyformat";
import { Link } from "react-router-dom";
import { Type } from "../../utility/action.type";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

function Cart() {
	const [{ basket, user }, dispatch] = useContext(DataContext);
	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);
	const increment = (item) => {
		dispatch({
			type: Type.ADD_TO_BASKET,
			item,
		});
	};
	const decrement = (item) => {
		dispatch({
			type: Type.REMOVE_FROM_BASKET,
			
		});
	};

	return (
		<Layout>
			<div>
				<section className={classes.container}>
					<div className={classes.cart_container}>
						<h2>Hello</h2>
						<h3>Your shopping basket</h3>
						<hr />
						{basket.length == 0 ? (
							<p>OPS ! Your Basket is Empty.</p>
						) : (
							basket?.map((item, i) => {
								return (
									<section className={classes.cart_product}>
										<ProductCard
											key={i}
											product={item}
											renderDesc={true}
											flex={true}
										/>
										<div className={classes.btn_container}>
											<button
												className={classes.btn}
												onClick={() => increment(item)}
											>
												<MdKeyboardArrowUp size={30} />
											</button>
											<span>{item.amount}</span>
											<button
												className={classes.btn}
												onClick={() => decrement(item.id)}
											>
												<MdKeyboardArrowDown size={30} />
											</button>
										</div>
									</section>
								);
							})
						)}
					</div>
					{basket?.length !== 0 && (
						<div className={classes.subtotal}>
							<div>
								<p>Subtotal({basket?.length}items)</p>
								<CurrencyFormat amount={total} />
							</div>
							<span>
								<input type="checkbox" />
								<small>This order contains a gift</small>
							</span>
							<Link to="/payments">Continue to checkout</Link>
						</div>
					)}
				</section>
			</div>
		</Layout>
	);
}

export default Cart;
