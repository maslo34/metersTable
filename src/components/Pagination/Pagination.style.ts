import styled from 'styled-components';

export const PaginationButton = styled.button<{ $isActive?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #ced5de;
  background-color: ${(props) => (props.$isActive ? '#F2F5F8' : '#FFFFFF')};
  font-size: 14px;
  color: #1f2939;
`;

export const PaginationWrapp = styled.div`
  display: flex;
  gap: 10px;
`;
