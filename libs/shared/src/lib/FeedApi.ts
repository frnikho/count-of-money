export interface FeedApi {
  status: string;
  feed:   Feed;
  items:  Item[];
}

export interface Feed {
  url:         string;
  title:       string;
  link:        string;
  author:      string;
  description: string;
  image:       string;
}

export interface Item {
  title:       string;
  pubDate:     Date;
  link:        string;
  guid:        string;
  author:      unknown;
  thumbnail:   string;
  description: string;
  content:     string;
  enclosure:   unknown;
  categories:  unknown[];
}
