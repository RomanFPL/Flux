import axios from "axios";
import { Configuration } from "./openApi";

// TODO move it later to .env
const _base_url = process.env.NEXT_PUBLIC_DB_URL || "https://fleetmanagerbackapi.azurewebsites.net";

export const apiConfig = new Configuration({
    basePath: _base_url
});

const apiClient = axios.create({
    baseURL: apiConfig.basePath
});

export default apiClient;
