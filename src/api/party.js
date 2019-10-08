const PARTY_STORAGE_KEY = 'party';

export async function getPartyList() {
  /* party will have structure like this:
    [
      ["Bulbasaur", "Bulba", ["Vine Whip", "Poison Powder"]],
      ["Pikachu", "Pika123", ["Volt Tackle", "Quick Attack"]],
      ["Alolan_Raichu", "AlolanRaichu", ["Thunder", "Thunder Wave"]],
    ]
  */
  const rawPartyList = await localStorage.getItem(PARTY_STORAGE_KEY) || '[]';
  return JSON.parse(rawPartyList).map(
    ([species, givenName, moves]) => ({ species, givenName, moves })
  );
}

export async function savePartyList(partyList) {
  /* party will have structure like this:
    [
      {
        species: "alolan_raichu",
        givenName: "AlolanRaichu123",
        moves: ["Thunder", "Thunder Wave"]
      }
    ]
  */
  const arrayStructured = partyList.map(({ species, givenName, moves }) => [
    species, givenName, moves,
  ]);
  const stringified = JSON.stringify(arrayStructured);
  return await localStorage.setItem(PARTY_STORAGE_KEY, stringified);
}

export async function getSavedMove(name) {
  const partyList = await getPartyList() || [];
  const [matching] = partyList.filter(pokemon => pokemon.givenName === name);
  return matching ? matching.moves : [];
}

export async function saveToParty(newPokemon) {
  const partyList = await getPartyList() || [];
  const newParty = partyList.filter(i => i.givenName !== newPokemon.givenName);
  newParty.unshift(newPokemon);
  return await savePartyList(newParty);
}

// export async function removeFromParty(name) {
// }
