export enum Gender
{
    Unknown,
    Female,
    Male
}

export interface Person{
    id: number;
    name: string;
    alsoKnownAs: string[];
    isAdultFilmStar: boolean;
    biography: string;
    birthday: string;
    deathday: string;
    gender: Gender;
    placeOfBirth: string;
    popularity: number;
    profilePath: string;
}