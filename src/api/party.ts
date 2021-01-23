import {
  PartyPokemon,
  PartyPokemonOptimized,
  MoveItem,
  StoredPartyList,
} from '../common/types/partyType';

const PARTY_STORAGE_KEY = 'party';

function getPartyList(): PartyPokemonOptimized[] {
  const rawPartyList = localStorage.getItem(PARTY_STORAGE_KEY) || '[]';
  const parsed: StoredPartyList = JSON.parse(rawPartyList);
  return parsed.map(
    ([species, givenName, moves]) => ({ species, givenName, moves }),
  ) || [];
}

function savePartyList(partyList: PartyPokemonOptimized[]) {
  const arrayStructured = partyList.map(
    ({ species, givenName, moves }) => [species, givenName, moves],
  );
  const stringified = JSON.stringify(arrayStructured);
  return localStorage.setItem(PARTY_STORAGE_KEY, stringified);
}

export function getChoosenMove(name: string): MoveItem[] {
  const partyList = getPartyList();
  const [matching] = partyList.filter(pokemon => pokemon.givenName === name);
  return matching
    ? matching.moves.map(([name, type]) => ({ name, type }))
    : [];
}

export function addToParty(newPokemon: PartyPokemon): void {
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
