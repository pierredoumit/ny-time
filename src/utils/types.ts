interface MediaMetadata {
  url: string;
  width: number;
  height: number;
}

interface Media {
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  approved_for_syndication: boolean;
  'media-metadata': MediaMetadata[];
}

export interface Article {
  url: string;
  adx_keywords: string;
  column: string | null;
  section: string;
  byline: string;
  type: string;
  title: string;
  abstract: string;
  published_date: string;
  source: string;
  id: number;
  asset_id: number;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  media: Media[];
}
