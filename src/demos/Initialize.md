
### Initialize Catalog ###

Resource IDs are:
- 'ta': Translation Academy (Markdown)
- 'tw': Translation Words (Markdown)
- 'twl': Translation Words List (TSV)
- 'tn': Translation Notes (TSV with embedded Markdown)
- 'tq': Translation Questions (TSV)
- 'obs': Open Bible Stories (OBS) (Markdown)
- 'obs-tq': OBS Translation Questions (TSV)
- 'obs-tn': OBS Translation Notes (TSV with embedded Markdown) 
- 'obs-sn': OBS Study Notes (TSV with embedded Markdown)
- 'obs-sq': OBS Study Questions (TSV)

Notes:
1. In this component `resources` is a comma delimited list of resource IDs. 
However, the core `initializeCatalog` function takes an array of resource IDs.
1. May have to pass in a tag... since for multiple resources if stage is not prod,
then that will yield an ambiguous number of candidate releases that could be intended.

```js
<Initialize owner='unfoldingword' language='en' resources='twl,tn' stage='prod' />
```


