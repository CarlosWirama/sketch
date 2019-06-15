export default function getTypeColor(type) {
  switch (type.toLowerCase()) {
    case 'normal': return '#aaaa99';
    case 'fire': return '#ff4421';
    case 'fighting': case 'fight': return '#bb5644';
    case 'water': return '#3399ff';
    case 'flying': return '#8898ff';
    case 'grass': return '#77cc55';
    case 'poison': return '#aa5599';
    case 'electric': return '#ffcc33';
    case 'ground': return '#ddbb55';
    case 'psychic': return '#ff5599';
    case 'rock': return '#bbaa66';
    case 'ice': return '#66ccff';
    case 'bug': return '#aaba21';
    case 'dragon': return '#7767ed';
    case 'ghost': return '#6766ba';
    case 'steel': return '#aaaabb';
    case 'fairy': return '#ed99ee';
    default: return '#68A090'; // ??? type
  }
}
