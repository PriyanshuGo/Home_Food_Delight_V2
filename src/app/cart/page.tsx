import CartItems from "./CartItems";
import DeliveryDetails from "./DeliveryDetails";
import OrderViaWhatsapp from "./OrderViaWhatsapp";

export default function CartPage() {
    return (
        <div className="min-h-screen bg-warm-white py-10 px-4 md:px-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-brown text-center mb-6">Your Order</h1>

            <div className="space-y-6">

                {/* Cart Items Section */}
                <CartItems />

                {/* Delivery Details */}
                <DeliveryDetails />

                {/* Action Buttons */}
                <OrderViaWhatsapp />

                {/* Help Info */}
                <div className="text-center p-4 bg-warm-beige rounded-lg">
                    <p className="text-sm text-muted-foreground">
                        Need help? Call us at <strong>+91 98765 43210</strong> or WhatsApp directly
                    </p>
                </div>
            </div>
        </div>
    );
}
