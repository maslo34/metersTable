import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { meterStore } from '../../stores';
import { MatersList } from '../MatersList';
import { Pagination } from '../Pagination';
import {
  Container,
  Title,
  Table,
  TableHeader,
  TableHeaderRow,
  TabFooter,
  Loading,
  ErrorMessage,
} from './MetersTable.style';

export const MetersTable = observer(() => {
  useEffect(() => {
    meterStore.loadMeters();
  }, []);

  const handleClickPagination = (page: number) => {
    meterStore.loadMore(page);
  };
  return (
    <Container>
      <Title>Список счётчиков</Title>
      <Table>
        <thead>
          <TableHeaderRow>
            <TableHeader $width="48px">№</TableHeader>
            <TableHeader $width="120px">Тип</TableHeader>
            <TableHeader $width="160px">Дата установки</TableHeader>
            <TableHeader $width="128px">Автоматический</TableHeader>
            <TableHeader $width="146px">Текущие показания</TableHeader>
            <TableHeader $width="430px">Адрес</TableHeader>
            <TableHeader $width="376px">Примечание</TableHeader>
          </TableHeaderRow>
        </thead>

        <MatersList metersList={meterStore.meters} />
        <TabFooter>
          <Pagination
            totalPages={meterStore.numberOfPages}
            currentPage={meterStore.currentPage}
            onPageChange={(page) => handleClickPagination(page)}
          />
        </TabFooter>
      </Table>
      {meterStore.isLoading && <Loading>Загрузка счетчиков...</Loading>}
      {meterStore.error && (
        <ErrorMessage>Ошибка: {meterStore.error}</ErrorMessage>
      )}
    </Container>
  );
});
