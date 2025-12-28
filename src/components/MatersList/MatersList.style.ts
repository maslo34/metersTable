import styled from 'styled-components';

export const TableBody = styled.tbody`
  display: block;
  width: 100%;
  height: 75vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #eee;

  display: table;
  width: 100%;
  table-layout: fixed;

  &:hover {
    background-color: #f7f8f9;
    cursor: pointer;
  }
`;

export const TableCell = styled.td<{ $width?: string }>`
  width: ${(props) => props.$width || 'auto'};

  padding: 6px 12px;
  font-size: 14px;
  color: #1f2939;

  &:first-child {
    text-align: center;
    vertical-align: middle;
  }
`;

export const TypeBadge = styled.span`
  display: inline-block;
  display: flex;
  gap: 8px;
  aline-items: senter;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #999;
  font-style: italic;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  margin: 20px 0;
`;

export const MeterIcon = styled.img`
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const DeleteIcon = styled.img<{ $width: number; $height: number }>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  object-fit: contain;
  flex-shrink: 0;
  opacity: 0;
  visibility: hidden;
  ${TableRow}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
