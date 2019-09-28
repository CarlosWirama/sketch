import {
  getLocalStorageListItem,
  addLocalStorageListItem,
  removeLocalStorageListItem,
} from './util';

const FAVORITE_STORAGE_KEY = 'favorite';

export async function getFavorite() {
  return await getLocalStorageListItem(FAVORITE_STORAGE_KEY);
}

export async function checkFavorite(name) {
  return (await getFavorite()).indexOf(name.toLowerCase()) !== -1;
}

export async function toggleFavorite(name, value) {
  value
    ? addLocalStorageListItem(FAVORITE_STORAGE_KEY, name, { limit: Infinity })
    : removeLocalStorageListItem(FAVORITE_STORAGE_KEY, name);
}
