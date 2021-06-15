import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {initializeCatalog} from '../core/initialize'

type InitializeProps = {
  /** Name of organization or owner */
  owner?: string,
  /** Language ID (see https://td.unfoldingword.org/uw/languages/) */
  language?: string,
  /** Resources codes are: 'ta', 'tw', 'twl', 'tn', 'tq', 'obs', 'obs-tq', 'obs-tn', 'obs-sn', 'obs-sq' */
  resources?:  string,
  /** Stages in one of: 'prod' (default), 'latest', 'pre-prod', 'draft' */
  stage?: string,
}

export const Initialize = ({ owner, language, resources, stage
} :InitializeProps) => {
  const [value, setValue] = useState(<CircularProgress />);
  useEffect( () => {
    const fetchData = async () => {
      const _resources :string[] = resources.split(',')
      let value = await initializeCatalog({owner,language,resources:_resources,stage})
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


