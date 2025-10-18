export interface MovieOrTvSearchResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
  is_tmbd: boolean;
}

export interface PodcastSearchResult {
  rss: "Please upgrade to PRO or ENTERPRISE plan to see this field. Learn more: listennotes.com/api/pricing";
  description_highlighted: '...Down The <span class="ln-search-highlight">Dog</span> with Jon Richardson and Matt Forde...';
  description_original: "Down The Dog with Jon Richardson and Matt Forde";
  title_highlighted: 'Down The <span class="ln-search-highlight">Dog</span>';
  title_original: "Down The Dog";
  publisher_highlighted: "Keep It Light Media / Feral Television";
  publisher_original: "Keep It Light Media / Feral Television";
  image: "https://cdn-images-3.listennotes.com/podcasts/down-the-dog-keep-it-light-media-feral-zWVgxO27eD0-HgliS7v0qux.300x300.jpg";
  thumbnail: "https://cdn-images-3.listennotes.com/podcasts/down-the-dog-keep-it-light-media-feral-zWVgxO27eD0-HgliS7v0qux.300x300.jpg";
  itunes_id: 1579604192;
  latest_episode_id: "Please upgrade to PRO or ENTERPRISE plan to see this field. Learn more: listennotes.com/api/pricing";
  latest_pub_date_ms: 1760493660000;
  earliest_pub_date_ms: 1628037599206;
  id: "f3fc22747368403ea32d783b1033da71";
  genre_ids: [133, 77, 251];
  listennotes_url: "https://www.listennotes.com/c/f3fc22747368403ea32d783b1033da71/";
  total_episodes: 219;
  audio_length_sec: 2549;
  update_frequency_hours: 277;
  email: "Please upgrade to PRO or ENTERPRISE plan to see this field. Learn more: listennotes.com/api/pricing";
  explicit_content: true;
  website: "https://www.spreaker.com/show/comedians-playing-fantasy-premier-league?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website";
  listen_score: "Please upgrade to PRO or ENTERPRISE plan to see this field. Learn more: listennotes.com/api/pricing";
  listen_score_global_rank: "Please upgrade to PRO or ENTERPRISE plan to see this field. Learn more: listennotes.com/api/pricing";
  has_sponsors: true;
  has_guest_interviews: false;
}

export interface VideoSearchResult {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: true;
    contentRating: {};
    projection: string;
  };
}

export interface BookSearchResult {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice: {
      amount: number;
      currencyCode: string;
    };
    retailPrice: {
      amount: number;
      currencyCode: string;
    };
    buyLink: string;
    offers: {
      finskyOfferType: number;
      listPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
      retailPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
      giftable: true;
    }[];
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
      acsTokenLink: string;
    };
    pdf: {
      isAvailable: boolean;
      acsTokenLink: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
  searchInfo: {
    textSnippet: string;
  };
}

export type SearchResult = (
  | MovieOrTvSearchResult
  | PodcastSearchResult
  | VideoSearchResult
  | BookSearchResult
) & {
  is_listen_notes?: boolean;
  is_tmdb?: boolean;
  is_youtube?: boolean;
};

export const isMovieOrTvSearchResult = (
  searchResult: SearchResult
): searchResult is MovieOrTvSearchResult => !!searchResult.is_tmdb;

export const isPodcastResult = (
  searchResult: SearchResult
): searchResult is PodcastSearchResult => !!searchResult.is_listen_notes;

export const isVideoResult = (
  searchResult: SearchResult
): searchResult is VideoSearchResult => !!searchResult.is_youtube;
