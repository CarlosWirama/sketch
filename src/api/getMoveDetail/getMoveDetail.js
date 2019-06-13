import { fetchAndParseWiki } from '../apiHelper';

export default async function getMoveDetail(moveName) {
  return await fetchAndParseWiki({
    page: `${moveName} (move)`,
  });
}

export async function getMoveDescription(moveName) {
  const parsed = await getMoveDetail(moveName);
  const arrayOfDescriptions = parsed.sections('Description').templates();
  const latestDescriptionObj = arrayOfDescriptions[arrayOfDescriptions.length - 2];
  const description = latestDescriptionObj.list[1];
  return description;
}
