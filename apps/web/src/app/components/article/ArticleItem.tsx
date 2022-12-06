import * as React from 'react';
import {Article} from "@count-of-money/shared";
import {useNavigate} from "react-router-dom";

type Props = {
  article: Article;
};

export const ArticleItem = ({article}: Props) => {

  const navigate = useNavigate();

  const onClickArticle = () => {
    navigate(`/article/${article.guid}`)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row', gap: '1.8em', margin: '0.6em'}}>
      <img onClick={() => null} width={400} style={{objectFit: 'cover', maxWidth: 400, maxHeight: 200}} src={article.thumbnail} alt={"Article cover"}/>
      <div style={{maxWidth: 600, minWidth: 200}}>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <p>{new Date(article.pubDate).toLocaleDateString('fr')} à {new Date(article.pubDate).toLocaleTimeString('fr')}</p>
        <p>{article.author as string}</p>
      </div>
    </div>
  );
};
