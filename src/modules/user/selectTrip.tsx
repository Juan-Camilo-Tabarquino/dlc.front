import DatePickerPropio from '@/commons/InputComponents/DatePicker';
import Select from '@/commons/InputComponents/Select';
import type {
  FetchHistory, LocationByDate, RouteItem, User,
} from '@/types';
import {
  Button, Form, Typography,
} from 'antd';
import { mapToSelectOption } from '@/utils/utils';
import LocationMenu from './menuLocation';
import useLocation from '../location/hooks/useLocation';

const { useForm } = Form;
const { Title } = Typography;

type SelectTripProps = {
  onSubmit: (data: FetchHistory) => void;
  locations: LocationByDate[];
  users: User[];
};

const SelectTrip = ({
  users,
  locations,
  onSubmit,
}: SelectTripProps) => {
  const [form] = useForm();
  const { handleTimeClick } = useLocation();

  return (
    <Form form={form} onFinish={onSubmit}>
      <Title level={5} style={{ marginBottom: '20px' }}>
        Buscar Historico de recorrido por usuario
      </Title>
      <Select
        label="Seleccionar usuario"
        name="user"
        conjunto={mapToSelectOption(users, 'fullname')}
        isRequired
        selectProps={{ placeholder: 'Selecciona un usuario' }}
      />
      <DatePickerPropio
        label="Seleccionar inicio del recorrido"
        name="recorridoI"
        isRequired
        datePickerProps={{
          value: undefined,
          placeholder: 'Selecciona una fecha',
          format: 'YYYY-MM-DD',
          size: 'large',
        }}
      />
      <DatePickerPropio
        label="Seleccionar fin del recorrido"
        name="recorridoF"
        isRequired
        datePickerProps={{
          value: undefined,
          placeholder: 'Selecciona una fecha',
          format: 'YYYY-MM-DD',
          size: 'large',
        }}
      />
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: '100%', backgroundColor: '#001529' }}
      >
        Ejecutar
      </Button>
      {locations && locations.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Title level={5}>Recorridos</Title>
          <LocationMenu
            locations={locations.map((location) => ({
              date: location.date,
              route: location.route.map((routeItem) => ({
                time: routeItem.time,
                coordinates: routeItem.coordinates,
                date: location.date,
              })),
            }))}
            onTimeClick={(routeItem: RouteItem) => handleTimeClick(routeItem)}
          />
        </div>
      )}
    </Form>
  );
};

export default SelectTrip;
