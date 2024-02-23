import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import classes from'./Header.module.css'
function LowerHeader() {
  return (
		<div className={classes.lower_container}>
			<ul>
				<li>
					<AiOutlineMenu />
					<p>All</p>
				</li>
				<li>Today's Deals</li>

				<li>Registry</li>
				<li> Gift Cards</li>
				<li>customer service</li>
				<li>sell</li>
			</ul>
		</div>
	);
}

export default LowerHeader
