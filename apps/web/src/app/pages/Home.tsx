import {useAuth} from "../hooks/useAuth";
import {CryptoListComponent} from "../components/crypto/CryptoList";
import {useCallback, useEffect, useState} from "react";
import {UserApiController} from "../controllers/UserApiController";
import {AuthState} from "../contexts/UserContext";
import {Article, CryptoList} from "@count-of-money/shared";
import {ArticleApiController} from "../controllers/ArticleApiController";
import {ArticleList} from "../components/article/ArticleList";
import '../styles/text.scss';
import {CryptoControllerApi} from "../controllers/CryptoControllerApi";
import {toast} from "react-toastify";
import {LoadingCrypto} from "../components/LoadingCrypto";
import {Button} from "antd";
import {useModals} from "../hooks/useModals";
import {CreateListModal} from "../modals/list/CreateListModal";

type Modals = {
  createList: boolean;
}

export function Home() {

  const {authState, getAccessToken} = useAuth();
  const [cryptoList, setCryptoList] = useState<CryptoList[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const {createList, updateModals} = useModals<Modals>({createList: false});

  const loadPublicCryptoList = useCallback(() => {
    CryptoControllerApi.getPublic((crypto) => {
      if (crypto) {
        setCryptoList([{cryptos: crypto, name: 'Invité', id: '1'}]);
      } else {
        toast('Une erreur est survenue', {type: 'error'});
      }
    })
  }, []);

  const loadCryptoList = useCallback(() => {
    if (authState === AuthState.Logged) {
      UserApiController.getCryptoList(getAccessToken(), (cryptoList) => {
        if (cryptoList && cryptoList.length <= 0) {
          loadPublicCryptoList();
        } else if (cryptoList) {
          setCryptoList(cryptoList);
        }
      });
    } else {
      loadPublicCryptoList();
    }
  }, [authState, getAccessToken, loadPublicCryptoList]);

  const  loadArticles = useCallback(() => {
    if (authState === AuthState.Logged) {
      ArticleApiController.loadArticles(getAccessToken(), (articles) => {
        setArticles(articles);
      })
    } else if (authState === AuthState.NotLogged) {
      ArticleApiController.loadPublicArticles((articles) => {
        setArticles(articles);
      });
    }
  }, [authState, getAccessToken]);

  useEffect(() => {
    loadArticles();
    loadCryptoList();
  }, [loadArticles, loadCryptoList, authState]);

  const onClickCreateNewList = useCallback(() => updateModals('createList', true), [updateModals]);

  const onListCreated = useCallback(() => {
    toast('Nouvelle liste créer avec succès !', {type: 'success'});
    updateModals('createList', false);
    loadCryptoList();
  }, [updateModals, loadCryptoList]);

  const onModalClose = useCallback(() => updateModals('createList', false), [updateModals]);

  if (articles.length === 0 || cryptoList.length === 0) {
    return (<LoadingCrypto/>)
  }

  return (
    <>
      <CreateListModal open={createList} onOk={onListCreated} onClose={onModalClose}/>
      {cryptoList.map((c, index) => <CryptoListComponent key={index} list={c}/>)}
      <Button title={authState !== AuthState.Logged ? "Vous devez être connecter pour créer une nouvelle liste" : 'Créer une nouvelle liste'} disabled={authState !== AuthState.Logged} type={'primary'} style={{marginTop: '1em'}} onClick={onClickCreateNewList}>Créer une nouvelle liste</Button>
      <h1 className={"title"} style={{marginTop: 50}}>Articles</h1>
      <ArticleList articles={articles}/>
    </>
  );
}
