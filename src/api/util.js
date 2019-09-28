export async function getLocalStorageListItem(key) {
  const commaSeparated = await localStorage.getItem(key);
  return commaSeparated ? commaSeparated.split(',') : [];
}

export async function addLocalStorageListItem(key, value, params = {}) {
  const {
    limit = 4,
    preserveLetterCase = false,
    avoidDuplicates = true,
  } = params;

  const prevList = await getLocalStorageListItem(key);
  const newValue = preserveLetterCase ? value : `${value}`.toLowerCase();
  if (avoidDuplicates) { // remove this item from the list before adding
    const existingItemIndex = prevList.indexOf(newValue);
    existingItemIndex !== -1 && prevList.splice(existingItemIndex, 1);
  }
  prevList.unshift(newValue); // add to the most recent
  const result = prevList
    .slice(0, limit) // prevList.slice will get the first {limit} items
    .join(',');
  await localStorage.setItem(key, result);
}
