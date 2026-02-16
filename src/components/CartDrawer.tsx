import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="font-display text-lg flex items-center gap-2">
            <ShoppingBag size={20} />
            Carrito ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag size={48} className="text-muted-foreground/30" />
            <div>
              <p className="font-body font-medium text-foreground">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground font-body mt-1">Descubre nuestra colección</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-body font-medium tracking-wide uppercase hover:opacity-90 transition-opacity"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover bg-secondary"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-body font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground font-body mt-0.5">{item.product.brand}</p>
                        {item.selectedColor && (
                          <p className="text-xs text-muted-foreground font-body">Color: {item.selectedColor}</p>
                        )}
                        {item.selectedSize && (
                          <p className="text-xs text-muted-foreground font-body">Talla: {item.selectedSize}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-foreground p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-secondary transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-body font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-secondary transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-sm font-body font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm font-body">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-body text-muted-foreground">
                <span>Envío</span>
                <span>{total >= 99 ? "Gratis" : "$9.99"}</span>
              </div>
              <div className="flex justify-between text-sm font-body font-bold border-t border-border pt-3">
                <span>Total</span>
                <span>${(total >= 99 ? total : total + 9.99).toFixed(2)}</span>
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground text-sm font-body font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity">
                Finalizar compra
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 border border-border text-sm font-body font-medium tracking-wide uppercase hover:bg-secondary transition-colors"
              >
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
