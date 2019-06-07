import styled from 'styled-components';
import PropTypes from 'prop-types';

const Pokeball = styled.div`
  position: relative;
  ${props => props.size && `
    width: ${.5 * props.size}px;
    height: ${.5 * props.size}px;
  `};
  background-color: ${props => props.background};
  border: ${props => `${.25 * props.size}px solid ${props.color}`};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "";
    position: absolute;
    width: 200%;
    height: 20%;
    background: ${props => props.background};
  }
  &:after {
    content: "";
    position: absolute;
    width: 60%;
    height: 60%;
    background-color: ${props => props.color};
    border-radius: 50%;
  }
`;

Pokeball.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
};

Pokeball.defaultProps = {
  color: 'gray',
  background: 'white',
};

export default Pokeball;
