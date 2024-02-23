import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/Dataprovider/Dataprovider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Currencyformat from "../../Components/CurrencyFormat/Currencyformat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utility/action.type";

function Payment() {
	const [{ user, basket }, dispatch] = useContext(DataContext);
	const totalItem = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);
	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);
	const [processing, setProcessing] = useState(false);

	const [carderror, setCarderror] = useState("");
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const handleChange = (e) => {
		e?.error?.message ? setCarderror(e?.error?.message) : setCarderror("");
	};
	const handlepayment = async (e) => {
		e.preventDefault();

		try {
			setProcessing(true);
			const response = await axiosInstance({
				method: "POST",
				url: `/payment/create?total=${total * 100}`,
			});
			console.log(response.data);
			const clientSecret = response?.data?.clientSecret;
			const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});
			// const pa = await stripe.confirmCardPayment(clientsecret, {
			// 	payment_method: {
			// 		card: elements.getElement(CardElement),
			// 	},
			// });

			await db
				.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.doc(paymentIntent.id)
				.set({
					basket: basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created,
				});

			dispatch({ type: Type.EMPTY_BASKET });

			// console.log(confirmation);

			// setprocessing(false);
			// navigate("/orders", { state: { msg: "you have placed a new order" } })

			setProcessing(false);
			navigate("/Orders", { state: { msg: "you have placed new Order" } });

		} catch (error) {
			console.log(error);
			setProcessing(false);
		}
	};
	return (
		<Layout>
			<div className={classes.pmt_hdr}>Check out ({totalItem}) items</div>
			<section className={classes.Payment}>
				<div className={classes.flex}>
					<h3>Delivery address</h3>
					<div>{user?.email}</div>
					<div>123 ABC street</div>
					<div>Addis Ababa,ET</div>
				</div>
				<hr />
				<div className={classes.flex}>
					<div>
						<h3>Review Items And Delivery</h3>
					</div>
					<div>
						{basket?.map((item) => (
							<ProductCard product={item} flex={true} />
						))}
					</div>
				</div>
			</section>
			<hr />

			<div className={classes.flex}>
				<h3>Payment Methods</h3>
				<div className={classes.cart_cs}>
					<div className={classes.payment_details}>
						<form onSubmit={handlepayment}>
							{carderror && <small> {carderror}</small>}
							<CardElement onChange={handleChange} />
							<div className={classes.payment_price}>
								<div>
									<span>
										Total Order <Currencyformat amount={total} />
									</span>
								</div>
								<button type="submit">
									{processing ? (
										<div className={classes.loading}>
											<ClipLoader color="gray " size={12}></ClipLoader>
											<p>please wait...</p>
										</div>
									) : (
										"pay now"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Payment;
