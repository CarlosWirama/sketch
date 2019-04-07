import { buildQueryParams } from './apiHelper';

describe('buildQueryParams', () => {
  it('will build queryParams with only default parameter', () => {
    const params = {}
    const expected = `origin=*&action=parse&format=json&redirects=1`;
    const actual = buildQueryParams(params);
    expect(actual).toEqual(expected);
  });

  it('will build queryParams even without passing any params', () => {
    const expected = `origin=*&action=parse&format=json&redirects=1`;
    const actual = buildQueryParams();
    expect(actual).toEqual(expected);
  });

  it('will build queryParams with passed parameter', () => {
    const params = {
      section: 42,
      page: 'bulbasaur',
    }
    const expected = `origin=*&action=parse&format=json&redirects=1&section=42&page=bulbasaur`;
    const actual = buildQueryParams(params);
    expect(actual).toEqual(expected);
  });
});
