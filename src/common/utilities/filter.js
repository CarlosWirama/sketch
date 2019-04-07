// filter list by comparing input
export function filterAutocomplete(
  list,
  rawInput = '',
  isShowingAllByDefault = false,
  getItemValue = e => e // should return string
) {
  const defaultResult = isShowingAllByDefault ? list : [];
  const input = rawInput
    .trim()
    .toLowerCase()
    .replace('_',' ');
    // prevents alolan to be searchable by _
  return input.length === 0
    ? defaultResult
    : list.filter(
      item => getItemValue(item).toLowerCase().includes(input)
    );
}
