import { useCallback, useState } from "react";

type Modals = {
  [key in string]: boolean;
}

export function useModals<T extends Modals>(initial: T) {

  const [modals, setModals] = useState<T>(initial);

  const updateModals = useCallback((key: keyof T, value: boolean) => {
      setModals({
        ...modals,
        [key]: value
      })
    }, [modals]);

  const updateAllModals = useCallback((value: T) => {
      setModals(value);
    }, []);

  return {
    updateModals,
    updateAllModals,
    ...modals,
  }

}
