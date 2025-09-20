import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Vector } from 'ol/source';
import { Icon, Style } from 'ol/style';

export default function generatePoint(coordenate: Coordinate): VectorLayer<Feature<Point>> {
  const point = new VectorLayer({
    source: new Vector({
      features: [
        new Feature({ geometry: new Point(fromLonLat(coordenate)) }),
      ],
    }),
    style: new Style({
      image: new Icon({
        anchor: [1, 2],
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        scale: 0.9,
      }),
    }),
  });
  return point;
}
