# Colorado Communications Catalog data

The python modules in this directory extract Ben Baker KB0UBZ's Excel files and
load the data into MongoDB.

```bash
find '/path/to/ARES Communication ' -name "*217*.xlsx" -print0 | xargs -0 -I {} python3 -m extractor '{}'
```
