import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactJson from 'react-json-view'; 

import {searchCatalogNext} from '../core/dcsApis'

type SearchProps = {
  server?: string,
  owner?: string,
  language?: string,
  resource?:  string,
  stage?: string,
  includeHistory?: Boolean,
}

export const Search = ({ owner, language, resource, stage, includeHistory,
} :SearchProps) => {
    const [value, setValue] = useState(<CircularProgress />);
    useEffect( () => {
      const fetchData = async () => {
        let value;
        try {
          value = await searchCatalogNext(owner,language,resource,stage,includeHistory)
        } catch (err) {
          value = JSON.parse(`{"Error": "${err}"}`)
        }
        setValue(
          <ReactJson src={value} />
        )
      };
      fetchData();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps
    // the parameter [] allows the effect to skip if value unchanged
    // an empty [] will only update on mount of component
    return (
      <div>
        {value}
      </div>
    );
  };
  
  export default Search;