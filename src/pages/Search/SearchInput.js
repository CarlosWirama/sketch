import React, { Component } from "react";
import PropTypes from "prop-types";
import { Paper, IconButton } from "@material-ui/core";
import { Search, Close } from "@material-ui/icons";
import { TextInput } from "../../common/components";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.textInput = {};
  }

  render() {
    return (
      <Paper style={{ display: "flex" }}>
        <IconButton aria-label="Search">
          <Search />
        </IconButton>
        <TextInput
          ref={e => (this.textInput = e)}
          name="searchText"
          placeholder="Search…"
          style={{ flex: 1 }}
          {...this.props}
        />
        <IconButton onClick={this.textInput.clear} color="inherit">
          <Close />
        </IconButton>
      </Paper>
    );
  }
}

SearchInput.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  defaultValue: PropTypes.string
};

SearchInput.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  defaultValue: ""
  // keep onClear undefined
};
