export interface IsearchResult {
  Title?: string
  Year?: string
  imdbID?: string
  Type?: string
  Poster?: string
}

export interface ImovieAPIRes {
  Search: IsearchResult[]
  totalResults?: string
  Response?: string
  Error?: string
}
