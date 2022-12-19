import * as React from 'react';
import {Form, Input, Modal, Select} from "antd";
import {useCallback, useEffect, useState} from "react";
import {CryptoCurrency, CryptoList} from "@count-of-money/shared";
import {useAuth} from "../../hooks/useAuth";
import {UserApiController} from "../../controllers/UserApiController";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {CryptoControllerApi} from "../../controllers/CryptoControllerApi";

type Props = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  list: CryptoList;
};

type Form = {
  name: string;
  crypto: string[];
}

export const UpdateListModal = (props: Props) => {

  const {getAccessToken} = useAuth();
  const [crypto, setCrypto] = useState<CryptoCurrency[]>([]);
  const {setValue, getValues, watch} = useForm<Form>({defaultValues: {name: '', crypto: []}})

  const loadAvailableCrypto = useCallback(() => {
    CryptoControllerApi.getAll(getAccessToken(), (crypto, error) => {
      if (error) {
        toast('Une erreur est survenue !', {type: 'error'});
      }
      setCrypto(crypto);
    });
  }, [getAccessToken]);

  useEffect(() => {
    setValue('crypto', props.list.cryptos.filter((c) => c.enable).map((a) => a.id));
    setValue('name', props.list.name);
    loadAvailableCrypto();
  }, [props, props.list, setValue, loadAvailableCrypto])

  const onClickUpdate = useCallback(() => {
    UserApiController.updateCryptoList(getAccessToken(), props.list.id, {name: getValues('name'), cryptos: getValues('crypto')}, (cryptoList, error) => {
      if (error) {
        toast('Une erreur est survenue !');
      } else {
        props.onOk();
      }
    });
  }, [getAccessToken, getValues, props]);

  const onNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setValue('name', event.currentTarget.value), [setValue]);
  const onChangeSelectedCrypto = useCallback((crypto: string[]) => setValue('crypto', crypto), [setValue]);


  return (
    <Modal open={props.open} width={800} onCancel={props.onCancel} onOk={onClickUpdate} title={"Mettre à jour la liste"}>
      <Form layout={"vertical"}>
        <Input style={{marginTop: 10}} placeholder={"Ma liste de surveillance ..."} value={watch('name')} onChange={onNameChange}/>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%', marginTop: 10 }}
          placeholder="Please select"
          onChange={onChangeSelectedCrypto}
          value={watch('crypto')}
          options={crypto?.filter((c) => c.enable).map((c) => ({label: c.name, value: c.id}))}
        />
      </Form>
    </Modal>
  );
};
