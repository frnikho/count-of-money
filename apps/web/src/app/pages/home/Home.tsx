import {useAuth} from "../../hooks/useAuth";
import {CryptoListComponent} from "../../components/crypto/CryptoList";
import {useCallback, useEffect, useState} from "react";
import {UserApiController} from "../../controllers/UserApiController";
import {AuthState} from "../../contexts/UserContext";
import {Article, CryptoList} from "@count-of-money/shared";
import {ArticleApiController} from "../../controllers/ArticleApiController";
import {ArticleList} from "../../components/article/ArticleList";

export function Home() {

  const {authState, getAccessToken} = useAuth();
  const [cryptoList, setCryptoList] = useState<CryptoList[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  const loadCryptoList = useCallback(() => {
    if (authState === AuthState.Logged) {
      UserApiController.getCryptoList(getAccessToken(), (cryptoList, error) => {
        if (cryptoList)
          setCryptoList(cryptoList);
      });
    } else {
      //TODO get default crypto list
      setCryptoList([]);
    }
  }, [authState, getAccessToken]);

  const  loadArticles = useCallback(() => {
    if (authState === AuthState.Logged) {
      ArticleApiController.loadArticles(getAccessToken(), (articles, error) => {
        setArticles(articles);
      })
    } else if (authState === AuthState.NotLogged) {
      console.log('NOT LOGGED !');
      ArticleApiController.loadPublicArticles((articles, error) => {
        setArticles(articles);
      });
    }
  }, [authState, getAccessToken]);

  useEffect(() => {
    loadArticles();
    loadCryptoList();
  }, [loadArticles, loadCryptoList]);

  return (
    <>
      {cryptoList.map((c, index) => <CryptoListComponent key={index} list={c}/>)}
      <ArticleList articles={articles}/>
    </>
  );
}
