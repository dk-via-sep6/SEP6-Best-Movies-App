import { PersonInfoRole } from "./personInfoRole";

export interface PersonInfo {
  id: number;
  name: string;
  isAdultFilmStar: boolean;
  knownFor: PersonInfoRole[];
  profilePath: string;
  popularity: number;
}
