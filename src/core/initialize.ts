import {OWNER} from './defaults'
import {LANGUAGE} from './defaults'
import {RESOURCES} from './defaults'
import {STAGE} from './defaults'

export type InitializeProps = {
  owner?: string,
  language?: string,
  resources?:  string[],
  stage?: string,
}

export async function initializeCatalog({
  owner, language, resources, stage
} :InitializeProps) :Promise<string> {
  /*
    Note: there are lots of ways to set defaults, but the
    simplest is deprecated. So here we first ensure that 
    any parameters that are not passed are set to their
    defaults from "./defaults.ts"
  */
  const _owner  = owner  ? owner  : OWNER
  const _lang   = language ? language : LANGUAGE
  let _resources = resources ? resources : RESOURCES
  if ( _resources.length === 0 ) { 
    _resources = RESOURCES
  }
  const _stage  = stage ? stage : STAGE

  /* end set defaults */


  /* Loop over resources and initalize the local copy of the catalog */
  let value = ""
  for (let i=0; i<_resources.length; i++) {
    const testing = await initalizeCatalogResources(_owner,_lang,_resources[i],_stage)
    value += testing + "\n"
    console.log("value=",value)
  } 

  return value

}

async function initalizeCatalogResources(
  owner :string,
  language :string, 
  resource :string, 
  stage: string) : Promise<string> {
  return `${owner}, ${language}, ${resource}, ${stage}`
}

