export interface IStoryItem {
    title: string,
    filename: string,
    store: string,
    owner: string,
    groep: string,
    created: string,
    modified: string,
    status: string,
    id: number,
    uuid: string
}

export interface IResultList {
    status: string,
    structure: IStoryItem[]
}