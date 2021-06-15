import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactJson from 'react-json-view'; 

import {tagsByRepo} from '../core/dcsApis'

type SearchProps = {
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
        let tags :string[]
        try {
          tags = await tagsByRepo(owner,language,resource)
          setValue(
            <ul>
              {
                tags.map((tag) => {
                  return (
                    <li key={tag}>
                      <pre>{tag}</pre>
                    </li>
                  )
                })
              }
            </ul>
          )
        } catch (err) {
          const _err = JSON.parse(`{"Error": "${err}"}`)
          setValue(
            <ReactJson src={_err} />
          )
        }
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