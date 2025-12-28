import { formatDate } from '../../utils/dateFormatter';
import { type IMeter } from '../../stores';

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
      {metersList.map((meter: IMeter) => (
        <TableRow key={meter.id}>
          <TableCell $width="48px">{meter.sequenceNumber}</TableCell>
          <TableCell $width="120px">
            <TypeBadge>{getMeterType(meter.type)}</TypeBadge>
          </TableCell>
          <TableCell $width="160px">
            {formatDate(meter.installationDate)}
          </TableCell>
          <TableCell $width="128px">
            {meter.isAutomatic ? 'Да' : 'Нет'}
          </TableCell>
          <TableCell $width="146px">{meter.initialValues}</TableCell>
          <TableCell $width="430px">{meter.address}</TableCell>
          <TableCell $width="304px">{meter.description}</TableCell>
          <TableCell $width="64px">
            <DeleteIcon
              src={deleteIcon}
              alt="Удалить счетчик"
              $width={40}
              $height={40}
              onClick={() => alert('Удалить счетчик?')}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
