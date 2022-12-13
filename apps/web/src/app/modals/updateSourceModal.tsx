import { Checkbox, Input, Modal } from "antd";
import { Source } from "@count-of-money/shared";
import {useAuth} from "../hooks/useAuth";
import {useForm} from "react-hook-form";
import {useCallback} from "react";
import {AdminControllerApi} from "../controllers/AdminControllerApi";
import {toast} from "react-toastify";

type Props = {
    record: Source,
    open: boolean,
    onOk: () => void,
    onCancel: () => void
}

type Form = {
  link: string;
  enable: boolean;
}

export function UpdateSourceModal({record, onOk, onCancel, open} : Props) {

  const {getAccessToken} = useAuth();
  const {watch, getValues, setValue} = useForm<Form>({defaultValues: {enable: record.enable, link: record.link}});

  const onClickUpdate = useCallback(() => {
    AdminControllerApi.updateSource(getAccessToken(), record.id, {...getValues()}, (source, error) => {
      if (error) {
        toast('Impossible de mettre à jour la source !', {type: 'error'})
      } else if (source) {
        toast('Source mise à jour !', {type: 'success'});
        onOk();
      }
    });
  }, [getAccessToken, getValues , onOk, record.id]);

    return(
        <Modal
            title={record.name}
            open={open}
            onOk={onClickUpdate}
            onCancel={onCancel}
            okText="Mettre à jour"
            cancelText="Annuler">
            <Input style={{marginTop: '2vh'}} defaultValue={record.link} value={watch('link')} onChange={(e) => setValue('link', e.currentTarget.value)}/>
            <Checkbox style={{paddingTop: '2vh'}} defaultChecked={record.enable} checked={watch('enable')} onChange={(e) => setValue('enable', e.target.checked)} >Actif</Checkbox>
        </Modal>
    )
}
