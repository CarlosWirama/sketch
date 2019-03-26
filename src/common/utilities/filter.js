

  // filter suggestions by comparing input with all suggestions from props
  export function filterSuggestions(rawInput = '', suggestions, getSuggestionValue) {
    const input = rawInput.trim().toLowerCase();
    const { length } = input;

    return length === 0
      ? []
      : suggestions.filter(
          item => input === getSuggestionValue(item).toLowerCase().slice(0, length)
        );
      // TODO: later give more suggestions for
      // matching character in the middle of the string
  }
