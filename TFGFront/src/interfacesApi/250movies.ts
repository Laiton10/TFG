export interface The250Movies {
    id:                  string;
    url:                 string;
    primaryTitle:        string;
    originalTitle:       string;
    type:                Type;
    description:         string;
    primaryImage:        string;
    trailer:             null | string;
    contentRating:       ContentRating | null;
    startYear:           number;
    endYear:             null;
    releaseDate:         Date | null;
    interests:           string[];
    countriesOfOrigin:   string[];
    externalLinks:       string[] | null;
    spokenLanguages:     string[] | null;
    filmingLocations:    string[] | null;
    productionCompanies: ProductionCompany[] | null;
    budget:              number | null;
    grossWorldwide:      number | null;
    genres:              Genre[];
    isAdult:             boolean;
    runtimeMinutes:      number;
    averageRating:       number;
    numVotes:            number;
    metascore:           number | null;
}

export enum ContentRating {
    Approved = "Approved",
    G = "G",
    Nc17 = "NC-17",
    NotRated = "Not Rated",
    PG = "PG",
    PG13 = "PG-13",
    Passed = "Passed",
    R = "R",
}

export enum Genre {
    Action = "Action",
    Adventure = "Adventure",
    Animation = "Animation",
    Biography = "Biography",
    Comedy = "Comedy",
    Crime = "Crime",
    Drama = "Drama",
    Family = "Family",
    Fantasy = "Fantasy",
    FilmNoir = "Film-Noir",
    History = "History",
    Horror = "Horror",
    Music = "Music",
    Musical = "Musical",
    Mystery = "Mystery",
    Romance = "Romance",
    SciFi = "Sci-Fi",
    Sport = "Sport",
    Thriller = "Thriller",
    War = "War",
    Western = "Western",
}

export interface ProductionCompany {
    id:   string;
    name: string;
}

export enum Type {
    Movie = "movie",
}
