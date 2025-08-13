"use client";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
    {
        icon: Phone,
        title: "Phone",
        primary: "+91 88822 92184",
        secondary: "Available 8:00 AM - 8:00 PM",
        link: "tel:+918882292184",
    },
    {
        icon: MessageCircle,
        title: "WhatsApp",
        primary: "+91 88822 92184",
        secondary: "Quick orders & support",
        link: "https://wa.me/+918882292184",
    },
    {
        icon: Mail,
        title: "Email",
        primary: "homefooddelightdelhi@gmail.com",
        secondary: "We'll respond within 24 hours",
        link: "mailto:homefooddelightdelhi@gmail.com",
    },
    {
        icon: MapPin,
        title: "Kitchen Location",
        primary: "Flat No. 1, Tower B, Anandam Apartment",
        secondary: "Dwarka Sector 28, New Delhi – 110077",
        link: "https://maps.app.goo.gl/JiyBZGidhvj2REoh8",
    },
];

function Info() {
    return (
        <div className="min-h-screen bg-warm-white py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-brown mb-4">Get in Touch</h1>
                    <p className="text-lg text-brown/80 max-w-2xl mx-auto">
                        Have questions about our tiffin service? Want to share feedback?
                        We&apos;d love to hear from you!
                    </p>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {contactInfo.map((contact, index) => {
                        const IconComponent = contact.icon; // Create icon component here
                        return (
                            <Card
                                key={index}
                                className="text-center p-6 border-warm-beige shadow-warm hover:shadow-warm-lg transition-all duration-200 cursor-pointer bg-white"
                                onClick={() => contact.link && window.open(contact.link, '_blank')}
                            >
                                <CardContent className="p-0">
                                    <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-semibold text-brown mb-2">
                                        {contact.title}
                                    </h3>
                                    <div className="text-saffron font-medium mb-1 break-all">
                                        {contact.primary}
                                    </div>
                                    <div className="text-sm text-brown/60 break-words">
                                        {contact.secondary}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Info;
