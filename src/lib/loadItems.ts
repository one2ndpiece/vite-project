import itemsRawData from 'src/data/item_info/14.13.1.json';
import { Item, ItemJsonType, ItemListJsonType } from 'src/types/types';

const loadItems = (): Item[] => {
    if (itemsRawData == null) {
        return [];
    }

    const targetData: ItemListJsonType = itemsRawData;

    // for文ではなく配列の関数（filter, mapなど）使った方が処理が明確になる
    // Object.entries(XXX)はXXXを[[Key, Value], [Key, Value],...]のように配列で表現できる
    return Object.entries(targetData)
        .filter(itemDataEntries => {
            // 表示不要なアイテムを配列から除外する
            const itemData = itemDataEntries[1];
            return !excludeItems(itemData);
        }).map(keyValueArray => {
            // ItemのJsonデータをItem型に変換する
            const itemId = keyValueArray[0];
            const itemData = keyValueArray[1];
            const item: Item = {
                id: Number(itemId),
                name: itemData.name,
                image: itemData.image.full,
                cost: itemData.gold.total,
                description: itemData.description,
                stats: itemData.stats
            };
            return item;
        });
}

// 表示しないアイテムを選別する
const excludeItems = (itemData: ItemJsonType): boolean => {
    if (itemData.gold == null || itemData.maps == null) {
        return true;
    }
    return !itemData.gold.purchasable || !itemData.maps["11"];
}

export default loadItems;