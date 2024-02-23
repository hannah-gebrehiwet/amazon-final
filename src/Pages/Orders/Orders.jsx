import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import classes from "./Orders.module.css"
import { db } from "../../utility/firebase";
import {DataContext} from "../../Components/Dataprovider/Dataprovider"
import ProductCard from '../../Components/Product/ProductCard';
function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setorders] = useState([]);
  
  useEffect(() => { 
    if (user) {
      db.collection("users").doc(user.uid).collection("orders").orderBy("created", "desc").onSnapshot((snapshot) => {
    
        setorders(
  snapshot.docs?.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }))
);
      });
    } else {
      setorders([]);
    
}
  }, []);
  return (
		<Layout>
			<section className={classes.container}>
				<div className={classes.orders_container}>
          <h2> Your orders</h2>
          {orders?.length == 0 && <p style={{padding:"30px"}}> you dont have any orders yet</p>
             }
					<div>
						{orders?.map((eachOrder,i) => {
              return (
								 <div key={i}>
									<hr />
									<p>Order Id:{eachOrder?.id}</p>
									{eachOrder?.data?.basket?.map((order) => {
										return (
											<ProductCard flex={true} product={order} key={order.id} />
											
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</Layout>
	);
}

export default Orders
