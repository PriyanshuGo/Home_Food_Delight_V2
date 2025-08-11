"use client"
import React from 'react'
import { Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';


function CartItems() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const router = useRouter();

    return (
        <div>
            <Card>
                <CardHeader className="flex items-center gap-4 pb-2">
                    <button
                        className="p-0 h-10 w-10 flex items-center justify-center rounded-full hover:bg-warm-beige transition-colors duration-200"
                        onClick={() => router.back()}
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-6 w-6 text-brown hover:text-saffron" />
                    </button>

                    <CardTitle className="text-2xl text-brown font-semibold">
                        Cart Items
                    </CardTitle>
                </CardHeader>


                <CardContent className="space-y-4">
                    {cartItems.map((item) => (
                        <div className="flex items-center justify-between p-3 bg-warm-beige/30 rounded-lg" key={item.id}>
                            <div className="flex-1">
                                <h4 className="font-medium text-brown">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">₹{item.price}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <Button size="sm" variant="outline" className="w-8 h-8 p-0" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <Button size="sm" variant="outline" className="w-8 h-8 p-0" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                                <div className="text-right min-w-[60px]">
                                    <p className="font-semibold text-saffron">₹{item.price * item.quantity}</p>
                                </div>
                                <Button size="sm" variant="destructive" className="w-8 h-8 p-0" onClick={() => dispatch((removeFromCart(item.id)))}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {cartItems.length > 0 ? (<>
                        <Separator />
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span className="text-brown">Total:</span>
                            <span className="text-saffron">₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                        </div>
                    </>
                    ) : (<div className="text-center py-8 bg-warm-beige/40 rounded-lg border border-warm-beige text-muted-foreground shadow-sm">
                        <p className="text-lg font-medium">🛒 Your cart is empty</p>
                        <p className="text-sm mt-1">Start adding your favorite dishes to place an order!</p>
                    </div>)}

                </CardContent>
            </Card>
        </div>
    )
}

export default CartItems

