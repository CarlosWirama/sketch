import Form from '../../common/constants/Form';

export function getSpeciesNameAndForm(urlName: string) {
  let [form, speciesName]: [Form, string] = [Form.default, urlName];
  if (urlName.includes('_')) {
    [form, speciesName] = urlName.split('_') as [Form, string];
  }
  return { speciesName, form };
}
