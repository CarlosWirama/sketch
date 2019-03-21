import React from 'react';
import { InputBase, MenuItem } from '@material-ui/core';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

export function renderInputComponent({ inputRef = () => {}, ref, ...other }) {
  return (
    <InputBase
      fullWidth
      inputRef={ node => {
        ref(node);
        inputRef(node);
      }}
      {...other}
    />
  );
}

export function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      {parts.map((part, index) =>
        part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        ),
      )}
    </MenuItem>
  );
}
