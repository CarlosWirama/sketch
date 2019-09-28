export async function getLocalStorageListItem(storageKey) {
  const commaSeparated = await localStorage.getItem(storageKey);
  return commaSeparated ? commaSeparated.split(',') : [];
}

export async function setLocalStorageListItem(storageKey, list) {
  await localStorage.setItem(storageKey, list.join(','));
}

export async function removeLocalStorageListItem(
  storageKey,
  item,
  { preserveLetterCase = false } = {},
) {
  const list = await getLocalStorageListItem(storageKey);
  const newItem = preserveLetterCase ? item : `${item}`.toLowerCase();
  removeItemFromArray(newItem, list);
  await setLocalStorageListItem(storageKey, list);
}

export async function addLocalStorageListItem(storageKey, item, params = {}) {
  const {
    limit = 4,
    preserveLetterCase = false,
    avoidDuplicates = true,
  } = params;
  const prevList = await getLocalStorageListItem(storageKey);
  const newItem = preserveLetterCase ? item : `${item}`.toLowerCase();
  if (avoidDuplicates) { // remove this item from the list before adding
    removeItemFromArray(newItem, prevList);
  }
  prevList.unshift(newItem); // add to the most recent
  const result = prevList.slice(0, limit) // get the first {limit} items
  await setLocalStorageListItem(storageKey, result);
}

function removeItemFromArray(item, array) {
  const existingItemIndex = array.indexOf(item);
  existingItemIndex !== -1 && array.splice(existingItemIndex, 1);
  // the original array still got mutated even without return
  return array;
}
