
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/cart/Cart";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Results from "./Pages/Results/Results";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/protectedRoute/protectedRoute";

const stripePromise = loadStripe(
	"pk_test_51OjiNPCbf6EHuIMm6IuSYS8GRjZI1czpCtJXmVlXIBAUFpTaI7iQF6c5R752tr8azaWeAnTDndNfrb9txUBxIeQx00zYOyklwl"
);

function Routing() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/auth" element={<Auth />} />
				<Route
					path="/payments"
					element={
						<ProtectedRoute
							msg={"you must login to pay"}
							redirect={"/payments"}
						>
							<Elements stripe={stripePromise}>
								<Payment />
							</Elements>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/Orders"
					element={
						<ProtectedRoute
							msg={"you must login to access your orders"}
							redirect={"/Orders"}
						>
							<Orders />
						</ProtectedRoute>
					}
				/>
				<Route path="/category/:categoryName" element={<Results />} />
				<Route path="/products/:productId" element={<ProductDetail />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</Router>
	);
}

export default Routing;