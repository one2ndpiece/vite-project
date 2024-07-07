import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogTrigger
} from 'src/components/ui/alert-dialog';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Item } from 'src/types/types';

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Card
                    className={`w-60 h-90 m-2 bg-gray-800 text-white border border-gray-700 shadow-md transition-all duration-300 cursor-pointer ${isHovered ? 'shadow-lg scale-105' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <CardHeader>
                        <img src={`${import.meta.env.BASE_URL}src/data/images/14.13.1/${item.image}`} alt="item thumbnail" style={{ width: '150px', height: '150px' }} />
                        <CardTitle className="text-blue-400">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-400">Cost: {item.cost} gold</p>
                        <p className="mt-2 text-gray-300" dangerouslySetInnerHTML={{ __html: item.description }}></p> {/* HTMLとしてレンダリング */}
                        <div className="mt-2">
                            <strong className="text-blue-400">Stats:</strong>
                            <ul className="list-disc list-inside text-gray-300">
                                {Object.entries(item.stats).map(([stat, value]) => (
                                    <li key={stat}>{stat}: <span className="text-blue-300">{value}</span></li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </AlertDialogTrigger>
            <AlertDialogContent className='text-gray-700 bg-gray-100 rounded-lg'>
                <AlertDialogHeader>
                    <AlertDialogTitle>{item.name}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>Cost: {item.cost} gold</p>
                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div> {/* HTMLとしてレンダリング */}
                        <strong>Stats:</strong>
                        <ul>
                            {Object.entries(item.stats).map(([stat, value]) => (
                                <li key={stat}>{stat}: {value}</li>
                            ))}
                        </ul>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='border-gray-500 bg-slate-200'>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ItemCard;