import { Modal } from "antd";
import { Source } from "@count-of-money/shared";
import {useAuth} from "../hooks/useAuth";
import {AdminControllerApi} from "../controllers/AdminControllerApi";
import {toast} from "react-toastify";

type Props = {
    record: Source,
    open: boolean,
    onOk: () => void,
    onCancel: () => void
}

export function DeleteSourceModal({record, onOk, onCancel, open} : Props) {

  const {getAccessToken} = useAuth();

  const onClickDelete = () => {
    AdminControllerApi.deleteSource(getAccessToken(), record.id, (source, error) => {
      if (error) {
        toast('Impossible de supprimer cette source !', {type: 'error'})
      } else if (source) {
        toast('Source supprimer avec succès !', {type: 'success'})
        onOk();
      }
    });
  }

    return(
        <Modal
            title="Supprimer"
            open={open}
            onOk={onClickDelete}
            onCancel={onCancel}
            okText="Supprimer"
            cancelText="Annuler"
        >
            <p>Êtes-vous sûr de vouloir supprimer la source <b>{record.name}</b> <b><i>{record.link}</i></b> ?</p>
        </Modal>
    )
}
