// filter list by comparing input
export function filterAutocomplete(
  list,
  rawInput = '',
  isShowingAllByDefault = false,
  getItemValue = e => e // should return string
) {
  const defaultResult = isShowingAllByDefault ? list : [];
  const input = rawInput.trim().toLowerCase();
  const { length } = input;
  return length === 0
    ? defaultResult
    : list.filter(
      item => getItemValue(item).toLowerCase().includes(input)
    );
}
