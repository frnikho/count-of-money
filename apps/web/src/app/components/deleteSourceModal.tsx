import { Modal } from "antd";
import { Source } from "@count-of-money/shared";

type Props = {
    record: Source,
    open: boolean,
    onOk: () => void,
    onCancel: () => void
}

export function DeleteSourceModal({record, onOk, onCancel, open} : Props) {
    return(
        <Modal
            title="Supprimer"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Supprimer"
            cancelText="Annuler"
        >
            <p>Êtes-vous sûr de vouloir supprimer la source <b>{record.name}</b> <b><i>{record.link}</i></b> ?</p>
        </Modal>
    )
}