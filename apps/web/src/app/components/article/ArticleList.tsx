// @flow
import * as React from 'react';
import {Article} from "@count-of-money/shared";
import {ArticleItem} from "./ArticleItem";

type Props = {
  articles: Article[];
};

export const ArticleList = (props: Props) => {
  return (
    <div>
      {props.articles.map((article, index) => <ArticleItem key={index} article={article}/>)}
    </div>
  );
};
