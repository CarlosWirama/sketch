import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import { TextInput } from 'common/components';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.textInput = {}; // will be used as textInput ref
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({ isFocused: true });
  }

  onBlur() {
    this.setState({ isFocused: false });
  }

  render() {
    const { isFocused } = this.state;
    return (
      <Container isFocused={isFocused}>
        <IconButton aria-label="Search" onClick={this.textInput.focus} >
          <Search />
        </IconButton>
        <StyledTextInput
          ref={e => (this.textInput = e)}
          name="searchText"
          placeholder="Search…"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...this.props}
        />
        <StyledIconButton
          onClick={() => console.log('sd')}
        >
          <Close />
        </StyledIconButton>
      </Container>
    );
  }
}

SearchInput.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  defaultValue: PropTypes.string,
};

SearchInput.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  defaultValue: '',
  // keep onClear undefined
};

const Container = styled.div`
  display: flex;
  margin-top: 12px;
  border-radius: 8px;
  box-shadow: 0 0 8px 8px rgba(182, 237, 255, 0.24), 0 0 0 2px rgba(32, 129, 255, 0.2);
  border: solid 1px #b0ebff;
  ${({ isFocused }) => isFocused
    ? 'background-color: rgba(255, 255, 255, 0.5);'
    : 'background-color: rgba(106, 171, 255, 0.24);'
  }
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
`;

const StyledIconButton = styled(IconButton)`
  z-index: 1;
`;
