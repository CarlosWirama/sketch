import { buildQueryParams, getPokemonDetail } from '.';

describe('buildQueryParams function', () => {
  it('will build queryParams with only default parameter', () => {
    const params = {}
    const expected = `?action=parse&format=json&redirects=1;`
    const actual = buildQueryParams(params);
    expect(actual).toEqual(expected);
  });

  it('will build queryParams even without passing any params', () => {
    const expected = `?action=parse&format=json&redirects=1;`
    const actual = buildQueryParams();
    expect(actual).toEqual(expected);
  });

  it('will build queryParams with passed parameter', () => {
    const params = {
      section: 42,
      page: 'bulbasaur',
    }
    const expected = `?action=parse&format=json&redirects=1&section=42&page=bulbasaur`;
    const actual = buildQueryParams(params);
    expect(actual).toEqual(expected);
  });
});
