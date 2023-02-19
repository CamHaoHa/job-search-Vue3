import axios from "axios";

const getJobs = () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const response = await.axios.get(`${baseUrl}/jobs`);
  this.jo;
};

export default getJobs();
