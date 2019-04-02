import { filterAutocomplete } from './filter';

describe('filterAutocomplete', () => {
  const list = [
    'bulbasaur',
    'ivysaur',
    'venusaur',
    'charmander',
    'charmeleon',
    'machamp',
  ];
  it('should filter from the beginning of sentences', () => {
    const input = 'charm';
    const filteredList = filterAutocomplete(list, input);
    const expectedFilteredList = [
      'charmander',
      'charmeleon',
    ]
    expect(filteredList).toEqual(expectedFilteredList);
  });

  it('should filter from the middle of sentences', () => {
    const input = 'cha';
    const filteredList = filterAutocomplete(list, input);
    const expectedFilteredList = [
      'charmander',
      'charmeleon',
      'machamp',
    ]
    expect(filteredList).toEqual(expectedFilteredList);
  });

  it('should filter from the end of sentences', () => {
    const input = 'saur';
    const filteredList = filterAutocomplete(list, input);
    const expectedFilteredList = [
      'bulbasaur',
      'ivysaur',
      'venusaur',
    ]
    expect(filteredList).toEqual(expectedFilteredList);
  });

  it('should trim input and show the same result despite of the blank spaces', () => {
    const expectedFilteredList = [
      'charmander',
      'charmeleon',
      'machamp',
    ]
    let input = 'cha ';
    let filteredList = filterAutocomplete(list, input);
    expect(filteredList).toEqual(expectedFilteredList);
    input = '  cha';
    filteredList = filterAutocomplete(list, input);
    expect(filteredList).toEqual(expectedFilteredList);
    input = ' cha   ';
    filteredList = filterAutocomplete(list, input);
    expect(filteredList).toEqual(expectedFilteredList);
  });

  it('should show all by default when isShowingAllByDefault === true', () => {
    const isShowingAllByDefault = true;
    let input = '';
    let filteredList = filterAutocomplete(list, input, isShowingAllByDefault);
    expect(filteredList).toEqual(list);
    input = '  ';
    filteredList = filterAutocomplete(list, input, isShowingAllByDefault);
    expect(filteredList).toEqual(list);
  });

  it('should use getItemValue for each list item', () => {
    const getItemValue = jest.fn(() => 'a');
    const input = 'a';
    filterAutocomplete(list, input, true, getItemValue);
    expect(getItemValue).toBeCalledTimes(list.length);
  });
});
