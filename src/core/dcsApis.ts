import Path from 'path';
import localforage from 'localforage';
import { setup } from 'axios-cache-adapter';
import {APIVERSION} from './defaults'
import {SERVER_URL} from './defaults'


// caches http file fetches done by fetchFileFromServer()
const cacheStore = localforage.createInstance({
  driver: [localforage.INDEXEDDB],
  name: 'web-cache',
});


// API for http requests
const Door43Api = setup({
  baseURL: SERVER_URL+"/",
  cache: {
    store: cacheStore,
    maxAge: 5 * 60 * 1000, // 5-minutes
    exclude: { query: false },
    key: req => {
      // if (req.params) debugger
      let serialized = req.params instanceof URLSearchParams ?
        req.params.toString() : JSON.stringify(req.params) || '';
      return req.url + serialized;
    },
  },
});



export async function searchCatalogNext( owner :string, language :string, resource :string, stage :string, includeHistory :Boolean) :Promise<string> {
  //https://qa.door43.org/api/catalog/v5/search/unfoldingword/en_twl?stage=prod&includeHistory=true  
  let uri = Path.join(APIVERSION,'search',owner,language+"_"+resource);
  uri += `?stage=${stage}&includeHistory=${includeHistory}`
  console.log("uri=", uri);
  let data;
  try {
    let res = await Door43Api.get(uri, {})
    console.log("res=",res)
    data = res.data
  } catch (error) {
    throw Error("searchCatalogNext() Error:"+error)
  }
  return data
}

