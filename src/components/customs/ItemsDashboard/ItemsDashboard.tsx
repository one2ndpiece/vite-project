import React, { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Item } from 'src/types/types';
import ItemList from '../ItemList/ItemList';
import loadItems from 'src/lib/loadItems';


const SAMPLE_ITEMS: Item[] = loadItems();

const ItemsDashboard: React.FC = () => {
    const allStats = [...new Set(SAMPLE_ITEMS.flatMap(item => Object.keys(item.stats)))];

    const initialSelectedStats = allStats.reduce((acc, stat) => {
        acc[stat] = true;
        return acc;
    }, {} as Record<string, boolean>);

    const [selectedStats, setSelectedStats] = useState<Record<string, boolean>>(initialSelectedStats);
    const [sortBy, setSortBy] = useState<'name' | 'cost'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleStatChange = (stat: string) => {
        setSelectedStats(prev => ({ ...prev, [stat]: !prev[stat] }));
    };

    const handleSort = (field: 'name' | 'cost') => {
        if (field === sortBy) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const filteredItems = SAMPLE_ITEMS.filter(item => {
        if (Object.keys(selectedStats).length === 0) return true;
        return Object.keys(selectedStats).some(stat =>
            selectedStats[stat] && stat in item.stats
        );
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else {
            return sortOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost;
        }
    });

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">League of Legends Items</h1>

                <div className="mb-8 bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-300">Filter by Stats</h2>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {allStats.map(stat => (
                            <Button
                                key={stat}
                                onClick={() => handleStatChange(stat)}
                                className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    ${selectedStats[stat]
                                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                                        : 'bg-transparent text-blue-300 border border-blue-500 hover:bg-blue-500 hover:text-white'}
                    transition-colors duration-300
                  `}
                            >
                                {stat}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-blue-300">Sort by:</span>
                        <Button
                            onClick={() => handleSort('name')}
                            className={`
                  px-4 py-2 rounded-full text-sm font-medium
                  ${sortBy === 'name'
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'bg-transparent text-blue-300 border border-blue-500 hover:bg-blue-500 hover:text-white'}
                  transition-colors duration-300
                `}
                        >
                            Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </Button>
                        <Button
                            onClick={() => handleSort('cost')}
                            className={`
                  px-4 py-2 rounded-full text-sm font-medium
                  ${sortBy === 'cost'
                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                    : 'bg-transparent text-blue-300 border border-blue-500 hover:bg-blue-500 hover:text-white'}
                  transition-colors duration-300
                `}
                        >
                            Cost {sortBy === 'cost' && (sortOrder === 'asc' ? '↑' : '')}
                        </Button>
                    </div>
                </div>

                <ItemList items={sortedItems} />
            </div>
        </div>
    );
};

export default ItemsDashboard;