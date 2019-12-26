import { fetchAndParseWiki } from '../apiHelper';

export default async function getAbilityDetail(abilityName: string) {
  return await fetchAndParseWiki({
    page: `${abilityName}_(Ability)`,
  });
}

export async function getAbilityDescription(abilityName: string) {
  const parsed = await getAbilityDetail(abilityName);
  const infoboxSection = parsed.sections('');
  let abilitySummary: SummaryTemplate;
  let templateIndex = 0;

  // search for abilityinfobox temmplate
  do {
    abilitySummary = infoboxSection.templates(templateIndex++) as SummaryTemplate;
  } while (abilitySummary.template !== 'abilityinfobox');

  const GENERATION: number = 8;
  const descriptionAttribute = `text${GENERATION}` as keyof SummaryTemplate;
  const description = abilitySummary[descriptionAttribute];
  if (description) return description;
  console.error('failed to fetch ability description');
  console.error(infoboxSection.templates());
  throw new Error('failed to fetch ability description');
}

interface SummaryTemplate {
  colorscheme: string;
  gen: string;
  jpname: string;
  jptrans: string;
  jptranslit: string;
  name: string;
  template: 'abilityinfobox';
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text5?: string;
  text6?: string;
  text7?: string;
  text8: string;
}
