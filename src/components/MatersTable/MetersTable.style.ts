import styled from 'styled-components';

export const Loading = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 150px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  background: #f7f8f9;
  padding: 8px 12px;
  border: 1px solid #1f2939;
  border-radius: 8px;
  color: #666;
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 120px;
  z-index: 100;
  padding: 20px;
  background: #fed7d7;
  border: 1px solid #fc8181;
  border-radius: 8px;
  color: #c53030;
  margin: 20px;
  text-align: center;
`;

export const Container = styled.section`
  position: reletiv;
  box-sizing: border-box;
  width: 1440px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 1408px) {
    width: 100%;
    padding: 16px;
  }
`;

export const Title = styled.h1`
  font-size: 24px
  font-width: 500;
  color: #0F1728;
`;

export const Table = styled.table`
  width: 100%;
  outline: 2px solid #e0e5eb;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  table-layout: fixed;
  display: block;
`;

export const TableHeaderRow = styled.tr`
  background-color: #f0f3f7;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const TableHeader = styled.th<{ $width?: string }>`
  width: ${(props) => props.$width || 'auto'};
  padding: 8px 12px;
  text-align: left;
  font-weight: 500;
  color: #697180;
  font-size: 13px;
`;

export const TabFooter = styled.tfoot`
  padding: 8px 16px;
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
