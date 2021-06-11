import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as init from '../core/initialize'

type InitializeProps = {
  server?: string,
  owner?: string,
  language?: string,
  resources?:  string[],
  stage?: string,
}

export const Initialize = ({ server, owner, language, resources, stage
} :InitializeProps) => {
    const [value, setValue] = useState(<CircularProgress />);
    useEffect( () => {
      const fetchData = async () => {
        let value = await init.default({server,owner,language,resources,stage})
        setValue(
          <pre>{value}</pre>
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
  
  export default Initialize;