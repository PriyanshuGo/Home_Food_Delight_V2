"use client";
import { useState, useMemo, useRef } from 'react';
import { useCombobox } from 'downshift';
import { Input } from '@/components/ui/input';
import { X, Search } from 'lucide-react';
import { menuItems } from '@/utils/constants';
import Fuse from 'fuse.js';
import { ProductItem } from '@/types/product';
import Image from 'next/image';

interface SearchHandleProps {
    handleSearch: (query: string) => void;
}

function SearchHandle({ handleSearch }: SearchHandleProps) {
    const [inputValue, setInputValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const fuse = useMemo(() => new Fuse<ProductItem>(menuItems, {
        keys: ['name', 'description', 'category'],
        threshold: 0.4,
    }), []);

    const filteredItems = useMemo(() => {
        if (!inputValue) return [];
        return fuse.search(inputValue).map(res => res.item).slice(0, 5);
    }, [inputValue]);

    const {
        isOpen,
        getMenuProps,
        getInputProps,
        getItemProps,
        highlightedIndex,
    } = useCombobox<ProductItem>({
        items: filteredItems,
        inputValue,
        onInputValueChange: ({ inputValue }) => {
            setInputValue(inputValue ?? '');
        },
        onSelectedItemChange: ({ selectedItem }) => {
            if (selectedItem) {
                setInputValue(selectedItem.name);
                handleSearch(selectedItem.name);
            }
        },
        itemToString: (item) => (item ? item.name : ''),
    });

    const handleSubmitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(inputValue);
        setIsSearching(true);
        setTimeout(() => setIsSearching(false), 300);
    };

    return (
        <div className="max-w-md mx-auto relative">
            <form onSubmit={handleSubmitSearch}>
                <Input
                    {...getInputProps({
                        placeholder: 'Search for dishes...',
                        onFocus: () => { },
                        className: 'w-full form-field',
                        onKeyDown: (e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // prevent Downshift from handling it
                                handleSubmitSearch(e as unknown as React.FormEvent); // manually trigger submit
                            }
                        },
                    })}
                />


                <ul
                    {...getMenuProps({}, { suppressRefError: true })}
                    className={`absolute w-full bg-white border mt-1 rounded-md shadow z-10 max-h-60 overflow-y-auto ${inputValue && isOpen ? '' : 'hidden'
                        }`}
                >
                    {(inputValue && isOpen) &&
                        filteredItems.map((item, index) => (
                            <li
                                key={item.id}
                                {...getItemProps({ item, index })}
                                className={`px-4 py-2 cursor-pointer flex items-start gap-2 ${index === highlightedIndex
                                    ? 'bg-saffron text-white'
                                    : 'hover:bg-saffron hover:text-white'
                                    }`}
                            >
                                <Image
                                    src={item.image}
                                    alt={"img"}
                                    width={40}
                                    height={40}
                                    className="object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs opacity-80">{item.description}</p>
                                    <p className="text-xs mt-1">₹{item.price} · {item.category}</p>
                                </div>
                            </li>
                        ))}
                </ul>


                {inputValue && (
                    <div>
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-saffron hover:text-saffron-dark transition-colors duration-200 text-lg font-bold hidden sm:block"
                            aria-label="Submit search"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setInputValue('');
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-saffron hover:text-saffron-dark transition-colors duration-200 text-lg font-bold sm:hidden"
                            aria-label="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {isSearching && (
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin sm:hidden">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                    </div>
                )}
            </form>
        </div>
    );
}

export default SearchHandle;
