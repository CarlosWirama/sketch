import { fetchAndParseWiki } from '../apiHelper';

export default async function getMoveDetail(moveName: string) {
  return await fetchAndParseWiki({
    page: `${moveName} (move)`,
  });
}

export async function getMoveDescription(moveName: string) {
  const parsed = await getMoveDetail(moveName);
  const arrayOfDescriptions = parsed
    .sections('Description').templates() as DescriptionTemplate[];
  const latestDescriptionObj =
    arrayOfDescriptions[arrayOfDescriptions.length - 2];
  const description = latestDescriptionObj.list[1];
  return description;
}

interface DescriptionTemplate {
  list: string[];
}
