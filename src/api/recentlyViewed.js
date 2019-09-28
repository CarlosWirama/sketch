export async function getRecentlyViewed() {
  const storedRaw = await localStorage.getItem('recentlyViewed');
  return storedRaw ? storedRaw.split(',') : [];
}

export async function updateRecentlyViewed(name) {
  const rawPrevList = await localStorage.getItem('recentlyViewed') || '';
  const prevList = rawPrevList.split(',').filter(e => e);
  const existingIndexForThisPokemon = prevList.indexOf(name);
  if (existingIndexForThisPokemon !== -1) {
    // remove this pokemon from list
    prevList.splice(existingIndexForThisPokemon, 1);
  }
  prevList.unshift(name); // add to the most recent
  const result = prevList.slice(0, 4).join(','); // get the first 5
  localStorage.setItem('recentlyViewed', result.toLowerCase());
}
