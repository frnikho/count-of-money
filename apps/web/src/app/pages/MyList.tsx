import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {useAuth} from "../hooks/useAuth";
import {UserApiController} from "../controllers/UserApiController";
import {CryptoList} from "@count-of-money/shared";
import {toast} from "react-toastify";
import {AuthState} from "../contexts/UserContext";
import '../styles/text.scss';
import {Avatar, Button} from "antd";
import {DeleteTwoTone, EditTwoTone, PlusOutlined} from "@ant-design/icons";
import {useModals} from "../hooks/useModals";
import {UpdateListModal} from "../modals/list/UpdateListModal";
import {DeleteListModal} from "../modals/list/DeleteListModal";
import {CreateListModal} from "../modals/list/CreateListModal";
import {useSecure} from "../hooks/useSecure";

type Modals = {
  openUpdate: boolean,
  openDelete: boolean,
  openCreate: boolean;
}

export const MyList = () => {

  useSecure();
  const {authState, getAccessToken} = useAuth();
  const [list, setList] = useState<CryptoList[]>([]);
  const [selectedList, setSelectedList] = useState<CryptoList | undefined>(undefined);
  const {openCreate, openDelete, openUpdate, updateModals, updateAllModals} = useModals<Modals>({openDelete: false, openUpdate: false, openCreate: false});

  const loadList = useCallback(() => {
    UserApiController.getCryptoList(getAccessToken(), (cryptoList, error) => {
      if (error) {
        toast('Une erreur est survenue !', {type: 'error'});
      } else if (cryptoList) {
        setList(cryptoList);
      }
    });
  }, [getAccessToken])

  useEffect(() => {
    if (authState === AuthState.Logged) {
      loadList();
    }
  }, [authState, loadList]);

  const onCloseModals = useCallback(() => updateAllModals({openUpdate: false, openDelete: false, openCreate: false}), [updateAllModals]);

  const onDeletedList = useCallback(() => {
    updateModals('openDelete', false);
    toast('Liste supprimée avec succès !');
    loadList();
  }, [loadList, updateModals]);

  const onUpdatedList = useCallback(() => {
    updateModals('openUpdate', false);
    toast('Liste mise à jour avec succès !');
    loadList();
  }, [loadList, updateModals]);

  const onCreatedList = useCallback(() => {
    toast('Liste crée avec succès !');
    updateModals('openCreate', false);
    loadList();
  }, [loadList, updateModals])

  const onClickEdit = useCallback((list: CryptoList) => {
    setSelectedList(list);
    updateModals('openUpdate', true)
  }, [updateModals]);

  const onClickDelete = useCallback((list: CryptoList) => {
    setSelectedList(list);
    updateModals('openDelete', true)
  }, [updateModals]);

  const onClickCreate = useCallback(() => {
    updateModals('openCreate', true);
  }, [updateModals]);

  return (
    <div>
      {selectedList ? <UpdateListModal list={selectedList} open={openUpdate} onOk={onUpdatedList} onCancel={onCloseModals}/> : null}
      {selectedList ? <DeleteListModal list={selectedList} open={openDelete} onOk={onDeletedList} onCancel={onCloseModals}/> : null}
      <CreateListModal open={openCreate} onOk={onCreatedList} onClose={onCloseModals}/>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <h1 className={"title"}>Mes listes</h1>
        <Button onClick={onClickCreate} icon={<PlusOutlined />}/>
      </div>
      {list.map((l, index) => {
        return (
          <div style={{marginTop: 18}} key={"list_item_crypto_" + index}>
            <div style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <h1 key={'list_c_' + index}>{l.name}</h1>
              <Button size={'small'} type={'ghost'} onClick={() => onClickEdit(l)} icon={<EditTwoTone />}/>
              <Button size={'small'} type={'ghost'} onClick={() => onClickDelete(l)} icon={<DeleteTwoTone />}/>
            </div>
            {l.cryptos.filter((c) => c.enable).map((c, index) => <Avatar key={'list_crypto_avatar' + index} style={{marginLeft: 10}} size={64} src={c.image} alt={c.name}/>)}
          </div>
        )
      })}
    </div>
  );
};
