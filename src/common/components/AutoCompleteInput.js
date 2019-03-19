import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { InputBase } from '@material-ui/core';

export default class AutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      suggestions: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  onChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }
  
  onEnter() {
    this.props.onSubmit(this.state.searchText);
  }

  onKeyDown(e) {
    if(e.keyCode === 13) this.onEnter(e);
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

  renderSuggestion(suggestion) {
    return <span>{suggestion.name}</span>
  }

  render() {
    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          ...this.props,
          value: this.props.value || this.state.searchText,
          onChange: this.onChange,
          onKeyDown: this.onKeyDown,
        }}
      />
    );
  }
}

AutoCompleteInput.propTypes = {
  name: PropTypes.string.isRequired,
  collection: PropTypes.arrayOf(PropTypes.object).isRequired,
}