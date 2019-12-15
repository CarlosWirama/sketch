import { fetchAndParseWiki } from '../apiHelper';

export default async function getAbilityDetail(abilityName: string) {
  return await fetchAndParseWiki({
    page: `${abilityName}_(Ability)`,
  });
}

export async function getAbilityDescription(abilityName: string) {
  const parsed = await getAbilityDetail(abilityName);
  let abilitySummary = parsed
    .sections('').templates(0) as SummaryTemplate;
  if (abilitySummary.template !== 'abilityinfobox') {
    abilitySummary = parsed
    .sections('').templates(1) as SummaryTemplate;
  }
  const description = abilitySummary.text8
  if (description) return description;
  console.error('failed to fetch ability description');
  console.error(parsed.sections());
  throw new Error('failed to fetch ability description');
}

interface SummaryTemplate {
  colorscheme: string;
  gen: string;
  jpname: string;
  jptrans: string;
  jptranslit: string;
  name: string;
  template: string;
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text5?: string;
  text6?: string;
  text7?: string;
  text8: string;
}
