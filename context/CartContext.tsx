"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Agregamos "size" a la definición de la prenda
type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string; 
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Omit<Product, "quantity">) => void;
  removeFromCart: (cartId: string) => void; // Usamos un ID único del carrito
  isCartOpen: boolean;
  toggleCart: () => void;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Omit<Product, "quantity">) => {
    setCart((prev) => {
      // 2. Buscamos si ya existe el mismo producto CON EL MISMO TALLE
      const exists = prev.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (exists) {
        return prev.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // 3. Modificamos el borrado para que sea preciso por producto + talle
  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => `${item.id}-${item.size}` !== cartId));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isCartOpen, toggleCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};