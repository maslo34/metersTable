import styled from 'styled-components';

export const TableBody = styled.tbody`
  display: block;
  width: 100%;
  height: 80vh;
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

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td<{ $width?: string }>`
  width: ${(props) => props.$width || 'auto'};

  padding: 12px 16px;
  font-size: 14px;
  color: #1f2939;

  height: 52px;
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
