export function getStatName(statCode: 'hp' | 'at' | 'de' | 'sa' | 'sd' | 'sp') {
  switch (statCode) {
    case 'hp': return 'HP';
    case 'at': return 'Attack';
    case 'de': return 'Defense';
    case 'sa': return 'Sp. Atk';
    case 'sd': return 'Sp. Def';
    case 'sp': return 'Speed';
  }
}

export function getStatColor(statCode: 'hp' | 'at' | 'de' | 'sa' | 'sd' | 'sp') {
  switch (statCode) {
    case 'hp': return '#FF0000';
    case 'at': return '#F08030';
    case 'de': return '#F8D030';
    case 'sa': return '#6890F0';
    case 'sd': return '#78C850';
    case 'sp': return '#F85888';
  }
}
