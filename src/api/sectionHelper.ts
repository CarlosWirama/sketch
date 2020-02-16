import wtf from 'wtf_wikipedia';
import Form from '../common/constants/Form';

export function getSection(parsedWiki: wtf.Document, sectionName: string, form?: Form) {
  const section = parsedWiki.sections(sectionName);
  if (!section) return [];
  let { templates } = section.json() as any;
  let iterateSectionIndex = section.index() || 0;
  while (!templates) {
    iterateSectionIndex++;
    const nextSection = parsedWiki.sections(iterateSectionIndex);
    if (form === Form.default || nextSection.title().includes(`${form}`)) {
      templates = (nextSection.json() as any).templates;
    }
  }
  return templates;
}
