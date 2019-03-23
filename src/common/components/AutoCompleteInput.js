import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import { Popper, Paper } from '@material-ui/core';
import {
  renderInputComponent,
  renderSuggestion,
  // renderSuggestionsContainer,
} from './Input';

export default class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      suggestions: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  onChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  submitInput() {
    this.props.onSubmit(this.state.searchText);
  }

  onKeyDown(e) {
    // if the user key-down an Enter key
    if(e.keyCode === 13) this.submitInput();
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions(rawInput = '') {
    const input = rawInput.trim().toLowerCase();
    const { length } = input;

    return length === 0
      ? []
      : this.props.collection
        .filter(item => item.name.toLowerCase().slice(0, length) === input);
  }

  onSuggestionsFetchRequested({ value }) {
    const suggestions = this.getSuggestions(value);
    this.setState({ suggestions });
  }

  // triggered every time user clicked clear button
  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  render() {
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderInputComponent={renderInputComponent}
        renderSuggestion={renderSuggestion}
        inputProps={{
          ...this.props,
          value: this.props.value || this.state.searchText,
          onChange: this.onChange,
          onKeyDown: this.onKeyDown,
          inputRef: node => {
            this.popperNode = node;
          },
        }}
        renderSuggestionsContainer={(props) => (
          <Popper anchorEl={this.popperNode} open={Boolean(props.children)}>
            <StyledPaper
              square
              {...props.containerProps}
              style={{listStyleType: 'none' , width: this.popperNode ? this.popperNode.clientWidth : null }}
              root={{listStyleType: 'none'}}
            >
              {props.children}
            </StyledPaper>
          </Popper>
        )}
        
      />
    );
  }
}

AutoCompleteInput.propTypes = {
  name: PropTypes.string.isRequired,
  collection: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const StyledPaper = styled(Paper)`
  .react-autosuggest__suggestions-list {
    list-style: none;
    padding: 0;
  }
`;
