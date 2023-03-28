export interface IStoryItem {
    title: string,
    filename: string,
    store: string,
    owner: string,
    group: string,
    created: string,
    modified: string;
}

export interface IResultList {
    amount: number,
    items: IStoryItem[]
}