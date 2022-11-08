import styled from 'styled-components';
import { Tabs as MaterialTabs, Tab as MaterialTab } from '@material-ui/core';
import { LayoutContainer } from '../../common/components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SectionTitle = styled.div`
  margin: 24px 0 16px;
  font-weight: bold;
`;

export const Tabs = styled(MaterialTabs)`
  display: flex;
  padding: 8px 16px;
  z-index: 1;
  top: 105px;
`;

export const Tab = styled(MaterialTab).attrs({
  classes: { selected: 'detail-page-selected-tab' },
})`
  && {
    background: rgb(19, 153, 240);
    border-radius: 4px 9px;
    padding: 2px 8px;
    margin-right: 8px;
    color: white;
    border: 2px solid #95ddfe;
    box-sizing: border-box;
    &.detail-page-selected-tab {
      border: none;
      color: white;
    }
  }
`;

export const DetailPageContent = styled(LayoutContainer)`
  padding-top: 0;
`;
