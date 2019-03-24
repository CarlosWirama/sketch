import React from 'react';
import styled from 'styled-components';
import { InputBase, MenuItem, Popper, Paper } from '@material-ui/core';

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

export function AutoSuggestRenderSuggestionComponent({
  parts, isHighlighted, onClick, text,
}) {
  return (
    <MenuItem selected={isHighlighted} component="div" onClick={() => onClick(text)}>
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

export function AutoSuggestRenderSuggestionContainerComponent({
  anchorEl, children, containerProps,
}) {
  return (
    <Popper anchorEl={anchorEl} open={Boolean(children)}>
      <StyledPaper
        square
        {...containerProps}
        style={{listStyleType: 'none' , width: anchorEl ? anchorEl.clientWidth : null }}
        root={{listStyleType: 'none'}}
      >
        {children}
      </StyledPaper>
    </Popper>
  );
}

const StyledPaper = styled(Paper)`
  .react-autosuggest__suggestions-list {
    list-style: none;
    padding: 0;
  }
`;
