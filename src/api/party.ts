const PARTY_STORAGE_KEY = 'party';

interface PartyPokemonOptimized {
  species: string; // pokemon's origin name
  givenName: string; // name given by the trainer
  moves: string[][]; // [["Vine Whip", "grass"], ["Poison Powder", "poison"]]
}

interface PartyPokemon {
  species: string; // pokemon's origin name
  givenName: string; // name given by the trainer
  moves: Move[]; // [["Vine Whip", "grass"], ["Poison Powder", "poison"]]
}

interface Move {
  name: string;
  type: string;
}

export async function getPartyList(): Promise<PartyPokemonOptimized[]> {
  /* party will have structure like this:
    [
      ["Bulbasaur", "Bulba", [["Vine Whip", "grass"], ["Poison Powder", "poison"]]],
      ["Pikachu", "Pika123", [["Volt Tackle", "electric"], ["Quick Attack", "normal"]]],
      ["Alolan_Raichu", "AloRaichu", [["Thunder", "electric"]]],
    ]
  */
  const rawPartyList = await localStorage.getItem(PARTY_STORAGE_KEY) || '[]';
  return JSON.parse(rawPartyList).map(
    ([species, givenName, moves]: string[]) => ({ species, givenName, moves }),
  );
}

export async function savePartyList(partyList: PartyPokemonOptimized[]) {
  /* party will have structure like this:
    [
      {
        species: "alolan_raichu",
        givenName: "AlolanRaichu123",
        moves: [["Vine Whip", "grass"], ["Poison Powder", "poison"]]
      }
    ]
  */
  const arrayStructured = partyList.map(({ species, givenName, moves }) => [
    species, givenName, moves,
  ]);
  const stringified = JSON.stringify(arrayStructured);
  return await localStorage.setItem(PARTY_STORAGE_KEY, stringified);
}

export async function getSavedMove(name: string): Promise<Move[]> {
  const partyList = await getPartyList() || [];
  const [matching] = partyList.filter(pokemon => pokemon.givenName === name);
  return matching
    ? matching.moves.map(([name, type]: string[]) => ({ name, type }))
    : [];
}

export async function saveToParty(newPokemon: PartyPokemon): Promise<void> {
  const partyList = await getPartyList() || [];
  const newParty = partyList.filter(i => i.givenName !== newPokemon.givenName);
  const newPokemonOptimized: PartyPokemonOptimized = {
    ...newPokemon,
    moves: newPokemon.moves.map(({ name, type }: Move) => [name, type]),
  };
  newParty.unshift(newPokemonOptimized);
  return await savePartyList(newParty);
}

// export async function removeFromParty(name) {
// }
