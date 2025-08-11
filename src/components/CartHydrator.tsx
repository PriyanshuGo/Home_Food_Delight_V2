// CartHydrator.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartFromStorage } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import {loadDetailsFromStorage} from "@/redux/DeliveryDetailsSlice";

export function CartHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const deliveryDetails = useSelector((state: RootState) => state.deliveryDetails);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const data = localStorage.getItem('cartItems');
      const delivery = localStorage.getItem('delivery');
      if (data) {
        dispatch(loadCartFromStorage(JSON.parse(data)));
      }
      if (delivery) {
        dispatch(loadDetailsFromStorage(JSON.parse(delivery)));
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
    }
  }, []);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      localStorage.setItem('delivery', JSON.stringify(deliveryDetails));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }, [cartItems,deliveryDetails]);

  return <>{children}</>;
}
