import { Checkbox, Input, Modal } from "antd";
import { Source } from "@count-of-money/shared";

type Props = {
    record: Source,
    open: boolean,
    onOk: () => void,
    onCancel: () => void
}

export function UpdateSourceModal({record, onOk, onCancel, open} : Props) {
    return(
        <Modal
            title={record.name}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText="Mettre à jour"
            cancelText="Annuler"
        >
            <Input style={{marginTop: '2vh'}} defaultValue={record.link} />
            <Checkbox style={{paddingTop: '2vh'}} defaultChecked={record.enable}>Actif</Checkbox>
        </Modal>
    )
}