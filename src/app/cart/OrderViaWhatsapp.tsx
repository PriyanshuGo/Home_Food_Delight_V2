"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/redux/cartSlice';


function OrderViaWhatsapp() {
    const dispatch = useDispatch();

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <Link href="/menu" className="flex-1">
                    <Button variant="secondary" className='w-full'>Continue Shopping</Button>
                </Link>
                <Button variant="destructive" className="flex-1" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
            </div>
        </div>
    )
}

export default OrderViaWhatsapp
