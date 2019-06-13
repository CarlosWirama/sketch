import { fetchAndParseWiki } from '../apiHelper';

export default async function getMoveDetail(moveName) {
  const parsed = await fetchAndParseWiki({
    page: moveName,
  });
  console.log(parsed);
}
