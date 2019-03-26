import React from 'react';
import PropTypes from 'prop-types';
import { Paper, IconButton } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import { TextInput } from 'common/components';

const SearchInput = React.forwardRef(({onClear, ...props}, ref) => (
  <Paper style={{display: 'flex'}}>
    <IconButton aria-label="Search">
      <Search />
    </IconButton>
    <TextInput
      ref={ref}
      name="searchText"
      placeholder='Search…'
      style={{flex: 1}}
      {...props}
    />
    <IconButton onClick={props.onClear} color="inherit">
      <Close />
    </IconButton>
  </Paper>
));

export default SearchInput;

SearchInput.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  defaultValue: PropTypes.string,
};

SearchInput.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  onClear: () => {},
  defaultValue: '',
};
