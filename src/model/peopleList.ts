export interface PeopleResult {
  id: number;
  name: string;
  profile_Path: string;
  popularity: number;
  topKnownForTitles: string;
}

export interface PeopleList {
  page: number;
  results: PeopleResult[];
  total_pages: number;
  total_results: number;
}
