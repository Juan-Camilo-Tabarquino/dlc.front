import React, { FC } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { RouteItem } from '@/types';

type LocationMenuProps = {
  locations: {
    date: string;
    route: RouteItem[];
  }[];
  onTimeClick: (routeItem: RouteItem) => void;
};

const LocationMenu: FC<LocationMenuProps> = ({ locations, onTimeClick }) => {
  const items: MenuProps['items'] = locations.map((location, index) => ({
    key: `location-${index}`,
    label: location?.date,
    children: location.route
      .sort((a, b) => {
        const timeA = a.time;
        const timeB = b.time;
        return timeA.localeCompare(timeB);
      })
      .map((routeItem, routeIndex) => ({
        key: `route-${index}-${routeIndex}`,
        label: routeItem.time,
        onClick: () => onTimeClick({ ...routeItem }),
      })),
  }));

  return (
    <div
      style={{
        minHeight: 100,
        overflow: 'auto',
        maxHeight: '30vh',
      }}
    >
      <Menu mode="inline" items={items} />
    </div>
  );
};

export default LocationMenu;
