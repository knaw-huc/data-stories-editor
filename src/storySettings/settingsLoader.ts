import {API_URL} from "../misc/functions";

export const settingsLoaderFunction = async (store)=> {

    const response = await fetch(API_URL + '/settings/' + store);
    return await response.json();
}