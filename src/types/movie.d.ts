export interface IsearchResult {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface ImovieAPIRes {
  Search: IsearchResult[]
  totalResults: number
  Response: boolean
}
