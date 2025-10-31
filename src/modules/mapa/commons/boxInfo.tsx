import { FC } from 'react';
import { Col, Typography } from 'antd';
import Image from 'next/image';

const { Title } = Typography;

const style: React.CSSProperties = {
  background: '#F4F3F3',
  color: 'black',
  padding: '1em 1em',
  borderRadius: '1em',
  border: '2px solid #001529',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '100%',
  overflowWrap: 'break-word',
  textDecoration: 'none',
};

interface InfoColProps {
  span: number;
  imgSrc?: string;
  title?: string;
  text?: string;
  googleMapsUrl?: string;
}

const BoxInfo: FC<InfoColProps> = ({
  span,
  imgSrc,
  title,
  text,
  googleMapsUrl,
}) => {
  const Wrapper = googleMapsUrl ? 'a' : 'div';

  return (
    <Col span={span}>
      <Wrapper
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...style, display: 'block' }}
      >
        {imgSrc && (
          <Image src={imgSrc} width={25} height={25} alt="icon" priority />
        )}
        <Title style={{ fontSize: '1em' }}>{title}</Title>
        <Title style={{ fontSize: '0.8em' }}>{text}</Title>
      </Wrapper>
    </Col>
  );
};

export default BoxInfo;
