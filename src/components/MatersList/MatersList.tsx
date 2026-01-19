import { formatDate } from '../../utils/dateFormatter';
import { type IMeter } from '../../stores';

import { meterStore } from '../../stores';

import {
  TableRow,
  TableCell,
  TypeBadge,
  TableBody,
  MeterIcon,
  DeleteIcon,
} from './MatersList.style';
import cw from './assets/cw.svg';
import hw from './assets/hw.svg';
import deleteIcon from './assets/deleteIcon.svg';

interface MatersListProps {
  metersList: IMeter[];
}

export const MatersList = ({ metersList }: MatersListProps) => {
  const handleDeleteMeter = (id: string): void => {
    if (!meterStore.isLoading) {
      meterStore.deleteMeter(id);
    }
  };
  const getMeterType = (type: string) => {
    switch (type) {
      case 'ColdWaterAreaMeter':
        return (
          <>
            <MeterIcon src={cw} alt="ХВС" />
            <TypeBadge>{'ХВС'}</TypeBadge>
          </>
        );
      case 'HotWaterAreaMeter':
        return (
          <>
            <MeterIcon src={hw} alt="ГВС" />
            <TypeBadge>{'ГВС'}</TypeBadge>
          </>
        );
    }
  };

  return (
    <TableBody>
      {metersList.map(
        ({
          id,
          sequenceNumber,
          type,
          installationDate,
          isAutomatic,
          initialValues,
          address,
          description,
        }: IMeter) => (
          <TableRow key={id}>
            <TableCell $width="48px">{sequenceNumber}</TableCell>
            <TableCell $width="120px">
              <TypeBadge>{getMeterType(type)}</TypeBadge>
            </TableCell>
            <TableCell $width="160px">{formatDate(installationDate)}</TableCell>
            <TableCell $width="128px">{isAutomatic ? 'Да' : 'Нет'}</TableCell>
            <TableCell $width="146px">{initialValues}</TableCell>
            <TableCell $width="430px">{address}</TableCell>
            <TableCell $width="304px">{description}</TableCell>
            <TableCell $width="64px">
              <DeleteIcon
                src={deleteIcon}
                alt="Удалить счетчик"
                $width={40}
                $height={40}
                onClick={() => handleDeleteMeter(id)}
              />
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  );
};
