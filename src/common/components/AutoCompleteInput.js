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
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
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

  // filter suggestions by comparing input with all suggestions from props
  filterSuggestions(rawInput = '', suggestions, getSuggestionValue) {
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
    const { searchText } = this.state;
    const { suggestions, value } = this.props;
    return (
      <Autosuggest
        // since theres no other props, i put the filter here
        // and will be recalculated in every render
        suggestions={this.filterSuggestions(
          searchText, suggestions, this.getSuggestionValue
        )}
        getSuggestionValue={this.getSuggestionValue}
        renderInputComponent={renderInputComponent}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          ...this.props,
          name: 'searchText',
          value: value || searchText,
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
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
}
