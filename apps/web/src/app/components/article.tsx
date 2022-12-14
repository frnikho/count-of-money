import { Button, Col, Row, Typography, Space, Breadcrumb } from "antd";
import './article.scss';
const { Text } = Typography;
const HTMLRegex = /(<([^>]+)>)/ig;

export function Article(props: { title: string, body: string, src: string, date: Date, author: string, link: string }) {
  return (
    <div>
      <Row>
        <Col id="breadCrumb">
          <Breadcrumb>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Articles</Breadcrumb.Item>
            <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row id="articleTitle">
        <Col>
          <h2>{props.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col id="image">
          <img
            src={props.src}
            alt="article"
          />
        </Col>
        <Col id="pubDateAndAuthor">
          <Space direction="vertical" style={{gap: '1vh' }}>
            <Text id="article" type="secondary">Date de publication: {props.date.toLocaleString()}</Text>
            <Text type="secondary" style={{width: '100%'}}>Autheur: {props.author}</Text>
          </Space>
        </Col>
      </Row>
      <Row id="articleContent">
        <Col>
          <Text>{props.body.replace(HTMLRegex, '')}</Text>
        </Col>
      </Row>
      <Row id="articleLink">
        <Col>
          <Button type="primary" href={props.link}>
            Lien vers l'article
          </Button>
        </Col>
      </Row>
    </div>
  );
}
