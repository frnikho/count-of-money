export interface CryptoApi {
  id:                              ID;
  symbol:                          string;
  name:                            string;
  asset_platform_id:               null;
  platforms:                       Platforms;
  detail_platforms:                DetailPlatforms;
  block_time_in_minutes:           number;
  hashing_algorithm:               string;
  categories:                      string[];
  public_notice:                   null;
  additional_notices:              unknown[];
  localization:                    Tion;
  description:                     Tion;
  links:                           Links;
  image:                           Image;
  country_origin:                  string;
  genesis_date:                    Date;
  sentiment_votes_up_percentage:   number;
  sentiment_votes_down_percentage: number;
  market_cap_rank:                 number;
  coingecko_rank:                  number;
  coingecko_score:                 number;
  developer_score:                 number;
  community_score:                 number;
  liquidity_score:                 number;
  public_interest_score:           number;
  market_data:                     MarketData;
  community_data:                  CommunityData;
  developer_data:                  DeveloperData;
  public_interest_stats:           PublicInterestStats;
  status_updates:                  unknown[];
  last_updated:                    Date;
  tickers:                         Ticker[];
}

export interface CommunityData {
  facebook_likes:              null;
  twitter_followers:           number;
  reddit_average_posts_48h:    number;
  reddit_average_comments_48h: number;
  reddit_subscribers:          number;
  reddit_accounts_active_48h:  number;
  telegram_channel_user_count: null;
}

export interface Tion {
  en:      string;
  de:      string;
  es:      string;
  fr:      string;
  it:      string;
  pl:      string;
  ro:      string;
  hu:      string;
  nl:      string;
  pt:      string;
  sv:      string;
  vi:      string;
  tr:      string;
  ru:      string;
  ja:      string;
  zh:      string;
  "zh-tw": string;
  ko:      string;
  ar:      string;
  th:      string;
  id:      string;
  cs:      string;
  da:      string;
  el:      string;
  hi:      string;
  no:      string;
  sk:      string;
  uk:      string;
  he:      string;
  fi:      string;
  bg:      string;
  hr:      string;
  lt:      string;
  sl:      string;
}

export interface DetailPlatforms {
  "": Empty;
}

export interface Empty {
  decimal_place:    null;
  contract_address: string;
}

export interface DeveloperData {
  forks:                               number;
  stars:                               number;
  subscribers:                         number;
  total_issues:                        number;
  closed_issues:                       number;
  pull_requests_merged:                number;
  pull_request_contributors:           number;
  code_additions_deletions_4_weeks:    CodeAdditionsDeletions4_Weeks;
  commit_count_4_weeks:                number;
  last_4_weeks_commit_activity_series: number[];
}

export interface CodeAdditionsDeletions4_Weeks {
  additions: number;
  deletions: number;
}

export enum ID {
  BinanceUsd = "binance-usd",
  Bitcoin = "bitcoin",
  Ripple = "ripple",
  Tether = "tether",
  UsdCoin = "usd-coin",
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface Links {
  homepage:                      string[];
  blockchain_site:               string[];
  official_forum_url:            string[];
  chat_url:                      string[];
  announcement_url:              string[];
  twitter_screen_name:           ID;
  facebook_username:             string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier:   string;
  subreddit_url:                 string;
  repos_url:                     ReposURL;
}

export interface ReposURL {
  github:    string[];
  bitbucket: unknown[];
}

export interface MarketData {
  current_price:                                { [key: string]: number };
  total_value_locked:                           null;
  mcap_to_tvl_ratio:                            null;
  fdv_to_tvl_ratio:                             null;
  roi:                                          null;
  ath:                                          { [key: string]: number };
  ath_change_percentage:                        { [key: string]: number };
  ath_date:                                     { [key: string]: Date };
  atl:                                          { [key: string]: number };
  atl_change_percentage:                        { [key: string]: number };
  atl_date:                                     { [key: string]: Date };
  market_cap:                                   { [key: string]: number };
  market_cap_rank:                              number;
  fully_diluted_valuation:                      { [key: string]: number };
  total_volume:                                 { [key: string]: number };
  high_24h:                                     { [key: string]: number };
  low_24h:                                      { [key: string]: number };
  price_change_24h:                             number;
  price_change_percentage_24h:                  number;
  price_change_percentage_7d:                   number;
  price_change_percentage_14d:                  number;
  price_change_percentage_30d:                  number;
  price_change_percentage_60d:                  number;
  price_change_percentage_200d:                 number;
  price_change_percentage_1y:                   number;
  market_cap_change_24h:                        number;
  market_cap_change_percentage_24h:             number;
  price_change_24h_in_currency:                 { [key: string]: number };
  price_change_percentage_1h_in_currency:       { [key: string]: number };
  price_change_percentage_24h_in_currency:      { [key: string]: number };
  price_change_percentage_7d_in_currency:       { [key: string]: number };
  price_change_percentage_14d_in_currency:      { [key: string]: number };
  price_change_percentage_30d_in_currency:      { [key: string]: number };
  price_change_percentage_60d_in_currency:      { [key: string]: number };
  price_change_percentage_200d_in_currency:     { [key: string]: number };
  price_change_percentage_1y_in_currency:       { [key: string]: number };
  market_cap_change_24h_in_currency:            { [key: string]: number };
  market_cap_change_percentage_24h_in_currency: { [key: string]: number };
  total_supply:                                 number;
  max_supply:                                   number;
  circulating_supply:                           number;
  last_updated:                                 Date;
}

export interface Platforms {
  "": string;
}

export interface PublicInterestStats {
  alexa_rank:   number;
  bing_matches: null;
}

export interface Ticker {
  base:                      string;
  target:                    string;
  market:                    Market;
  last:                      number;
  volume:                    number;
  converted_last:            { [key: string]: number };
  converted_volume:          { [key: string]: number };
  trust_score:               TrustScore;
  bid_ask_spread_percentage: number;
  timestamp:                 Date;
  last_traded_at:            Date;
  last_fetch_at:             Date;
  is_anomaly:                boolean;
  is_stale:                  boolean;
  trade_url:                 null | string;
  token_info_url:            null;
  coin_id:                   string;
  target_coin_id?:           ID;
}

export interface Market {
  name:                  string;
  identifier:            string;
  has_trading_incentive: boolean;
}

export enum TrustScore {
  Green = "green",
}
