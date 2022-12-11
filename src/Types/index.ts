export type Character = {
    id: number;
    name: string;
    description: string;
    modified: string;
    series: {
        available: string
    };
    comics: {
        available: string
    };
    stories: {
        available: string
    };
    events: {
        available: string
    };
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