# english-noun

English nouns selected from WordNet-style lemmas by frequency.

```sh
npm install english-noun
```

```js
import { noun, nouns } from 'english-noun'

noun()                                    // random noun
noun({ top: 0.1 })                        // top 10%
noun({ plural: true, case: 'title' })      // plural + Title Case
noun({ article: true, possessive: true })   // a/an + possessive
nouns(5, { minLength: 4, maxLength: 6 })   // 5 distinct nouns
```

## Options
Common: `top`, `even`, `length`, `minLength`, `maxLength`, `startsWith`, `endsWith`, `random`.  
English-specific: `plural`, `case`, `article`, `possessive`.

## Tiers
`english-noun`, `english-noun/top50`, `english-noun/top25`, `english-noun/top10`.

## Data
- Dictionary: WordNet-style noun lemmas
- Frequency: Wikipedia-based counts
- Bundled data is CC BY-SA 4.0; code is MIT.
```
