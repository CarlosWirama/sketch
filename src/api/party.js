const PARTY_STORAGE_KEY = 'party';

export async function getPartyList() {
  /* party will have structure like this:
    [
      ["001", "Bulba", ["Vine Whip", "Poison Powder"]],
      ["025", "Pika123", ["Volt Tackle", "Quick Attack"]],
      ["026a", "AlolanRaichu", ["Thunder", "Thunder Wave"]],
    ]
  */
  const rawPartyList = await localStorage.getItem(PARTY_STORAGE_KEY) || '[]';
  return JSON.parse(rawPartyList).map(
    ([pokeDex, givenName, moves]) => ({ pokeDex, givenName, moves })
  );
}

export async function savePartyList(partyList) {
  /* party will have structure like this:
    [
      {
        pokeDex: "026a",
        givenName: "AlolanRaichu123",
        moves: ["Thunder", "Thunder Wave"]
      }
    ]
  */
  const arrayStructured = partyList.map(({ pokeDex, givenName, moves }) => [
    pokeDex, givenName, moves,
  ]);
  const stringified = JSON.stringify(arrayStructured);
  console.log('save party list',stringified);
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
  newParty.push(newPokemon);
  return await savePartyList(newParty);
}

// export async function removeFromParty(name) {
// }
