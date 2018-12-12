const DEV_MODE = 1
const PRODUCT_MODE = 2

const CONFIG_MODE = PRODUCT_MODE

export const SERVICE_API_URL = (
    CONFIG_MODE==DEV_MODE?
    "http://192.168.1.112:8080":
    "http://www.meridians2.com:7000"       //To do: replace with real service url
);
export const SERVICE_FILE_URL = (
    CONFIG_MODE==DEV_MODE?
    "http://192.168.1.112:8080":
    "http://www.meridians2.com:7000"       //To do: replace with real service url
);
