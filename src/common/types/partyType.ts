export interface PartyPokemon {
  species: string; // pokemon's origin name,  e.g. "alolan_raichu",
  givenName: string; // name given by the trainer,  e.g. "AlolanRaichu123",
  moves: Move[]; // [{ name: "Haze", type: "ice" }, { name: "Bite", type: "dark"}]
}

export interface PartyPokemonOptimized extends Omit<PartyPokemon, 'moves'> {
  moves: OptimizedMoves;
}

export interface Move { name: string; type: string; } // { name: "Haze", type: "ice" }

type OptimizedMoves = [string, string][]; // [["Vine Whip", "grass"], ...etc ]

export type StoredPartyList = ([string, string, OptimizedMoves])[]
/* StoredPartyList will have structure like this:
  [
    ["Bulbasaur", "Bulba", [["Haze", "ice"], ["Bite", "dark"]]],
    ["Pikachu", "Pika123", [["Volt Tackle", "electric"]]],
    ["Alolan_Raichu", "AloRaichu", [["Thunder", "electric"]]],
  ]
*/
