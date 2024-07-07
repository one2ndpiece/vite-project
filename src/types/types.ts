export interface Item {
    id: number;
    name: string;
    cost: number;
    description: string;
    stats: ItemStat;
    image: string
}

export interface ItemStat {
    [key: string]: number;
}

export type ItemListJsonType = {
    [itemId: string]: ItemJsonType;
}

export type ItemJsonType = {
    name: string,
    description: string,
    gold: {
        base: number,
        purchasable: boolean,
        total: number,
        sell: number
    },
    image: {
        full: string
    }
    maps: {
        [mapId: string]: boolean
    },
    stats: {
        [statsName: string]: number
    }
}