import React, { memo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Star, Clock, Leaf } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ProductItem } from '@/types/product';


interface MenuCardProps {
    item: ProductItem;
    quantity: number;
    onAddToCart: (item: ProductItem) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemoveFromCart: (id: string) => void;
}

function MenuCard ({ item, quantity, onAddToCart, onUpdateQuantity, onRemoveFromCart, }: MenuCardProps) {
    return (
        <div className='h-full'>
            <Card
                key={item.id}
                className="overflow-hidden hover:shadow-warm-lg transition-all duration-300 border-0 bg-white h-full flex flex-col "
            >
                {/* Image Section */}
                <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {item.popular && (
                            <Badge className="bg-saffron text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Popular
                            </Badge>
                        )}
                        {item.veg && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <Leaf className="h-3 w-3 mr-1" />
                                Veg
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Card Header */}
                <CardHeader>
                    <CardTitle className="text-lg text-brown leading-tight">{item.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 ">
                        {item.description}
                    </CardDescription>
                </CardHeader>

                {/* Card Content */}
                <CardContent>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-saffron">₹{item.price}</span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{item.preparationTime}</span>
                        </div>
                    </div>

                    {quantity > 0 ? (
                        <div className='flex items-center justify-between'>
                            <div>
                                <Button
                                    variant="default"
                                    className="bg-saffron hover:bg-saffron-dark text-white"
                                    onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                                >
                                    -
                                </Button>
                                <span className="mx-2">{quantity}</span>
                                <Button
                                    variant="default"
                                    className="bg-saffron hover:bg-saffron-dark text-white"
                                    onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                variant="default"
                                className="bg-saffron hover:bg-saffron-dark text-white"
                                onClick={() => onRemoveFromCart(item.id)}
                            >
                                Remove from Cart
                            </Button>
                        </div>
                    ) : (
                        <Button
                            size="sm"

                            className="w-full bg-saffron hover:bg-saffron-dark text-white"
                            onClick={() => onAddToCart(item)}
                        >
                            <Plus className="h-4 w-4 mr-2" />

                            Add to Cart
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default memo(MenuCard);
