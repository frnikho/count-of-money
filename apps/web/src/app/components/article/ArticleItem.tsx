import * as React from 'react';
import {Article} from "@count-of-money/shared";
import {useNavigate} from "react-router-dom";
import './ArticleItem.scss';

type Props = {
  article: Article;
};

export const ArticleItem = ({article}: Props) => {

  const navigate = useNavigate();

  const onClickArticle = () => {
    navigate(`/article/${article.source}/${encodeURIComponent(article.guid)}`);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '1.8em', marginTop: '1.6em'}} onClick={onClickArticle}>
      <img className={"article_img"} onClick={() => null} width={400} style={{cursor: 'pointer', borderRadius: 18, objectFit: 'cover', maxWidth: 400, maxHeight: 200}} src={article.thumbnail} alt={"Article cover"}/>
      <div style={{maxWidth: 600, minWidth: 200}}>
        <h1 className={"article_title"}>{article.title}</h1>
        <p className={"article_desc"}>{article.description}</p>
        <p className={"article_date"}>{new Date(article.pubDate).toLocaleDateString('fr')} à {new Date(article.pubDate).toLocaleTimeString('fr')}</p>
        <p className={"article_author"}>{article.author as string}</p>
      </div>
    </div>
  );
};
