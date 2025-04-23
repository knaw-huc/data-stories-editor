import {API_URL} from "../misc/functions";

export const SettingsLoaderFunction = async (store)=> {

    const response = await fetch(API_URL + '/settings/' + store);
    return await response.json();
}