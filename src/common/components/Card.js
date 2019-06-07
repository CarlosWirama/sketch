import styled from 'styled-components';

const Card = styled.div`
  border-radius: 9px 29px;
  justify-content: left;
`;

export const BorderedCard = styled(Card)`
  position: relative;
  && {
    background-color: rgba(32, 129, 255, 0.3);
    box-shadow: 0 0 8px 10px rgba(182, 237, 255, 0.3);
    border: solid 3px rgba(176, 235, 255, 0.8);
    :before {
      content: " ";
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      border: 3px solid rgba(32, 129, 255, 0.3);
      border-radius: 12px 32px;
    }
  }
`;

export default Card;
