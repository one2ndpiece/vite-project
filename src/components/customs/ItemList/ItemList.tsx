import React from 'react';
import { Item } from 'src/types/types';
import ItemCard from '../ItemCard/ItemCard';

interface ItemListProps {
    items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
    return (
        <div className="flex flex-wrap justify-center">
            {items.map(item => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};

export default ItemList;
