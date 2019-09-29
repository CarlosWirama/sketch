import { getLocalStorageListItem, addLocalStorageListItem } from './util';

const RECENTLY_VIEWED_STORAGE_KEY = 'recentlyViewed';

export async function getRecentlyViewed() {
  return await getLocalStorageListItem(RECENTLY_VIEWED_STORAGE_KEY);
}

export async function updateRecentlyViewed(name) {
  addLocalStorageListItem(RECENTLY_VIEWED_STORAGE_KEY, name);
}
