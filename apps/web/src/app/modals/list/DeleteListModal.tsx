// @flow
import * as React from 'react';
import {Modal} from "antd";
import {useCallback} from "react";
import {useAuth} from "../../hooks/useAuth";
import {UserApiController} from "../../controllers/UserApiController";
import {CryptoList} from "@count-of-money/shared";
import {toast} from "react-toastify";

type Props = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  list: CryptoList;
};
export const DeleteListModal = (props: Props) => {

  const {getAccessToken} = useAuth();

  const onClickDelete = useCallback(() => {
    UserApiController.deleteCryptoList(getAccessToken(), props.list.id, (cryptoList, error) => {
      if (error) {
        toast('Une erreur est survenue !', {type: 'error'});
      } else {
        props.onOk();
      }
    })
  }, [getAccessToken, props]);

  return (
    <Modal open={props.open} onCancel={props.onCancel} onOk={onClickDelete} title={"Supprimer cette liste ?"}>
      <p>Une fois cette opération effectuer, cette liste serra définitivement supprimer</p>
    </Modal>
  );
};
