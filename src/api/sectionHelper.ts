import wtf from 'wtf_wikipedia';
import Form from '../common/constants/Form';

export function getSection(parsedWiki: wtf.Document, section: string, form?: Form) {
  let { templates } = parsedWiki.sections(section).json() as any;
  let nextSectionIndex = parsedWiki.sections(section).index() || 0;
  while (!templates) {
    nextSectionIndex++;
    const nextSection = parsedWiki.sections(nextSectionIndex);
    if (form === Form.default || nextSection.title().includes(`${form}`)) {
      templates = (nextSection.json() as any).templates;
    }
  }
  return templates;
}
