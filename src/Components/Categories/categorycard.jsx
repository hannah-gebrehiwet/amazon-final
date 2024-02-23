import React from "react";
import classes from "./category.module.css";
import { Link } from "react-router-dom";
function categorycard({ data }) {
	console.log(data)
	return (
		<div className={classes?.category}>
			<Link to={`/category/${data.name}`}>
				<span>
                   <h2 className="font-bold">{data.title}</h2>
				</span>
                <img src={data.imgLink}  alt="" />
				<p  className={classes.shop}> shop now</p>
			</Link>
		</div>
	);
}

export default categorycard;
