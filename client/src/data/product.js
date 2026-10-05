const products = [
  // ================= MOBILES =================
  {
    id: 1,
    title: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "Mobiles",
    price: 74999,
    rating: 4.5,
    stock: 25,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    description: "Premium Samsung smartphone with powerful performance and excellent camera."
  },
  {
    id: 2,
    title: "iPhone 15",
    brand: "Apple",
    category: "Mobiles",
    price: 69999,
    rating: 4.7,
    stock: 18,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    description: "Apple iPhone with advanced camera system and high-performance processor."
  },
  {
    id: 3,
    title: "OnePlus 12",
    brand: "OnePlus",
    category: "Mobiles",
    price: 64999,
    rating: 4.6,
    stock: 20,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    description: "High-performance OnePlus smartphone with fast charging."
  },
  {
    id: 4,
    title: "Google Pixel 8",
    brand: "Google",
    category: "Mobiles",
    price: 58999,
    rating: 4.5,
    stock: 15,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    description: "Google Pixel smartphone with excellent AI-powered photography."
  },
  {
    id: 5,
    title: "Redmi Note 13 Pro",
    brand: "Redmi",
    category: "Mobiles",
    price: 27999,
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1598327106026-d9521da673d1",
    description: "Feature-rich Redmi smartphone with AMOLED display."
  },
  {
    id: 6,
    title: "Realme 12 Pro",
    brand: "Realme",
    category: "Mobiles",
    price: 24999,
    rating: 4.2,
    stock: 30,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb",
    description: "Stylish Realme smartphone with powerful processor."
  },
  {
    id: 7,
    title: "Vivo V30",
    brand: "Vivo",
    category: "Mobiles",
    price: 32999,
    rating: 4.4,
    stock: 22,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8",
    description: "Vivo smartphone with premium design and camera features."
  },
  {
    id: 8,
    title: "Oppo Reno 11",
    brand: "Oppo",
    category: "Mobiles",
    price: 35999,
    rating: 4.3,
    stock: 19,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
    description: "Oppo smartphone with beautiful display and fast charging."
  },
  {
    id: 9,
    title: "Nothing Phone 2",
    brand: "Nothing",
    category: "Mobiles",
    price: 39999,
    rating: 4.4,
    stock: 17,
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355",
    description: "Unique smartphone with innovative transparent design."
  },
  {
    id: 10,
    title: "Motorola Edge 50",
    brand: "Motorola",
    category: "Mobiles",
    price: 31999,
    rating: 4.2,
    stock: 28,
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48",
    description: "Modern Motorola smartphone with smooth performance."
  },

  // ================= LAPTOPS =================
  {
    id: 11,
    title: "MacBook Air M3",
    brand: "Apple",
    category: "Laptops",
    price: 114999,
    rating: 4.8,
    stock: 10,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Powerful Apple MacBook Air with M3 chip."
  },
  {
    id: 12,
    title: "Dell Inspiron 15",
    brand: "Dell",
    category: "Laptops",
    price: 62999,
    rating: 4.4,
    stock: 14,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description: "Reliable Dell laptop for work, study and entertainment."
  },
  {
    id: 13,
    title: "HP Pavilion 14",
    brand: "HP",
    category: "Laptops",
    price: 57999,
    rating: 4.3,
    stock: 16,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
    description: "Slim HP laptop with excellent everyday performance."
  },
  {
    id: 14,
    title: "Lenovo IdeaPad Slim 5",
    brand: "Lenovo",
    category: "Laptops",
    price: 54999,
    rating: 4.4,
    stock: 20,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    description: "Slim Lenovo laptop suitable for students and professionals."
  },
  {
    id: 15,
    title: "ASUS Vivobook 15",
    brand: "ASUS",
    category: "Laptops",
    price: 51999,
    rating: 4.3,
    stock: 18,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
    description: "ASUS laptop with modern design and reliable performance."
  },
  {
    id: 16,
    title: "Acer Aspire 5",
    brand: "Acer",
    category: "Laptops",
    price: 47999,
    rating: 4.2,
    stock: 25,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
    description: "Affordable Acer laptop for everyday computing."
  },
  {
    id: 17,
    title: "MSI Gaming Laptop",
    brand: "MSI",
    category: "Laptops",
    price: 89999,
    rating: 4.6,
    stock: 8,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    description: "Gaming laptop designed for demanding games and applications."
  },
  {
    id: 18,
    title: "HP Victus Gaming",
    brand: "HP",
    category: "Laptops",
    price: 74999,
    rating: 4.5,
    stock: 12,
    image: "https://images.unsplash.com/photo-1602080858428-57174f9431cf",
    description: "Powerful gaming laptop with dedicated graphics."
  },
  {
    id: 19,
    title: "Lenovo ThinkPad E14",
    brand: "Lenovo",
    category: "Laptops",
    price: 69999,
    rating: 4.6,
    stock: 11,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description: "Business laptop with durable build and professional features."
  },
  {
    id: 20,
    title: "ASUS ROG Strix",
    brand: "ASUS",
    category: "Laptops",
    price: 124999,
    rating: 4.8,
    stock: 6,
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f",
    description: "High-end gaming laptop for serious gamers."
  },

  // ================= ELECTRONICS =================
  {
    id: 21,
    title: "Sony Bravia 55 Inch TV",
    brand: "Sony",
    category: "Electronics",
    price: 69999,
    rating: 4.6,
    stock: 9,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    description: "4K smart television with immersive picture quality."
  },
  {
    id: 22,
    title: "Samsung 43 Inch Smart TV",
    brand: "Samsung",
    category: "Electronics",
    price: 42999,
    rating: 4.5,
    stock: 14,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    description: "Smart TV with vibrant colors and streaming applications."
  },
  {
    id: 23,
    title: "Boat Bluetooth Speaker",
    brand: "Boat",
    category: "Electronics",
    price: 2999,
    rating: 4.3,
    stock: 50,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    description: "Portable Bluetooth speaker with powerful sound."
  },
  {
    id: 24,
    title: "JBL Portable Speaker",
    brand: "JBL",
    category: "Electronics",
    price: 4999,
    rating: 4.6,
    stock: 32,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    description: "Portable JBL speaker with clear audio and deep bass."
  },
  {
    id: 25,
    title: "Sony Wireless Headphones",
    brand: "Sony",
    category: "Electronics",
    price: 8999,
    rating: 4.7,
    stock: 24,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Comfortable wireless headphones with quality sound."
  },
  {
    id: 26,
    title: "Boat Airdopes 141",
    brand: "Boat",
    category: "Electronics",
    price: 1499,
    rating: 4.2,
    stock: 75,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1",
    description: "Affordable wireless earbuds with long battery life."
  },
  {
    id: 27,
    title: "Apple AirPods Pro",
    brand: "Apple",
    category: "Electronics",
    price: 24999,
    rating: 4.8,
    stock: 15,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
    description: "Premium earbuds with active noise cancellation."
  },
  {
    id: 28,
    title: "Canon DSLR Camera",
    brand: "Canon",
    category: "Electronics",
    price: 54999,
    rating: 4.6,
    stock: 7,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    description: "Professional DSLR camera for photography enthusiasts."
  },
  {
    id: 29,
    title: "GoPro Action Camera",
    brand: "GoPro",
    category: "Electronics",
    price: 39999,
    rating: 4.7,
    stock: 13,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
    description: "Compact action camera for adventure and travel."
  },
  {
    id: 30,
    title: "Kindle E-Reader",
    brand: "Amazon",
    category: "Electronics",
    price: 13999,
    rating: 4.5,
    stock: 20,
    image: "https://images.unsplash.com/photo-1592496001020-d31bd830651f",
    description: "Lightweight e-reader for comfortable digital reading."
  },

  // ================= FASHION =================
  {
    id: 31,
    title: "Men's Cotton T-Shirt",
    brand: "Puma",
    category: "Fashion",
    price: 999,
    rating: 4.2,
    stock: 60,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "Comfortable cotton T-shirt for everyday wear."
  },
  {
    id: 32,
    title: "Men's Denim Jeans",
    brand: "Levis",
    category: "Fashion",
    price: 2499,
    rating: 4.4,
    stock: 45,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    description: "Classic denim jeans with comfortable fitting."
  },
  {
    id: 33,
    title: "Women's Summer Dress",
    brand: "Zara",
    category: "Fashion",
    price: 2999,
    rating: 4.5,
    stock: 35,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    description: "Stylish summer dress made for comfort."
  },
  {
    id: 34,
    title: "Women's Casual Top",
    brand: "H&M",
    category: "Fashion",
    price: 1299,
    rating: 4.3,
    stock: 55,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
    description: "Trendy casual top for everyday fashion."
  },
  {
    id: 35,
    title: "Men's Formal Shirt",
    brand: "Peter England",
    category: "Fashion",
    price: 1799,
    rating: 4.4,
    stock: 40,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157",
    description: "Formal shirt suitable for office and events."
  },
  {
    id: 36,
    title: "Women's Jeans",
    brand: "Levis",
    category: "Fashion",
    price: 2299,
    rating: 4.3,
    stock: 42,
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec",
    description: "Comfortable women's denim jeans."
  },
  {
    id: 37,
    title: "Men's Hoodie",
    brand: "Nike",
    category: "Fashion",
    price: 2999,
    rating: 4.6,
    stock: 30,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    description: "Warm and comfortable hoodie for casual wear."
  },
  {
    id: 38,
    title: "Women's Hoodie",
    brand: "Adidas",
    category: "Fashion",
    price: 2799,
    rating: 4.5,
    stock: 28,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    description: "Stylish hoodie designed for comfort."
  },
  {
    id: 39,
    title: "Men's Sports Shorts",
    brand: "Adidas",
    category: "Fashion",
    price: 1199,
    rating: 4.2,
    stock: 50,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b",
    description: "Lightweight sports shorts for workouts."
  },
  {
    id: 40,
    title: "Women's Kurti",
    brand: "Biba",
    category: "Fashion",
    price: 1599,
    rating: 4.4,
    stock: 38,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    description: "Elegant Indian-style kurti for everyday occasions."
  },

  // ================= MORE PRODUCTS =================
  {
    id: 41,
    title: "Samsung Galaxy Tab",
    brand: "Samsung",
    category: "Electronics",
    price: 32999,
    rating: 4.5,
    stock: 20,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    description: "Large-screen tablet for entertainment and productivity."
  },
  {
    id: 42,
    title: "Apple iPad Air",
    brand: "Apple",
    category: "Electronics",
    price: 59999,
    rating: 4.7,
    stock: 12,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    description: "Powerful and lightweight Apple tablet."
  },
  {
    id: 43,
    title: "Dell Wireless Keyboard",
    brand: "Dell",
    category: "Electronics",
    price: 1499,
    rating: 4.3,
    stock: 45,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    description: "Comfortable wireless keyboard for home and office."
  },
  {
    id: 44,
    title: "Logitech Mouse",
    brand: "Logitech",
    category: "Electronics",
    price: 899,
    rating: 4.4,
    stock: 70,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    description: "Reliable wireless mouse with smooth tracking."
  },
  {
    id: 45,
    title: "Samsung 1TB SSD",
    brand: "Samsung",
    category: "Electronics",
    price: 7499,
    rating: 4.7,
    stock: 25,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
    description: "Fast 1TB SSD for computers and laptops."
  },
  {
    id: 46,
    title: "TP-Link WiFi Router",
    brand: "TP-Link",
    category: "Electronics",
    price: 2499,
    rating: 4.3,
    stock: 40,
    image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2",
    description: "High-speed WiFi router for home networks."
  },
  {
    id: 47,
    title: "Amazon Echo Dot",
    brand: "Amazon",
    category: "Electronics",
    price: 4499,
    rating: 4.5,
    stock: 30,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230",
    description: "Smart speaker with voice assistant."
  },
  {
    id: 48,
    title: "Mi Smart Band",
    brand: "Xiaomi",
    category: "Electronics",
    price: 2999,
    rating: 4.2,
    stock: 60,
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288",
    description: "Fitness band for tracking daily activity."
  },
  {
    id: 49,
    title: "Apple Watch Series",
    brand: "Apple",
    category: "Electronics",
    price: 45999,
    rating: 4.7,
    stock: 10,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26",
    description: "Smartwatch with fitness and health tracking features."
  },
  {
    id: 50,
    title: "Samsung Galaxy Watch",
    brand: "Samsung",
    category: "Electronics",
    price: 29999,
    rating: 4.5,
    stock: 15,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Premium smartwatch with fitness tracking."
  },

  {
    id: 51,
    title: "Nike Running Shoes",
    brand: "Nike",
    category: "Fashion",
    price: 4999,
    rating: 4.6,
    stock: 35,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Comfortable running shoes designed for daily workouts."
  },
  {
    id: 52,
    title: "Adidas Sports Shoes",
    brand: "Adidas",
    category: "Fashion",
    price: 4299,
    rating: 4.5,
    stock: 40,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
    description: "Lightweight sports shoes with excellent grip."
  },
  {
    id: 53,
    title: "Puma Sneakers",
    brand: "Puma",
    category: "Fashion",
    price: 3599,
    rating: 4.4,
    stock: 30,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    description: "Stylish sneakers for casual everyday use."
  },
  {
    id: 54,
    title: "Men's Leather Wallet",
    brand: "WildHorn",
    category: "Fashion",
    price: 799,
    rating: 4.3,
    stock: 75,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    description: "Premium-style wallet with multiple card slots."
  },
  {
    id: 55,
    title: "Women's Handbag",
    brand: "Lavie",
    category: "Fashion",
    price: 2499,
    rating: 4.4,
    stock: 32,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "Elegant handbag suitable for daily use."
  },
  {
    id: 56,
    title: "Sunglasses",
    brand: "Ray-Ban",
    category: "Fashion",
    price: 6999,
    rating: 4.6,
    stock: 18,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    description: "Classic sunglasses with stylish frame."
  },
  {
    id: 57,
    title: "Men's Wrist Watch",
    brand: "Fossil",
    category: "Fashion",
    price: 8999,
    rating: 4.5,
    stock: 15,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    description: "Classic wrist watch with premium design."
  },
  {
    id: 58,
    title: "Women's Wrist Watch",
    brand: "Titan",
    category: "Fashion",
    price: 5999,
    rating: 4.4,
    stock: 20,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Elegant women's watch for everyday fashion."
  },
  {
    id: 59,
    title: "Travel Backpack",
    brand: "American Tourister",
    category: "Fashion",
    price: 1999,
    rating: 4.5,
    stock: 45,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description: "Spacious backpack suitable for travel and college."
  },
  {
    id: 60,
    title: "School Backpack",
    brand: "Skybags",
    category: "Fashion",
    price: 1299,
    rating: 4.3,
    stock: 50,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3",
    description: "Durable backpack for school and everyday use."
  },

  {
    id: 61,
    title: "Samsung Microwave Oven",
    brand: "Samsung",
    category: "Electronics",
    price: 10999,
    rating: 4.4,
    stock: 18,
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d",
    description: "Modern microwave oven for quick cooking."
  },
  {
    id: 62,
    title: "LG Refrigerator",
    brand: "LG",
    category: "Electronics",
    price: 38999,
    rating: 4.6,
    stock: 10,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5",
    description: "Energy-efficient refrigerator with spacious storage."
  },
  {
    id: 63,
    title: "Whirlpool Washing Machine",
    brand: "Whirlpool",
    category: "Electronics",
    price: 29999,
    rating: 4.5,
    stock: 14,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
    description: "Fully automatic washing machine."
  },
  {
    id: 64,
    title: "Philips Air Fryer",
    brand: "Philips",
    category: "Electronics",
    price: 7999,
    rating: 4.5,
    stock: 22,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
    description: "Air fryer for healthier cooking with less oil."
  },
  {
    id: 65,
    title: "Prestige Mixer Grinder",
    brand: "Prestige",
    category: "Electronics",
    price: 3499,
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b",
    description: "Powerful mixer grinder for everyday kitchen use."
  },
  {
    id: 66,
    title: "Bajaj Electric Kettle",
    brand: "Bajaj",
    category: "Electronics",
    price: 1299,
    rating: 4.2,
    stock: 55,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ_OPi6mBNZjksGEQ-8_5y_i03k3QFeLrkZF0bSLpuAg&s=10",
    description: "Fast-boiling electric kettle."
  },
  {
    id: 67,
    title: "Philips Hair Dryer",
    brand: "Philips",
    category: "Electronics",
    price: 1599,
    rating: 4.3,
    stock: 40,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    description: "Compact hair dryer with multiple heat settings."
  },
  {
    id: 68,
    title: "Philips Trimmer",
    brand: "Philips",
    category: "Electronics",
    price: 1999,
    rating: 4.4,
    stock: 50,
    image: "https://images.unsplash.com/photo-1621607512214-68297480165e",
    description: "Cordless trimmer for convenient grooming."
  },
  {
    id: 69,
    title: "Oral-B Electric Toothbrush",
    brand: "Oral-B",
    category: "Electronics",
    price: 2499,
    rating: 4.5,
    stock: 35,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3xmxqE4X9qiTrxoqpKv5jzumZgfnZ7FvmMDvwbwesg&s=10",
    description: "Electric toothbrush for effective daily cleaning."
  },
  {
    id: 70,
    title: "Dyson Vacuum Cleaner",
    brand: "Dyson",
    category: "Electronics",
    price: 45999,
    rating: 4.7,
    stock: 8,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001",
    description: "Powerful cordless vacuum cleaner."
  },

  {
    id: 71,
    title: "Men's Casual Shoes",
    brand: "Sparx",
    category: "Fashion",
    price: 1499,
    rating: 4.2,
    stock: 55,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    description: "Comfortable casual shoes for everyday use."
  },
  {
    id: 72,
    title: "Women's Running Shoes",
    brand: "Nike",
    category: "Fashion",
    price: 4599,
    rating: 4.6,
    stock: 28,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Lightweight running shoes for women."
  },
  {
    id: 73,
    title: "Men's Jacket",
    brand: "Puma",
    category: "Fashion",
    price: 3999,
    rating: 4.5,
    stock: 25,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    description: "Warm and stylish jacket for winter."
  },
  {
    id: 74,
    title: "Women's Winter Jacket",
    brand: "Zara",
    category: "Fashion",
    price: 4999,
    rating: 4.6,
    stock: 20,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a",
    description: "Fashionable winter jacket with comfortable fit."
  },
  {
    id: 75,
    title: "Men's Polo T-Shirt",
    brand: "U.S. Polo",
    category: "Fashion",
    price: 1899,
    rating: 4.4,
    stock: 45,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d",
    description: "Classic polo T-shirt for casual occasions."
  },
  {
    id: 76,
    title: "Women's Saree",
    brand: "Mimosa",
    category: "Fashion",
    price: 2499,
    rating: 4.5,
    stock: 30,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    description: "Elegant saree suitable for special occasions."
  },
  {
    id: 77,
    title: "Men's Kurta",
    brand: "Manyavar",
    category: "Fashion",
    price: 2999,
    rating: 4.5,
    stock: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsudi_Jqxk2Q64GVMNvFHvCrF3O9zIzxMtEmNqx13Cgw&s=10",
    description: "Traditional kurta with modern styling."
  },
  {
    id: 78,
    title: "Women's Ethnic Suit",
    brand: "Biba",
    category: "Fashion",
    price: 3299,
    rating: 4.4,
    stock: 28,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb",
    description: "Beautiful ethnic suit for festive occasions."
  },
  {
    id: 79,
    title: "Men's Formal Trousers",
    brand: "Van Heusen",
    category: "Fashion",
    price: 2299,
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
    description: "Professional formal trousers."
  },
  {
    id: 80,
    title: "Women's Leggings",
    brand: "Jockey",
    category: "Fashion",
    price: 899,
    rating: 4.2,
    stock: 60,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJE_hCunDA6Kvmsn-WN0aWhrflA9EgrnZuotrZxgKFqw&s=10",
    description: "Stretchable and comfortable leggings."
  },

  {
    id: 81,
    title: "iPhone 14",
    brand: "Apple",
    category: "Mobiles",
    price: 59999,
    rating: 4.6,
    stock: 20,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
    description: "Powerful Apple smartphone with excellent camera."
  },
  {
    id: 82,
    title: "Samsung Galaxy A55",
    brand: "Samsung",
    category: "Mobiles",
    price: 38999,
    rating: 4.4,
    stock: 25,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    description: "Premium mid-range Samsung smartphone."
  },
  {
    id: 83,
    title: "OnePlus Nord CE",
    brand: "OnePlus",
    category: "Mobiles",
    price: 24999,
    rating: 4.3,
    stock: 30,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    description: "Affordable OnePlus smartphone with smooth performance."
  },
  {
    id: 84,
    title: "Redmi 13C",
    brand: "Redmi",
    category: "Mobiles",
    price: 11999,
    rating: 4.1,
    stock: 70,
    image: "https://images.unsplash.com/photo-1598327106026-d9521da673d1",
    description: "Budget-friendly smartphone for everyday use."
  },
  {
    id: 85,
    title: "Realme Narzo",
    brand: "Realme",
    category: "Mobiles",
    price: 13999,
    rating: 4.2,
    stock: 55,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb",
    description: "Affordable smartphone with large display."
  },
  {
    id: 86,
    title: "Vivo Y200",
    brand: "Vivo",
    category: "Mobiles",
    price: 21999,
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8",
    description: "Stylish Vivo smartphone with strong battery life."
  },
  {
    id: 87,
    title: "Oppo A79",
    brand: "Oppo",
    category: "Mobiles",
    price: 19999,
    rating: 4.2,
    stock: 40,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
    description: "Oppo smartphone with attractive design."
  },
  {
    id: 88,
    title: "Motorola G84",
    brand: "Motorola",
    category: "Mobiles",
    price: 18999,
    rating: 4.3,
    stock: 38,
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48",
    description: "Reliable Motorola smartphone with clean Android experience."
  },
  {
    id: 89,
    title: "Google Pixel 7",
    brand: "Google",
    category: "Mobiles",
    price: 42999,
    rating: 4.5,
    stock: 12,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    description: "Google smartphone with excellent computational photography."
  },
  {
    id: 90,
    title: "Nothing Phone 1",
    brand: "Nothing",
    category: "Mobiles",
    price: 29999,
    rating: 4.3,
    stock: 18,
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355",
    description: "Unique smartphone with a distinctive design."
  },

  {
    id: 91,
    title: "MacBook Pro 14",
    brand: "Apple",
    category: "Laptops",
    price: 169999,
    rating: 4.9,
    stock: 5,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Professional MacBook with powerful Apple silicon."
  },
  {
    id: 92,
    title: "Dell XPS 13",
    brand: "Dell",
    category: "Laptops",
    price: 129999,
    rating: 4.7,
    stock: 7,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description: "Premium compact Dell laptop."
  },
  {
    id: 93,
    title: "HP Envy x360",
    brand: "HP",
    category: "Laptops",
    price: 84999,
    rating: 4.6,
    stock: 10,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
    description: "Convertible HP laptop for productivity."
  },
  {
    id: 94,
    title: "Lenovo Yoga Slim",
    brand: "Lenovo",
    category: "Laptops",
    price: 79999,
    rating: 4.6,
    stock: 9,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    description: "Slim and lightweight Lenovo laptop."
  },
  {
    id: 95,
    title: "ASUS ZenBook",
    brand: "ASUS",
    category: "Laptops",
    price: 94999,
    rating: 4.7,
    stock: 8,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
    description: "Premium ASUS laptop with excellent display."
  },
  {
    id: 96,
    title: "Acer Nitro Gaming",
    brand: "Acer",
    category: "Laptops",
    price: 72999,
    rating: 4.5,
    stock: 12,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    description: "Gaming laptop with dedicated graphics."
  },
  {
    id: 97,
    title: "MSI Katana Gaming",
    brand: "MSI",
    category: "Laptops",
    price: 99999,
    rating: 4.6,
    stock: 6,
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f",
    description: "High-performance gaming laptop."
  },
  {
    id: 98,
    title: "HP Chromebook",
    brand: "HP",
    category: "Laptops",
    price: 29999,
    rating: 4.2,
    stock: 25,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
    description: "Affordable laptop for browsing and study."
  },
  {
    id: 99,
    title: "Lenovo Chromebook",
    brand: "Lenovo",
    category: "Laptops",
    price: 27999,
    rating: 4.2,
    stock: 20,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    description: "Simple and affordable Chromebook."
  },
  {
    id: 100,
    title: "Dell Vostro 15",
    brand: "Dell",
    category: "Laptops",
    price: 64999,
    rating: 4.4,
    stock: 15,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    description: "Business-focused Dell laptop for professionals."
  },
  {
    id: 1,
    title: "Modern Table Lamp",
    brand: "Philips",
    category: "Home",
    price: 1499,
    rating: 4.3,
    stock: 30,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    description: "Stylish modern table lamp for home and office."
  },

  {
    id: 2,
    title: "Decorative Wall Clock",
    brand: "Ajanta",
    category: "Home",
    price: 899,
    rating: 4.2,
    stock: 45,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
    description: "Elegant decorative wall clock for living rooms."
  },

  {
    id: 3,
    title: "Cotton Cushion Set",
    brand: "HomeStyle",
    category: "Home",
    price: 699,
    rating: 4.4,
    stock: 50,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2",
    description: "Soft and comfortable cotton cushion set."
  },

  {
    id: 4,
    title: "Ceramic Flower Vase",
    brand: "DecorPlus",
    category: "Home",
    price: 799,
    rating: 4.5,
    stock: 25,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427",
    description: "Beautiful ceramic flower vase for home decoration."
  },

  {
    id: 5,
    title: "LED Ceiling Light",
    brand: "Wipro",
    category: "Home",
    price: 2199,
    rating: 4.5,
    stock: 20,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f",
    description: "Energy-efficient LED ceiling light for modern homes."
  },

  {
    id: 6,
    title: "Non Stick Cookware Set",
    brand: "Prestige",
    category: "Home",
    price: 2999,
    rating: 4.4,
    stock: 30,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
    description: "Complete non-stick cookware set for modern kitchens."
  },

  {
    id: 7,
    title: "Electric Kettle",
    brand: "Philips",
    category: "Home",
    price: 1299,
    rating: 4.3,
    stock: 40,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ81GjE5o01Ch9vA2999w8Up3j3iCElK8u5X4uz7zkgLQ&s=10",
    description: "Fast-boiling electric kettle for everyday use."
  },

  {
    id: 8,
    title: "Dinner Plate Set",
    brand: "Cello",
    category: "Home",
    price: 999,
    rating: 4.2,
    stock: 35,
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0",
    description: "Elegant dinner plate set for family dining."
  },

  {
    id: 9,
    title: "Storage Organizer",
    brand: "Milton",
    category: "Home",
    price: 799,
    rating: 4.3,
    stock: 50,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    description: "Useful storage organizer for home and office."
  },

  {
    id: 10,
    title: "Home Cleaning Set",
    brand: "Scotch-Brite",
    category: "Home",
    price: 599,
    rating: 4.4,
    stock: 60,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
    description: "Complete cleaning set for everyday household cleaning."
  },

  {
    id: 11,
    title: "Digital Alarm Clock",
    brand: "Casio",
    category: "Home",
    price: 1299,
    rating: 4.4,
    stock: 35,
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
    description: "Modern digital alarm clock with clear display."
  },

  {
    id: 12,
    title: "Table Fan",
    brand: "Usha",
    category: "Home",
    price: 1899,
    rating: 4.3,
    stock: 25,
    image: "https://images.unsplash.com/photo-1527698266440-12104e498b76",
    description: "Compact table fan with powerful air circulation."
  },

  {
    id: 13,
    title: "Room Freshener",
    brand: "Godrej",
    category: "Home",
    price: 299,
    rating: 4.2,
    stock: 80,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59",
    description: "Long-lasting room freshener for a pleasant home."
  },

  {
    id: 14,
    title: "Curtain Set",
    brand: "Story@Home",
    category: "Home",
    price: 1499,
    rating: 4.4,
    stock: 40,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    description: "Elegant curtains suitable for living rooms and bedrooms."
  },

  {
    id: 15,
    title: "Floor Carpet",
    brand: "Home Centre",
    category: "Home",
    price: 2499,
    rating: 4.5,
    stock: 20,
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843",
    description: "Soft decorative floor carpet for modern homes."
  },

  {
    id: 16,
    title: "Wall Mirror",
    brand: "Decor World",
    category: "Home",
    price: 1799,
    rating: 4.4,
    stock: 25,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    description: "Stylish wall mirror for bedrooms and living rooms."
  },

  {
    id: 17,
    title: "Kitchen Storage Box Set",
    brand: "Tupperware",
    category: "Home",
    price: 899,
    rating: 4.5,
    stock: 45,
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    description: "Airtight storage boxes for kitchen organization."
  },

  {
    id: 18,
    title: "Water Bottle Set",
    brand: "Milton",
    category: "Home",
    price: 699,
    rating: 4.4,
    stock: 55,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    description: "Reusable water bottle set for everyday household use."
  },

  {
    id: 19,
    title: "Iron Box",
    brand: "Philips",
    category: "Home",
    price: 1599,
    rating: 4.5,
    stock: 30,
    image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0",
    description: "Powerful steam iron for wrinkle-free clothes."
  },

  {
    id: 20,
    title: "Mixer Grinder",
    brand: "Bajaj",
    category: "Home",
    price: 2499,
    rating: 4.4,
    stock: 25,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62",
    description: "Powerful mixer grinder for everyday kitchen needs."
  },

  {
    id: 21,
    title: "Rice Cooker",
    brand: "Prestige",
    category: "Home",
    price: 1999,
    rating: 4.3,
    stock: 20,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62",
    description: "Easy-to-use electric rice cooker for quick cooking."
  },

  {
    id: 22,
    title: "Bedsheet Set",
    brand: "Bombay Dyeing",
    category: "Home",
    price: 1299,
    rating: 4.5,
    stock: 50,
    image: "https://images.unsplash.com/photo-1616627561950-9f746e330187",
    description: "Soft cotton bedsheet set with attractive designs."
  },

  {
    id: 23,
    title: "Pillow Set",
    brand: "Sleepwell",
    category: "Home",
    price: 799,
    rating: 4.4,
    stock: 45,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2",
    description: "Comfortable pillows designed for relaxing sleep."
  },

  {
    id: 24,
    title: "Laundry Basket",
    brand: "Nilkamal",
    category: "Home",
    price: 899,
    rating: 4.3,
    stock: 35,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd8PKdiWcSbXYLCCZzqsR8_2-T7BHKQQWDz6OhajLyDw&s=10",
    description: "Large and durable laundry basket for home use."
  },

  {
    id: 25,
    title: "Kitchen Knife Set",
    brand: "Wonderchef",
    category: "Home",
    price: 1099,
    rating: 4.5,
    stock: 30,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546",
    description: "Sharp and durable kitchen knife set."
  },


  // =====================================================
  // SPORTS PRODUCTS - 26 to 50
  // =====================================================

  {
    id: 26,
    title: "Professional Cricket Bat",
    brand: "SG",
    category: "Sports",
    price: 2499,
    rating: 4.6,
    stock: 15,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
    description: "High-quality cricket bat suitable for professional players."
  },

  {
    id: 27,
    title: "Football",
    brand: "Nivia",
    category: "Sports",
    price: 899,
    rating: 4.4,
    stock: 40,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    description: "Durable football for training and outdoor matches."
  },

  {
    id: 28,
    title: "Badminton Racket",
    brand: "Yonex",
    category: "Sports",
    price: 1799,
    rating: 4.5,
    stock: 25,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
    description: "Lightweight badminton racket with excellent control."
  },

  {
    id: 29,
    title: "Running Shoes",
    brand: "Nike",
    category: "Sports",
    price: 3999,
    rating: 4.6,
    stock: 30,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Comfortable running shoes for sports and fitness."
  },

  {
    id: 30,
    title: "Basketball",
    brand: "Spalding",
    category: "Sports",
    price: 1299,
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    description: "Durable basketball suitable for indoor and outdoor games."
  },

  {
    id: 31,
    title: "Tennis Racket",
    brand: "Wilson",
    category: "Sports",
    price: 2999,
    rating: 4.5,
    stock: 20,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0",
    description: "Lightweight tennis racket for beginners and professionals."
  },

  {
    id: 32,
    title: "Yoga Mat",
    brand: "Boldfit",
    category: "Sports",
    price: 899,
    rating: 4.4,
    stock: 50,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
    description: "Non-slip yoga mat for exercise and meditation."
  },

  {
    id: 33,
    title: "Gym Dumbbells",
    brand: "Kobo",
    category: "Sports",
    price: 2499,
    rating: 4.5,
    stock: 25,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
    description: "Durable dumbbell set for home workouts."
  },

  {
    id: 34,
    title: "Skipping Rope",
    brand: "Nivia",
    category: "Sports",
    price: 399,
    rating: 4.2,
    stock: 60,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
    description: "Lightweight skipping rope for cardio workouts."
  },

  {
    id: 35,
    title: "Sports Water Bottle",
    brand: "Puma",
    category: "Sports",
    price: 699,
    rating: 4.3,
    stock: 45,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    description: "Reusable sports water bottle for workouts."
  },

  {
    id: 36,
    title: "Cricket Helmet",
    brand: "SS",
    category: "Sports",
    price: 1999,
    rating: 4.4,
    stock: 20,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
    description: "Protective cricket helmet with comfortable padding."
  },

  {
    id: 37,
    title: "Cricket Gloves",
    brand: "SG",
    category: "Sports",
    price: 999,
    rating: 4.3,
    stock: 30,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
    description: "Comfortable batting gloves for cricket players."
  },

  {
    id: 38,
    title: "Football Shoes",
    brand: "Adidas",
    category: "Sports",
    price: 3499,
    rating: 4.5,
    stock: 25,
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26",
    description: "Professional football shoes with excellent grip."
  },

  {
    id: 39,
    title: "Boxing Gloves",
    brand: "Everlast",
    category: "Sports",
    price: 1799,
    rating: 4.6,
    stock: 20,
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed",
    description: "Durable boxing gloves for training and fitness."
  },

  {
    id: 40,
    title: "Sports Cap",
    brand: "Nike",
    category: "Sports",
    price: 799,
    rating: 4.3,
    stock: 40,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b",
    description: "Lightweight sports cap for outdoor activities."
  },

  {
    id: 41,
    title: "Fitness Resistance Bands",
    brand: "Boldfit",
    category: "Sports",
    price: 699,
    rating: 4.4,
    stock: 50,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc",
    description: "Resistance bands for strength and fitness training."
  },

  {
    id: 42,
    title: "Exercise Mat",
    brand: "Strauss",
    category: "Sports",
    price: 899,
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
    description: "Comfortable exercise mat for home workouts."
  },

  {
    id: 43,
    title: "Volleyball",
    brand: "Cosco",
    category: "Sports",
    price: 999,
    rating: 4.4,
    stock: 30,
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1",
    description: "Durable volleyball for training and matches."
  },

  {
    id: 44,
    title: "Table Tennis Bat",
    brand: "Stag",
    category: "Sports",
    price: 799,
    rating: 4.3,
    stock: 40,
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900",
    description: "Professional table tennis bat with excellent grip."
  },

  {
    id: 45,
    title: "Golf Club Set",
    brand: "Callaway",
    category: "Sports",
    price: 12999,
    rating: 4.6,
    stock: 10,
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b",
    description: "Premium golf club set for golf enthusiasts."
  },

  {
    id: 46,
    title: "Cycling Helmet",
    brand: "Decathlon",
    category: "Sports",
    price: 1499,
    rating: 4.5,
    stock: 25,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
    description: "Lightweight protective helmet for cycling."
  },

  {
    id: 47,
    title: "Sports Socks",
    brand: "Adidas",
    category: "Sports",
    price: 499,
    rating: 4.2,
    stock: 60,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82",
    description: "Comfortable sports socks for active lifestyles."
  },

  {
    id: 48,
    title: "Gym Gloves",
    brand: "Puma",
    category: "Sports",
    price: 699,
    rating: 4.4,
    stock: 35,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
    description: "Protective gym gloves with strong grip."
  },

  {
    id: 49,
    title: "Sports Towel",
    brand: "Nike",
    category: "Sports",
    price: 599,
    rating: 4.3,
    stock: 45,
    image: "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad",
    description: "Soft and absorbent towel for workouts."
  },

  {
    id: 50,
    title: "Cricket Stumps Set",
    brand: "SG",
    category: "Sports",
    price: 799,
    rating: 4.4,
    stock: 25,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da",
    description: "Complete cricket stumps set for practice and matches."
  },


  // =====================================================
  // FURNITURE PRODUCTS - 51 to 75
  // =====================================================

  {
    id: 51,
    title: "Modern Office Chair",
    brand: "Green Soul",
    category: "Furniture",
    price: 6999,
    rating: 4.5,
    stock: 18,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8",
    description: "Ergonomic office chair with comfortable back support."
  },

  {
    id: 52,
    title: "Wooden Study Table",
    brand: "Wakefit",
    category: "Furniture",
    price: 5499,
    rating: 4.4,
    stock: 20,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    description: "Strong wooden study table with modern design."
  },

  {
    id: 53,
    title: "Comfortable Sofa",
    brand: "Urban Ladder",
    category: "Furniture",
    price: 24999,
    rating: 4.6,
    stock: 10,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    description: "Premium comfortable sofa for living room."
  },

  {
    id: 54,
    title: "Wooden Dining Table",
    brand: "HomeTown",
    category: "Furniture",
    price: 12999,
    rating: 4.5,
    stock: 12,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200",
    description: "Elegant wooden dining table for family dining."
  },

  {
    id: 55,
    title: "King Size Bed",
    brand: "Wakefit",
    category: "Furniture",
    price: 18999,
    rating: 4.7,
    stock: 8,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    description: "Spacious king size bed with modern wooden frame."
  },

  {
    id: 56,
    title: "Wooden Bookshelf",
    brand: "IKEA",
    category: "Furniture",
    price: 5999,
    rating: 4.4,
    stock: 15,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156",
    description: "Modern bookshelf for books and home decoration."
  },

  {
    id: 57,
    title: "Coffee Table",
    brand: "Urban Ladder",
    category: "Furniture",
    price: 4999,
    rating: 4.3,
    stock: 18,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d",
    description: "Modern coffee table for living room."
  },

  {
    id: 58,
    title: "TV Entertainment Unit",
    brand: "IKEA",
    category: "Furniture",
    price: 8999,
    rating: 4.5,
    stock: 12,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    description: "Stylish entertainment unit for television and accessories."
  },

  {
    id: 59,
    title: "Wooden Wardrobe",
    brand: "Godrej",
    category: "Furniture",
    price: 15999,
    rating: 4.4,
    stock: 10,
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
    description: "Spacious wooden wardrobe with modern storage design."
  },

  {
    id: 60,
    title: "Bedside Table",
    brand: "Wakefit",
    category: "Furniture",
    price: 2999,
    rating: 4.3,
    stock: 25,
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
    description: "Compact bedside table with storage space."
  },

  {
    id: 61,
    title: "Recliner Chair",
    brand: "Durian",
    category: "Furniture",
    price: 15999,
    rating: 4.6,
    stock: 10,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91",
    description: "Comfortable recliner chair for relaxing at home."
  },

  {
    id: 62,
    title: "Dining Chair Set",
    brand: "Nilkamal",
    category: "Furniture",
    price: 7999,
    rating: 4.4,
    stock: 15,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657",
    description: "Modern dining chair set for family dining."
  },

  {
    id: 63,
    title: "Computer Desk",
    brand: "Wakefit",
    category: "Furniture",
    price: 4499,
    rating: 4.5,
    stock: 20,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    description: "Spacious computer desk for work and study."
  },

  {
    id: 64,
    title: "Plastic Chair Set",
    brand: "Nilkamal",
    category: "Furniture",
    price: 3999,
    rating: 4.2,
    stock: 30,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657",
    description: "Strong and lightweight chairs for home use."
  },

  {
    id: 65,
    title: "Shoe Rack",
    brand: "IKEA",
    category: "Furniture",
    price: 3499,
    rating: 4.3,
    stock: 25,
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8",
    description: "Compact shoe rack with multiple storage levels."
  },

  {
    id: 66,
    title: "Wooden Stool",
    brand: "HomeTown",
    category: "Furniture",
    price: 1499,
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    description: "Simple wooden stool for home and kitchen use."
  },

  {
    id: 67,
    title: "Dressing Table",
    brand: "Urban Ladder",
    category: "Furniture",
    price: 8999,
    rating: 4.5,
    stock: 12,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013",
    description: "Elegant dressing table with mirror and storage."
  },

  {
    id: 68,
    title: "Corner Sofa",
    brand: "Wakefit",
    category: "Furniture",
    price: 22999,
    rating: 4.6,
    stock: 8,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    description: "Large comfortable corner sofa for living rooms."
  },

  {
    id: 69,
    title: "Folding Table",
    brand: "AmazonBasics",
    category: "Furniture",
    price: 2499,
    rating: 4.3,
    stock: 30,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    description: "Portable folding table for home and office."
  },

  {
    id: 70,
    title: "Office Desk",
    brand: "IKEA",
    category: "Furniture",
    price: 5999,
    rating: 4.5,
    stock: 18,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    description: "Modern office desk with spacious work area."
  },

  {
    id: 71,
    title: "Wooden Bench",
    brand: "HomeTown",
    category: "Furniture",
    price: 3999,
    rating: 4.3,
    stock: 15,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    description: "Strong wooden bench for home and garden."
  },

  {
    id: 72,
    title: "Bookshelf Cabinet",
    brand: "Godrej",
    category: "Furniture",
    price: 7999,
    rating: 4.4,
    stock: 12,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156",
    description: "Spacious cabinet for books and household storage."
  },

  {
    id: 73,
    title: "Plastic Storage Cabinet",
    brand: "Nilkamal",
    category: "Furniture",
    price: 4999,
    rating: 4.2,
    stock: 20,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    description: "Lightweight storage cabinet for organized homes."
  },

  {
    id: 74,
    title: "TV Stand",
    brand: "IKEA",
    category: "Furniture",
    price: 5499,
    rating: 4.4,
    stock: 15,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    description: "Modern TV stand with storage compartments."
  },

  {
    id: 75,
    title: "Storage Ottoman",
    brand: "Urban Ladder",
    category: "Furniture",
    price: 2999,
    rating: 4.3,
    stock: 20,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91",
    description: "Comfortable ottoman with hidden storage space."
  },


  // =====================================================
  // BAGS PRODUCTS - 76 to 100
  // =====================================================

  {
    id: 76,
    title: "Travel Backpack",
    brand: "American Tourister",
    category: "Bags",
    price: 1999,
    rating: 4.5,
    stock: 35,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description: "Spacious travel backpack with multiple compartments."
  },

  {
    id: 77,
    title: "Leather Handbag",
    brand: "Lavie",
    category: "Bags",
    price: 2499,
    rating: 4.4,
    stock: 25,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "Stylish leather handbag for everyday use."
  },

  {
    id: 78,
    title: "Laptop Backpack",
    brand: "Skybags",
    category: "Bags",
    price: 1799,
    rating: 4.5,
    stock: 40,
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
    description: "Water-resistant laptop backpack with padded laptop compartment."
  },

  {
    id: 79,
    title: "School Backpack",
    brand: "Wildcraft",
    category: "Bags",
    price: 1299,
    rating: 4.3,
    stock: 50,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3",
    description: "Durable and lightweight backpack for school and college."
  },

  {
    id: 80,
    title: "Gym Duffle Bag",
    brand: "Puma",
    category: "Bags",
    price: 1599,
    rating: 4.4,
    stock: 30,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHFMb7QFITNhKrcFq9czMcApSXfz2h080_DSXL9ur4w&s",
    description: "Spacious duffle bag for gym and sports activities."
  },

  {
    id: 81,
    title: "Office Laptop Bag",
    brand: "Dell",
    category: "Bags",
    price: 1499,
    rating: 4.4,
    stock: 35,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
    description: "Professional laptop bag for office and business use."
  },

  {
    id: 82,
    title: "Sling Bag",
    brand: "Fastrack",
    category: "Bags",
    price: 999,
    rating: 4.2,
    stock: 45,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
    description: "Compact sling bag for everyday travel."
  },

  {
    id: 83,
    title: "Leather Wallet",
    brand: "WildHorn",
    category: "Bags",
    price: 699,
    rating: 4.3,
    stock: 55,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    description: "Premium leather wallet with multiple card slots."
  },

  {
    id: 84,
    title: "Trolley Travel Bag",
    brand: "American Tourister",
    category: "Bags",
    price: 4999,
    rating: 4.6,
    stock: 15,
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87",
    description: "Durable trolley bag for travel and holidays."
  },

  {
    id: 85,
    title: "Shopping Tote Bag",
    brand: "Baggit",
    category: "Bags",
    price: 1299,
    rating: 4.3,
    stock: 30,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c",
    description: "Stylish tote bag suitable for shopping and everyday use."
  },

  {
    id: 86,
    title: "College Backpack",
    brand: "Wildcraft",
    category: "Bags",
    price: 1599,
    rating: 4.4,
    stock: 40,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description: "Spacious college backpack for books and accessories."
  },

  {
    id: 87,
    title: "Camera Backpack",
    brand: "Lowepro",
    category: "Bags",
    price: 3999,
    rating: 4.6,
    stock: 18,
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
    description: "Protective camera backpack with multiple compartments."
  },

  {
    id: 88,
    title: "Duffel Travel Bag",
    brand: "Adidas",
    category: "Bags",
    price: 2199,
    rating: 4.5,
    stock: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSs8kjt4h7Dh7KnZb3h7C52MpF-zU50XRjQvbjwHIYQA&s=10",
    description: "Large duffel bag suitable for travel and sports."
  },

  {
    id: 89,
    title: "Women's Shoulder Bag",
    brand: "Baggit",
    category: "Bags",
    price: 1899,
    rating: 4.4,
    stock: 30,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "Elegant shoulder bag for everyday fashion."
  },

  {
    id: 90,
    title: "Crossbody Bag",
    brand: "Fastrack",
    category: "Bags",
    price: 1199,
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
    description: "Compact crossbody bag for everyday use."
  },

  {
    id: 91,
    title: "Travel Suitcase",
    brand: "VIP",
    category: "Bags",
    price: 5999,
    rating: 4.6,
    stock: 12,
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87",
    description: "Durable hard-shell suitcase for long-distance travel."
  },

  {
    id: 92,
    title: "Messenger Bag",
    brand: "American Tourister",
    category: "Bags",
    price: 1499,
    rating: 4.3,
    stock: 25,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
    description: "Stylish messenger bag for office and daily use."
  },

  {
    id: 93,
    title: "Makeup Bag",
    brand: "Lavie",
    category: "Bags",
    price: 799,
    rating: 4.4,
    stock: 45,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    description: "Compact makeup bag with convenient storage."
  },

  {
    id: 94,
    title: "Gym Backpack",
    brand: "Puma",
    category: "Bags",
    price: 1799,
    rating: 4.4,
    stock: 30,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description: "Durable backpack designed for gym and fitness activities."
  },

  {
    id: 95,
    title: "Canvas Backpack",
    brand: "Skybags",
    category: "Bags",
    price: 1399,
    rating: 4.2,
    stock: 40,
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
    description: "Lightweight canvas backpack for everyday travel."
  },

  {
    id: 96,
    title: "Leather Briefcase",
    brand: "Fossil",
    category: "Bags",
    price: 6999,
    rating: 4.6,
    stock: 10,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
    description: "Premium leather briefcase for business professionals."
  },

  {
    id: 97,
    title: "Kids Backpack",
    brand: "Disney",
    category: "Bags",
    price: 899,
    rating: 4.5,
    stock: 50,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3",
    description: "Colorful and lightweight backpack for kids."
  },

  {
    id: 98,
    title: "Foldable Travel Bag",
    brand: "American Tourister",
    category: "Bags",
    price: 1199,
    rating: 4.3,
    stock: 35,
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87",
    description: "Lightweight foldable bag for convenient travel."
  },

  {
    id: 99,
    title: "Premium Handbag",
    brand: "Caprese",
    category: "Bags",
    price: 2999,
    rating: 4.5,
    stock: 20,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "Premium handbag with elegant design and spacious storage."
  },

  {
    id: 100,
    title: "Large Travel Backpack",
    brand: "Wildcraft",
    category: "Bags",
    price: 2499,
    rating: 4.6,
    stock: 25,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description: "Large travel backpack with multiple compartments and strong build."
  }

];

export default products;