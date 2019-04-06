import getPokemons from '.';

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