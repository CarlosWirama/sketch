import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const SectionTitle = styled.div`
  margin: 24px 0 16px;
  font-weight: bold;
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  z-index: 1;
  position: fixed;
  top: 105px;
`;

export const DetailPageContent = styled.div`
  overflow: scroll;
  margin-top: 45px;
`;
