import React from 'react';
import Layout from '../../Components/Layout/Layout';
import Carouseleffect from "../../Components/Carousel/carouseleffect";
import Category from "../../Components/Categories/Category";
import Products from "../../Components/Product/products"


function Landing() {
  return (
	  <Layout>
		  
			<Carouseleffect />
			<Category />
			<Products />
		</Layout>
	);
}

export default Landing
