import React from 'react';
import { Row } from 'antd';
import { User } from '@/types';
import BoxInfo from '../mapa/commons/boxInfo';

interface InfoUserProps {
  infoUser: User;
}

const InfoUser: React.FC<InfoUserProps> = ({ infoUser }) => {
  const latitude = infoUser?.lastlocation.latitude;
  const longitude = infoUser?.lastlocation.longitude;
  return (
    <Row gutter={[8, 16]}>
      <BoxInfo span={12} title="Usuario" imgSrc="/usuario.png" text={infoUser?.username} />
      <BoxInfo span={12} title="Rumbo" imgSrc="/rumbo.png" text={infoUser?.lastlocation.course} />
      <BoxInfo span={12} title="Fecha (Ult.act)" imgSrc="/fecha.png" text={infoUser?.lastlocation.date} />
      <BoxInfo span={12} title="Nomenclatura" imgSrc="/pin.png" text={infoUser?.lastlocation.nomenclature} />
      <BoxInfo span={12} title="Coordenadas" imgSrc="/coordenada.png" text={`${latitude},${longitude.toFixed(7)}`} googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`} />
    </Row>
  );
};

export default InfoUser;
