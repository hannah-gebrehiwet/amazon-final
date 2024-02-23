import axios from "axios";
const axiosInstance = axios.create({
	baseURL: "https://amazon-api-deploy-qtr4.onrender.com/"
	
});
export { axiosInstance };
