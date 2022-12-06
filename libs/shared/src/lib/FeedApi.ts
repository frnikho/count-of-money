import {ApiProperty} from "@nestjs/swagger";

export interface FeedApi {
  status: string;
  feed:   Feed;
  items:  Article[];
}

export class Feed {
  @ApiProperty()
  url:         string;

  @ApiProperty()
  title:       string;

  @ApiProperty()
  link:        string;

  @ApiProperty()
  author:      string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image:       string;

  constructor(url: string, title: string, link: string, author: string, description: string, image: string) {
    this.url = url;
    this.title = title;
    this.link = link;
    this.author = author;
    this.description = description;
    this.image = image;
  }
}

export class Article {
  @ApiProperty()
  title:       string;

  @ApiProperty()
  pubDate:     Date;

  @ApiProperty()
  link:        string;

  @ApiProperty()
  guid:        string;

  @ApiProperty()
  author:      unknown;

  @ApiProperty()
  thumbnail:   string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  content:     string;

  @ApiProperty()
  enclosure:   unknown;

  @ApiProperty()
  categories:  unknown[];

  constructor(title: string, pubDate: Date, link: string, guid: string, author: unknown, thumbnail: string, description: string, content: string, enclosure: unknown, categories: unknown[]) {
    this.title = title;
    this.pubDate = pubDate;
    this.link = link;
    this.guid = guid;
    this.author = author;
    this.thumbnail = thumbnail;
    this.description = description;
    this.content = content;
    this.enclosure = enclosure;
    this.categories = categories;
  }
}
