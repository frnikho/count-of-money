import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Col, InputNumber, Row, Table, Transfer} from 'antd';
import type {TransferDirection} from 'antd/es/transfer';
import {useSecure} from "../../hooks/useSecure";
import './admin.scss';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {UpdateSourceModal} from '../../modals/updateSourceModal';
import {DeleteSourceModal} from '../../modals/deleteSourceModal';
import {AddSourceModal} from '../../modals/addSourceModal';
import {CryptoCurrency, GlobalConfig, Source} from "@count-of-money/shared";
import {AdminControllerApi} from "../../controllers/AdminControllerApi";
import {useAuth} from "../../hooks/useAuth";
import {AuthState} from "../../contexts/UserContext";
import {useForm} from "react-hook-form";
import {useModals} from "../../hooks/useModals";
import {toast} from "react-toastify";
import {CryptoControllerApi} from "../../controllers/CryptoControllerApi";

interface RecordType {
    key: string;
    title: string;
    description: string;
}

type Form = {
  articleToShow: number;
  cryptoToShow: number;
}

type Modals = {
  createSource: boolean;
  deleteSource: boolean;
  updateSource: boolean;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

export function Admin() {

  useSecure();
  const {getAccessToken, authState} = useAuth();
  const [config, setConfig] = useState<GlobalConfig | undefined>(undefined);
  const {watch, setValue, getValues} = useForm<Form>({defaultValues: {articleToShow: 3, cryptoToShow: 3}});
  const {updateSource, createSource, deleteSource, updateModals} = useModals<Modals>({deleteSource: false, createSource: false, updateSource: false});
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState<Source | undefined>(undefined);
  const [crypto, setCrypto] = useState<CryptoCurrency[]>([]);
  const [selectedKey, setSelectedKeys] = useState<string[]>([]);
  const [targetKey, setTargetKeys] = useState<string[]>([]);

  const loadConfig = useCallback(() => {
    AdminControllerApi.getGlobalConfig(getAccessToken(), (config, error) => {
      if (config) {
        setConfig(config)
      }
    });
  }, [getAccessToken, setConfig])

  const loadSources = useCallback(() => {
    AdminControllerApi.getSources(getAccessToken(), (sources, error) => {
      if (sources) {
        setSources(sources)
      }
    });
  }, [getAccessToken, setSources])

  const loadCryptoCurrencies = useCallback(() => {
    CryptoControllerApi.getAll(getAccessToken(), (crypto, error) => {
      if (error) {
        toast('Une erreur est survenue !', {type: 'error'});
      }
      setCrypto(crypto);
      setTargetKeys(crypto.filter((a) => a.enable).map((a) => a.apiId));
    });
  }, [getAccessToken]);

  useEffect(() => {
    if (authState === AuthState.Logged) {
      loadConfig();
      loadSources();
      loadCryptoCurrencies();
    }
  }, [authState, loadConfig, loadSources, loadCryptoCurrencies]);

  useEffect(() => {
    if (config === undefined)
      return;
    setValue('cryptoToShow', config?.cryptoToShow);
    setValue('articleToShow', config?.articlesToShow);
  }, [config, setValue]);

  const columns = useMemo(() => {
    return (
      [
        {
          title: 'Source',
          dataIndex: 'name',
          key: 'name',
          render: (text: string, record: any) =>
          {
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <a>{record.name} ({record.link})</a>
                <div>
                  <Button onClick={() => {
                    setSelectedSource(record);
                    updateModals('updateSource', true);
                  }}>
                    <EditOutlined />
                  </Button>
                  <Button onClick={() => {
                    setSelectedSource(record);
                    updateModals('deleteSource', true)
                  }}>
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>)
          }
        }
      ]
    )
  }, [updateModals])

  const hideModalAdd = () => {
    loadSources();
    updateModals('createSource', false);
  };

  const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
    const disable = crypto.filter((c) => !nextTargetKeys.find((a) => a === c.apiId)).map((a) => a.apiId);
    CryptoControllerApi.updateEnable(getAccessToken(), {enableCrypto: nextTargetKeys, disableCrypto: disable}, (error) => {
      if (error) {
        toast('Une erreur est survenue !', {type: 'error'})
      } else {
        toast('Maj effectué !', {type: 'success'});
      }
    });
  };

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onClickUpdate = useCallback((article: boolean) => {
    const form = getValues();
    AdminControllerApi.updateGlobalConfig(getAccessToken(), article ? {articlesToShow: form.articleToShow} : {cryptoToShow: form.cryptoToShow}, (config, error) => {
      if (!config) {
        toast('Impossible de mettre à jour !', {type: 'error'});
        return;
      }
      if (article) {
        toast('Nombre d\'article mi(s) à jour !');
      } else {
        toast('Nombre de crypto mis à jour !');
      }
    })
  }, [getAccessToken, getValues])

  return (
      <>
          <Row justify="center" align="middle">
              <h1>Administration</h1>
          </Row>
          <Row style={{ display: 'flex', flexDirection: 'column', paddingBottom: '5vh' }}>
              <Col style={{ paddingTop: '1vh', paddingLeft: '2vh' }}>
                  <h2>Gestion des articles</h2>
              </Col>
              <Col style={{ paddingTop: '1vh' }}>
                  <Table dataSource={sources.map((s, index) => ({...s}))} columns={columns} size="small" pagination={false} />
                  <Button type='primary' style={{ marginTop: '1vh' }} onClick={() => updateModals('createSource', true)}>Ajouter une source</Button>
              </Col>
              <Col style={{ paddingTop: '2vh' }}>
                  <h4>Nombre d'article(s) affichés</h4>
                  <InputNumber min={1} max={20} value={watch('articleToShow')} onChange={(e) => e ? setValue('articleToShow', e) : null} />
              </Col>
              <Col style={{ paddingTop: '1vh' }}>
                  <Button type="primary" onClick={() => onClickUpdate(true)}>Valider</Button>
              </Col>
          </Row>
          <Row style={{ display: 'flex', flexDirection: 'column'}}>
              <Col style={{ paddingTop: '1vh', paddingLeft: '2vh'}}>
                  <h2>Gestion des cryptomonaies</h2>
              </Col>
              <Col style={{ paddingTop: '2vh' }}>
                  <Transfer
                      dataSource={crypto}
                      showSearch
                      titles={['Disponible', 'Affiché']}
                      targetKeys={targetKey}
                      selectedKeys={selectedKey}
                      onChange={onChange}
                      onSelectChange={onSelectChange}
                      render={(item) => item.name}
                      listStyle={{
                          height: '50vh',
                      }}
                      rowKey={(record) => record.apiId}
                  />
              </Col>
              <Col style={{ paddingTop: '2vh' }}>
                  <h4>Nombre de cryptomonaies à afficher pour les utilisateurs non connectés</h4>
                  <InputNumber min={1} max={20} value={watch('cryptoToShow')} onChange={(e) => e ? setValue('cryptoToShow', e) : null} />
              </Col>
              <Col style={{ paddingTop: "1vh" }}>
                  <Button type="primary" onClick={() => onClickUpdate(false)}>Valider</Button>
              </Col>
          </Row>
          <AddSourceModal onOk={hideModalAdd} onCancel={() => updateModals('createSource', false)} open={createSource} />
        {selectedSource ? <UpdateSourceModal record={selectedSource} onOk={() => {
          loadSources();
          updateModals('updateSource', false)}
        } onCancel={() => updateModals('updateSource', false)} open={updateSource} /> : null}
        {selectedSource ? <DeleteSourceModal record={selectedSource} onOk={() => {
          loadSources();
          updateModals('deleteSource', false)}
        } onCancel={() => updateModals('deleteSource', false)} open={deleteSource} /> : null}
      </>
  );
}
