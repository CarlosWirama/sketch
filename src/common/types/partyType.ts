export interface PartyPokemon {
  species: string; // pokemon's origin name,  e.g. "alolan_raichu",
  givenName: string; // name given by the trainer,  e.g. "AlolanRaichu123",
  moves: MoveItem[]; // [{ name: "Haze", type: "ice" }, { name: "Bite", type: "dark"}]
}

export interface PartyPokemonOptimized extends Omit<PartyPokemon, 'moves'> {
  moves: OptimizedMoveItems;
}

export interface MoveItem { name: string; type: string; } // { name: "Haze", type: "ice" }

type OptimizedMoveItems = [string, string][]; // [["Vine Whip", "grass"], ...etc ]

export type StoredPartyList = ([string, string, OptimizedMoveItems])[]
/* StoredPartyList will have structure like this:
  [
    ["Bulbasaur", "Bulba", [["Haze", "ice"], ["Bite", "dark"]]],
    ["Pikachu", "Pika123", [["Volt Tackle", "electric"]]],
    ["Alolan_Raichu", "AloRaichu", [["Thunder", "electric"]]],
  ]
*/
