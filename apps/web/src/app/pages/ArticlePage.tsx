import {useNavigate, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {ArticleApiController} from "../controllers/ArticleApiController";
import * as ArticleApi from "@count-of-money/shared";
import { Article } from "../components/article";

type Params = {
  sourceId: string;
  articleId: string;
}

export const ArticlePage = () => {

  const navigate = useNavigate();
  const params = useParams<Params>();
  const [article, setArticle] = useState<ArticleApi.Article | undefined>(undefined);

  const loadArticle = useCallback((sourceId: string, articleId: string) => {
    ArticleApiController.loadArticle(sourceId, articleId, (article, error) => {
      if (article) {
        setArticle(article);
      } else {
        toast('Impossible de récupérer l\'article !', {type: 'error'});
      }
    });
  }, []);

  useEffect(() => {
    if (params.articleId && params.sourceId) {
      loadArticle(encodeURIComponent(params.sourceId), encodeURIComponent(params.articleId));
    } else {
      toast('Impossible de récupérer l\'article !', {type: 'error'});
      navigate('/');
    }
  }, [navigate, params.articleId, params.sourceId, loadArticle])

  return (
      article ? <Article src={article.thumbnail} link={article.link} author={article.author as string} title={article.title} date={new Date(article.pubDate)} body={article.content}/> : null
  );
};
