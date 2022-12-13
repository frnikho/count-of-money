import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {Form, Input, Modal, Select} from "antd";
import {CryptoControllerApi} from "../../controllers/CryptoControllerApi";
import {toast} from "react-toastify";
import {CryptoCurrency} from "@count-of-money/shared";
import {AuthState} from "../../contexts/UserContext";
import {useForm} from "react-hook-form";
import {UserApiController} from "../../controllers/UserApiController";

type Props = {
  open: boolean;
  onOk: () => void;
  onClose: () => void;
};

type Form = {
  name: string;
  crypto: string[];
}

export const CreateListModal = (props: Props) => {

  const {getAccessToken, authState} = useAuth();
  const [crypto, setCrypto] = useState<CryptoCurrency[]>([]);
  const {watch, setValue, getValues} = useForm<Form>({defaultValues: {name: '', crypto: []}})

  const loadAvailableCrypto = useCallback(() => {
    CryptoControllerApi.getAll(getAccessToken(), (crypto, error) => {
      if (error) {
        toast('Une erreur est survenue !', {type: 'error'});
      }
      setCrypto(crypto);
    });
  }, [getAccessToken]);

  const onClickCreate = useCallback(() => {
    UserApiController.createCryptoList(getAccessToken(), {name: getValues().name, cryptos: getValues().crypto}, (cryptoList, error) => {
      if (error) {
        toast('Une erreur est survenue !', {type: 'error'});
      } else {
        props.onOk();
      }
    });
  }, [getAccessToken, getValues, props]);


  useEffect(() => {
    if (authState === AuthState.Logged) {
      loadAvailableCrypto();
    }
  }, [authState, loadAvailableCrypto]);

  const onNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setValue('name', event.currentTarget.value), [setValue]);
  const onChangeSelectedCrypto = useCallback((crypto: string[]) => setValue('crypto', crypto), [setValue]);

  return (
    <Modal open={props.open} width={800} onCancel={props.onClose} onOk={onClickCreate} title={"Créer une nouvelle liste"}>
      <Form layout={"vertical"}>
        <Form.Item label="Nom" name="listname">
          <Input placeholder={"Ma liste de surveillance ..."} value={watch('name')} onChange={onNameChange}/>
        </Form.Item>
        <Form.Item label={"Crypto"} name={"requiredMarkValue"}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={onChangeSelectedCrypto}
            options={crypto?.map((c) => ({label: c.name, value: c.id}))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
