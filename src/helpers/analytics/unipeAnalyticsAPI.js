import axios from "axios";
import { ANALYTICS_URL } from "../../services/constants";

const UnipeAnalyticsAPI = axios.create({
    baseURL: ANALYTICS_URL,
    timeout: 300,
    headers: {
      'Content-Type': "application/json"
      //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    }
  });

export default UnipeAnalyticsAPI;