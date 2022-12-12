import {Checkbox, Input, Modal} from "antd";
import {useAuth} from "../hooks/useAuth";
import {useCallback} from "react";
import {get, useForm} from "react-hook-form";
import {AdminControllerApi} from "../controllers/AdminControllerApi";
import {toast} from "react-toastify";

type Props = {
    open: boolean,
    onOk: () => void,
    onCancel: () => void
}

type Form = {
  name: string;
  link: string;
  enable: boolean;
}

export function AddSourceModal({onOk, onCancel, open} : Props) {

  const {getAccessToken} = useAuth();
  const {watch, getValues, setValue} = useForm<Form>({defaultValues: {enable: true, link: '', name: ''}});

  const onClickCreate = useCallback(() => {
    AdminControllerApi.createSource(getAccessToken(), getValues(), (source, error) => {
      if (source) {
        toast('Source créer avec succès', {type: 'success'});
        onOk();
      } else {
        toast('Une erreur est survenue !', {type: 'error'});
      }
    })
  }, [getAccessToken, getValues, onOk]);

    return(
        <Modal
            title="Nouvelle source"
            open={open}
            onOk={onClickCreate}
            onCancel={onCancel}
            okText="Créer"
            cancelText="Annuler"
        >
          <Input style={{marginTop: '2vh'}} placeholder="Nom" value={watch('name')} onChange={(e) => setValue('name', e.currentTarget.value)}/>
          <Input style={{marginTop: '1vh'}} placeholder="https://..." value={watch('link')} onChange={(e) => setValue('link', e.currentTarget.value)}/>
          <Checkbox style={{marginTop: '1vh'}} checked={watch('enable')} onChange={(e) => setValue('enable', e.target.checked)}>Activer</Checkbox>
        </Modal>
    )
}
