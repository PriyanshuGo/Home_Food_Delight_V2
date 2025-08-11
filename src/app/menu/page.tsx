"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import { ProductItem, CartItem } from '@/types/product'
import MenuCard from '@/app/menu/MenuCard';
import SearchHandle from './SearchHandle';
import CategoryFilter from './CategoryFilter';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';



const MenuPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeCategory = useSelector((state: RootState) => state.category.activeCategory);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [filteredItems, setFilteredItems] = useState<ProductItem[]>(menuItems);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const filterByCategory = (category: string): void => {
    const results: ProductItem[] = menuItems.filter((item: ProductItem) => {
      if (category === 'all') {
        return item;
      } else {
        return item.category === category
      }
    });
    setFilteredItems(results);
  }

  const fuse = useMemo(() => new Fuse(menuItems, {
    keys: ['name', 'category'],
    threshold: 0.4,             // how fuzzy the match is
    ignoreLocation: true,       // matches anywhere in the string
    useExtendedSearch: true     // enables "exact word" or combined search features
  }), []);


  const handleSearch = (query: string): void => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      const results = fuse.search(trimmedQuery).map(res => res.item);
      setFilteredItems(results);
    }

    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  useEffect(() => {
    filterByCategory(activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (item: ProductItem): void => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  }
  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };


  return (
    <div>
      <div className="min-h-screen bg-warm-white py-8">
        <div className="container mx-auto px-4">

          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brown mb-4">
              Today&apos;s Fresh Menu
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Authentic home-style cooking prepared fresh daily with traditional recipes
            </p>
          </div>

          {/* Search and Category Filter Section */}
          <div className="mb-8 space-y-4">
            <SearchHandle
              handleSearch={handleSearch}
            />

            <CategoryFilter />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-8"
            ref={resultRef}>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item: ProductItem) => {
                const cartItem = cartItems.find((ci: CartItem) => ci.id === item.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MenuCard
                      key={item.id}
                      item={item}
                      quantity={quantity}
                      onAddToCart={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveFromCart={handleRemoveFromCart}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>

          </div>

          {/* No Results Message */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-brown mb-2">No dishes found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Floating Cart Button */}
          {cartItems.length > 0 && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
              <Button
                size="lg"
                className="bg-saffron hover:bg-saffron-dark text-white px-6 py-3 rounded-full shadow-warm-lg"
                onClick={() => router.push('/cart')}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                View Cart ({cartItems.length} items)
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MenuPage;