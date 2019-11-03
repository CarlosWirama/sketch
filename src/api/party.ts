const PARTY_STORAGE_KEY = 'party';

interface PartyPokemon {
  species: string; // pokemon's origin name,  e.g. "alolan_raichu",
  givenName: string; // name given by the trainer,  e.g. "AlolanRaichu123",
  moves: Move[]; // [{ name: "Haze", type: "ice" }, { name: "Bite", type: "dark"}]
}

interface PartyPokemonOptimized extends Omit<PartyPokemon, 'moves'> {
  moves: OptimizedMoves;
}

interface Move { name: string; type: string; } // { name: "Haze", type: "ice" }

type OptimizedMoves = [string, string][]; // [["Vine Whip", "grass"], ...etc ]

type StoredPartyList = ([string, string, OptimizedMoves])[]
/* StoredPartyList will have structure like this:
  [
    ["Bulbasaur", "Bulba", [["Haze", "ice"], ["Bite", "dark"]]],
    ["Pikachu", "Pika123", [["Volt Tackle", "electric"]]],
    ["Alolan_Raichu", "AloRaichu", [["Thunder", "electric"]]],
  ]
*/

export function getPartyList(): PartyPokemonOptimized[] {
  const rawPartyList = localStorage.getItem(PARTY_STORAGE_KEY) || '[]';
  const parsed: StoredPartyList = JSON.parse(rawPartyList);
  return parsed.map(
    ([species, givenName, moves]) => ({ species, givenName, moves }),
  ) || [];
}

export function savePartyList(partyList: PartyPokemonOptimized[]) {
  const arrayStructured = partyList.map(
    ({ species, givenName, moves }) => [species, givenName, moves],
  );
  const stringified = JSON.stringify(arrayStructured);
  return localStorage.setItem(PARTY_STORAGE_KEY, stringified);
}

export function getSavedMove(name: string): Move[] {
  const partyList = getPartyList();
  const [matching] = partyList.filter(pokemon => pokemon.givenName === name);
  return matching
    ? matching.moves.map(([name, type]) => ({ name, type }))
    : [];
}

export function saveToParty(newPokemon: PartyPokemon): void {
  const partyList = getPartyList();
  const newParty = partyList.filter(i => i.givenName !== newPokemon.givenName);
  const newPokemonOptimized: PartyPokemonOptimized = {
    ...newPokemon,
    moves: newPokemon.moves.map(({ name, type }) => [name, type]),
  };
  newParty.unshift(newPokemonOptimized);
  return savePartyList(newParty);
}

// export function removeFromParty(name) {
// }
