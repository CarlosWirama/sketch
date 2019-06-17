import styled from 'styled-components';
import PropTypes from 'prop-types';

const Pokeball = styled.div`
  width: ${props => .5 * props.size}px;
  height: ${props => .5 * props.size}px;
  border: ${props => `${.25 * props.size}px solid ${props.color}`};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "";
    position: fixed;
    width: 200%;
    height: 20%;
    background: ${props => props.background};
    background-position: 0vh 0vw;
    background-size: 100vh 100vh;
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
