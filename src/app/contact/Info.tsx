// import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';

// const contactInfo = [
//   {
//     icon: Phone,
//     title: "Phone",
//     primary: "+91 98765 43210",
//     secondary: "Available 8:00 AM - 8:00 PM",
//     link: "tel:+919876543210"
//   },
//   {
//     icon: MessageCircle,
//     title: "WhatsApp",
//     primary: "+91 98765 43210",
//     secondary: "Quick orders & support",
//     link: "https://wa.me/919876543210"
//   },
//   {
//     icon: Mail,
//     title: "Email",
//     primary: "hello@homefooddelight.com",
//     secondary: "We'll respond within 24 hours",
//     link: "mailto:hello@homefooddelight.com"
//   },
//   {
//     icon: MapPin,
//     title: "Kitchen Location",
//     primary: "HSR Layout, Bangalore",
//     secondary: "Karnataka 560102",
//     link: "https://goo.gl/maps/example"
//   }
// ];

// // New special offers data
// const specialOffers = [
//   {
//     title: "Special Prices for Regular Supplies",
//     description: "Get exclusive discounted rates when you order regularly."
//   },
//   {
//     title: "Special Prices for Parties",
//     description: "Planning a party? We offer special packages to make your event memorable."
//   },
//   {
//     title: "Can Serve Up To 100 Persons",
//     description: "Our kitchen is equipped to cater to large gatherings efficiently."
//   }
// ];

// function SpecialOffers() {
//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       <h2 className="text-3xl font-bold text-brown mb-8 text-center">Why Choose Us?</h2>
//       <div className="grid md:grid-cols-3 gap-6">
//         {specialOffers.map(({ title, description }, i) => (
//           <Card key={i} className="p-6 bg-white border-warm-beige shadow-warm hover:shadow-warm-lg transition-all duration-200">
//             <CardContent className="p-0">
//               <h3 className="text-xl font-semibold text-brown mb-2">{title}</h3>
//               <p className="text-brown/80">{description}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// function Info() {
//   return (
//     <div className="min-h-screen bg-warm-white py-8">
//       <div className="container mx-auto px-4 max-w-6xl">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-brown mb-4">Get in Touch</h1>
//           <p className="text-lg text-brown/80 max-w-2xl mx-auto">
//             Have questions about our tiffin service? Want to share feedback? We'd love to hear from you!
//           </p>
//         </div>

//         {/* Contact Cards Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {contactInfo.map((contact, index) => (
//             <Card
//               key={index}
//               className="text-center p-6 border-warm-beige shadow-warm hover:shadow-warm-lg transition-all duration-200 cursor-pointer bg-white"
              
//             >
//               <CardContent className="p-0">
//                 <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
//                   <contact.icon className="h-6 w-6 text-white" />
//                 </div>
//                 <h3 className="font-semibold text-brown mb-2">{contact.title}</h3>
//                 <div className="text-saffron font-medium mb-1">{contact.primary}</div>
//                 <div className="text-sm text-brown/60">{contact.secondary}</div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Special Offers Section */}
//         <SpecialOffers />
//       </div>
//     </div>
//   );
// }

// export default Info;
