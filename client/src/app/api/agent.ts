import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 100))

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (respose: AxiosResponse) => respose.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status)
    {
        case 400:
            toast.error(data.title)
            break
        case 401:
            toast.error(data.title)
            break
        case 404:
            toast.error(data.title)
            break
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break
        default:
            break
    }
    return Promise.reject(error.response)
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const agent = {
    Catalog
}

export default agent;