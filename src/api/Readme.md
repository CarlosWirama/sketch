# Debug Responses

## Test Parsed Response
- Open `./wikitextMock.txt`.
- Open `https://observablehq.com/@spencermountain/wtf_wikipedia`, paste the value inside the editor e.g. `doc = await wtf("{{Pok\u00e9monPrevNext/Head|type=Gr...`, then in another section of the editor, run `doc.section('').json()`.

## Test Bulbapedia API Response
- Instead of using `wikitextMock.txt` in Test Parsed Response above, open `https://m.bulbapedia.bulbagarden.net/w/api.php?action=parse&format=json&redirects=1&origin=*&prop=wikitext&page=Bulbasaur` and copy the value inside wikitext['*'].
- Parse using `wtf_wikipedia`.
