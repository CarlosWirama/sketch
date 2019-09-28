import { getLocalStorageListItem, addLocalStorageListItem } from './util';

const PINNED_STORAGE_KEY = 'pinnedPokemon';

export async function getPinnedPokemon() {
  return await getLocalStorageListItem(PINNED_STORAGE_KEY);
}

export async function updatePinnedPokemon(name) {
  addLocalStorageListItem(PINNED_STORAGE_KEY, name, { limit: Infinity });
}
