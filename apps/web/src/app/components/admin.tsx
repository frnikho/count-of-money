import React, { useState } from 'react';
import { Row, Col, Transfer, InputNumber, Button, Table } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { useSecure } from "../hooks/useSecure";
import './admin.scss';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { UpdateSourceModal } from './updateSourceModal';
import { DeleteSourceModal } from './deleteSourceModal';
import { AddSourceModal } from './addSourceModal';

interface RecordType {
    key: string;
    title: string;
    description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

export function Admin() {
    useSecure();
    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const dataSource = [
        {
            id: '1',
            name: 'Twitter',
            link: 'https://twitter.com/hashtag/COVID19',
            enable: true,
            createdAt: '2021-01-01',
            updatedAt: '2021-01-01',
        },
        {
            id: '2',
            name: 'Facebook',
            link: 'https://www.facebook.com/hashtag/covid19',
            enable: true,
            createdAt: '2021-01-01',
            updatedAt: '2021-01-01',
        },
        {
            id: '3',
            name: 'Instagram',
            link: 'https://www.instagram.com/explore/tags/covid19/',
            enable: true,
            createdAt: '2021-01-01',
            updatedAt: '2021-01-01',
        },
        {
            id: '4',
            name: 'LinkedIn',
            link: 'https://www.instagram.com/explore/tags/covid19/',
            enable: true,
            createdAt: '2021-01-01',
            updatedAt: '2021-01-01',
        }
    ]

    const columns = [
        {
            title: 'Source',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) =>
            {
                console.log(record)
                return ( <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <UpdateSourceModal record={record} onOk={hideModalUpdate} onCancel={hideModalUpdate} open={openUpdate} />
                    <DeleteSourceModal record={record} onOk={hideModalDelete} onCancel={hideModalDelete} open={openDelete} />
                    <a>{record.name} ({record.link})</a>
                    <div>
                        <Button onClick={showModalUpdate}>
                            <EditOutlined />
                        </Button>
                        <Button onClick={showModalDelete}>
                            <DeleteOutlined />
                        </Button>
                    </div>
                </div>
            </>)
            }
        }
    ]
    const [openUpdate, setOpenUpdate] = useState(false);

    const showModalUpdate = () => {
        setOpenUpdate(true);
    };

    const hideModalUpdate = () => {
        setOpenUpdate(false);
    };

    const [openDelete, setOpenDelete] = useState(false);

    const showModalDelete = () => {
        setOpenDelete(true);
    };

    const hideModalDelete = () => {
        setOpenDelete(false);
    };

    const [openAdd, setOpenAdd] = useState(false);

    const showModalAdd = () => {
        setOpenAdd(true);
    };

    const hideModalAdd = () => {
        setOpenAdd(false);
    };

    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    return (
        <div>
            <Row justify="center" align="middle">
                <h1>Administration</h1>
            </Row>
            <Row style={{ display: 'flex', flexDirection: 'column', paddingBottom: '5vh' }}>
                <Col style={{ paddingTop: '1vh', paddingLeft: '2vh' }}>
                    <h2>Gestion des articles</h2>
                </Col>
                <Col style={{ paddingTop: '1vh' }}>
                    <Table dataSource={dataSource} columns={columns} size="small" pagination={false} />
                    <Button type='primary' style={{ marginTop: '1vh' }} onClick={showModalAdd}>Ajouter une source</Button>
                </Col>
                <Col style={{ paddingTop: '2vh' }}>
                    <h4>Nombre d'articles affichés</h4>
                    <InputNumber min={1} max={20} defaultValue={3} />
                </Col>
                <Col style={{ paddingTop: '1vh' }}>
                    <Button type="primary">Valider</Button>
                </Col>
            </Row>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>
                <Col style={{ paddingTop: '1vh', paddingLeft: '2vh' }}>
                    <h2>Gestion des cryptomonaies</h2>
                </Col>
                <Col style={{ paddingTop: '2vh' }}>
                    <Transfer
                        dataSource={mockData}
                        showSearch
                        titles={['Disponible', 'Affiché']}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        render={(item) => item.title}
                        listStyle={{
                            height: '50vh',
                        }}
                    />
                </Col>
                <Col style={{ paddingTop: '2vh' }}>
                    <h4>Nombre de cryptomonaies à afficher pour les utilisateurs non connectés</h4>
                    <InputNumber min={1} max={20} defaultValue={3} />
                </Col>
                <Col style={{ paddingTop: "1vh" }}>
                    <Button type="primary">Valider</Button>
                </Col>
            </Row>
            <AddSourceModal onOk={hideModalAdd} onCancel={hideModalAdd} open={openAdd} />
        </div>
    );
}