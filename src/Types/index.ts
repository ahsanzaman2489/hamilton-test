export type Collections = {
    name: string;
    resourceURI: string;
};

export type Links = {
    url: string;
    type: string;
};

export type Character = {
    id: number;
    name: string;
    description: string;
    modified: string;
    series: {
        available: string
        items: Array<Collections>;
    };
    comics: {
        available: string;
        items: Array<Collections>;
    };
    stories: {
        available: string;
        items: Array<Collections>;
    };
    events: {
        available: string;
        items: Array<Collections>;
    };
    thumbnail: {
        path: string;
        extension: string;
    }
    urls: Array<Links>
}; // single Character schema

export type CharacterListApiResponse = {
    data: {
        results: Array<Character>
        count: number,
        limit: number,
        offset: number,
        total: number
    };
};// Character APi response schema from Server