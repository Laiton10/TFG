export interface SearchByTitle {
    itemType:         ItemType;
    showType:         ShowType;
    id:               string;
    imdbId:           string;
    tmdbId:           string;
    title:            string;
    overview:         string;
    releaseYear:      number;
    originalTitle:    string;
    genres:           Genre[];
    directors:        string[];
    cast:             string[];
    rating:           number;
    runtime?:         number;
    imageSet:         SearchByTitleImageSet;
    streamingOptions: StreamingOptions;
}

export interface Genre {
    id:   string;
    name: string;
}

export interface SearchByTitleImageSet {
    verticalPoster:      Vertical;
    horizontalPoster:    Horizontal;
    verticalBackdrop?:   Vertical;
    horizontalBackdrop?: Horizontal;
}

export interface Horizontal {
    w360:  string;
    w480:  string;
    w720:  string;
    w1080: string;
    w1440: string;
}

export interface Vertical {
    w240: string;
    w360: string;
    w480: string;
    w600: string;
    w720: string;
}

export enum ItemType {
    Show = "show",
}

export enum ShowType {
    Movie = "movie",
}

export interface StreamingOptions {
    es?: E[];
}

export interface E {
    service:        Addon;
    type:           Type;
    link:           string;
    videoLink?:     string;
    quality:        Quality;
    audios:         Audio[];
    subtitles:      Subtitle[];
    expiresSoon:    boolean;
    availableSince: number;
    price?:         Price;
    addon?:         Addon;
}

export interface Addon {
    id:             ID;
    name:           Name;
    homePage:       string;
    themeColorCode: ThemeColorCode;
    imageSet:       AddonImageSet;
}

export enum ID {
    Amcselektes = "amcselektes",
    Apple = "apple",
    Maxes = "maxes",
    Netflix = "netflix",
    Prime = "prime",
}

export interface AddonImageSet {
    lightThemeImage: string;
    darkThemeImage:  string;
    whiteImage:      string;
}

export enum Name {
    AmcSelekt = "AMC SELEKT",
    AppleTV = "Apple TV",
    Max = "Max",
    Netflix = "Netflix",
    PrimeVideo = "Prime Video",
}

export enum ThemeColorCode {
    E50914 = "#E50914",
    The000000 = "#000000",
    The00A8E1 = "#00A8E1",
}

export interface Audio {
    language: string;
    region?:  string;
}

export interface Price {
    amount:    string;
    currency:  Currency;
    formatted: string;
}

export enum Currency {
    Eur = "EUR",
}

export enum Quality {
    HD = "hd",
    SD = "sd",
    Uhd = "uhd",
}

export interface Subtitle {
    closedCaptions: boolean;
    locale:         Audio;
}

export enum Type {
    Addon = "addon",
    Buy = "buy",
    Rent = "rent",
    Subscription = "subscription",
}
