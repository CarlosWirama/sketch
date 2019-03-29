import { buildQueryParams, getPokemons } from '.';
import { getPokemonsMockUrl, getPokemonsMockResult } from './getPokemons.mock';
// import file from '.';
// const buildQueryParams = file.__get__('buildQueryParams');

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

describe('getPokemons', () => {
  it('should get array of pokemon', async done => {
    const pokemonCount = 171;
    const bulbasaur = {
      kantoDex: '001',
      name: 'Bulbasaur',
      types: ['Grass', 'Poison'],
    };
    const ivysaur = {
      kantoDex: '002',
      name: 'Ivysaur',
      types: ['Grass', 'Poison'],
    };
    const pokemons = await getPokemons();
    expect(typeof pokemons).toEqual('object');
    expect(Array.isArray(pokemons)).toBeTruthy();
    expect(pokemons).toHaveLength(pokemonCount);
    const [ firstPokemon, secondPokemon ] = pokemons;
    expect(firstPokemon).toEqual(bulbasaur);
    expect(secondPokemon).toEqual(ivysaur);
    done();
  });
});
