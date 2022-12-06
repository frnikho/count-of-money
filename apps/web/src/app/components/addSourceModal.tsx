import { Input, Modal } from "antd";

type Props = {
    open: boolean,
    onOk: () => void,
    onCancel: () => void
}

export function AddSourceModal({onOk, onCancel, open} : Props) {
    return(
        <Modal
            title="Nouvelle source"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Créer"
            cancelText="Annuler"
        >
            <Input style={{marginTop: '2vh'}} placeholder="Nom" />
            <Input style={{marginTop: '1vh'}} placeholder="https://..." />
        </Modal>
    )
}