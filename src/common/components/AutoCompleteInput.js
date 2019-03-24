import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {
  renderInputComponent,
  AutoSuggestRenderSuggestionComponent,
  AutoSuggestRenderSuggestionContainerComponent,
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
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  }

  onChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  onKeyDown(e) {
    // if the user key-down an Enter key
    if(e.keyCode === 13) {
      this.props.onSubmit(this.state.searchText);
    }
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

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const text = this.getSuggestionValue(suggestion);
    const matches = match(text, query);
    const parts = parse(text, matches);
    return (
      <AutoSuggestRenderSuggestionComponent
        text={text}
        parts={parts}
        isHighlighted={isHighlighted}
        onClick={this.props.onSubmit}
      />
    );
  }

  render() {
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderInputComponent={renderInputComponent}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          ...this.props,
          value: this.props.value || this.state.searchText,
          onChange: this.onChange,
          onKeyDown: this.onKeyDown,
          inputRef: node => {
            this.popperNode = node;
          },
        }}
        renderSuggestionsContainer={props =>
          <AutoSuggestRenderSuggestionContainerComponent
            anchorEl={this.popperNode}
            {...props}
          />
        }
      />
    );
  }
}

AutoCompleteInput.propTypes = {
  name: PropTypes.string.isRequired,
  collection: PropTypes.arrayOf(PropTypes.object).isRequired,
}
