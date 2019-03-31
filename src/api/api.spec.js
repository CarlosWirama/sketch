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
  it('should get array of pokemon OR throw network error', async done => {
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
    let pokemons = [];
    try {
      jest.spyOn(console, 'error');
      console.error.mockImplementation(() => {});
      pokemons = await getPokemons();
      console.error.mockRestore();

      expect(typeof pokemons).toEqual('object');
      expect(Array.isArray(pokemons)).toBeTruthy();
      expect(pokemons).toHaveLength(pokemonCount);
      const [ firstPokemon, secondPokemon ] = pokemons;
      expect(firstPokemon).toEqual(bulbasaur);
      expect(secondPokemon).toEqual(ivysaur);
    } catch(e) {
      expect(console.error).toHaveBeenCalledTimes(1);
      console.error.mockRestore();
      console.error(`Error while testing getPokemons: ${e.message}`);
      expect(e.message).toBe('Network request failed');
    }
    done();
  });
});
