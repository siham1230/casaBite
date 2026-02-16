import dotenv from "dotenv";
dotenv.config();


import sequelize from "../config/database.js";
import bcrypt from 'bcrypt';


import { User, Category, Restaurant, Product } from '../Models/Associations.js';


const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("✅ Database reset");



        const hashedAdmin = await bcrypt.hash("admin123", 10);
        const hashedCustomer = await bcrypt.hash("password123", 10);


        const users = await User.bulkCreate([
            {
                name: 'Siham ouchrif',
                email: 'sihamOuchrif@gmail.com',
                password: hashedAdmin,
                role: 'admin',
                phone: '+212608675485',
                address: 'Casa Port, Casablanca',
                isActive: true,
            },
            {
                name: 'Ahmed Benani',
                email: 'ahmed@example.com',
                password: hashedCustomer,
                role: 'customer',
                phone: '+212600111111',
                address: 'Rue Mohammed V, Gauthier, Casablanca',
                isActive: true
            },
            {
                name: 'Fatima Zahra',
                email: 'fatima@example.com',
                password: hashedCustomer,
                role: 'customer',
                phone: '+212600222222',
                address: 'Boulevard Zerktouni, Maârif, Casablanca',
                isActive: true
            },
            {
                name: 'Youssef Alaoui',
                email: 'youssef@example.com',
                password: hashedCustomer,
                role: 'customer',
                phone: '+212600333333',
                address: 'Boulevard d\'Anfa, Anfa, Casablanca',
                isActive: true
            },

        ],
            { returning: true }
        );
        console.log("✅ Users seeded");



        const categories = await Category.bulkCreate([
            {
                name: 'Morrocan',
                icon: '🇲🇦',
                description: 'Traditional Moroccan cuisin - tagines, couscous, pastilla',
                image: "https://res.cloudinary.com/due3ly2d3/image/upload/v1771015992/Tajine_dyz5xg.jpg",
                displayOrder: 1,
                isActive: true
            },
            {
                name: 'Asian',
                icon: '🍣',
                description: 'Japanese, Chinese, Thai, and Vitnamese cuisine',
                image: "https://res.cloudinary.com/due3ly2d3/image/upload/v1771016624/Asian_food_iuumoc.jpg",
                displayOrder: 2,
                isActive: true
            },
            {
                name: "Italian",
                icon: '🍕',
                description: 'Pizza, pasta, and authentic Italian dishes',
                image: "https://res.cloudinary.com/due3ly2d3/image/upload/v1771016935/Italian_food_vnfxwk.jpg",
                displayOrder: 3,
                isActive: true
            },
            {
                name: 'Fast Food',
                icon: '🍔',
                description: 'Burgers, tocos, sandwiches, and quick meals',
                image: "https://res.cloudinary.com/due3ly2d3/image/upload/v1771017232/fast_food_bbmv3d.jpg",
                displayOrder: 4,
                isActive: true
            },
            {
                name: 'Desserts & Bakery',
                icon: '🍰',
                description: 'Cakes, pastries, ice cream, and sweet treats',
                image: "https://res.cloudinary.com/due3ly2d3/image/upload/v1771017557/Dessert_and_Cake_wkznba.jpg",
                displayOrder: 5,
                isActive: true
            }

        ],
            { returning: true }
        );
        console.log("✅ Categories seeded")



        const restaurants = await Restaurant.bulkCreate([

            {
                name: 'La Sqala',
                description: 'Historic restaurant serving authentic Moroccan cuisin in a beautiful garden setting',
                categoryId: categories[0].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771023836/la-sqala-casablanca_imfl7j.jpg',
                address: 'Boulvard des almohades, Quartier habous',
                district: 'Casa Port',
                phone: '+212522264960',
                rating: 4.7,
                deliveryTime: 35,
                deliveryCost: 12.00,
                openingTime: '12:00:00',
                closingTime: '23:00:00',
                isActive: true,
                cuisineType: 'Moroccan',
                tags: ['Halal', 'Traditional']
            },
            {
                name: 'Rick\'s Cafe',
                description: 'Elegant restaurant inspired by the classic film Casablanca',
                categoryId: categories[0].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771024707/rick-s-cafe_jxsbrr.jpg',
                address: '280 Boulevard Sour Jdid',
                district: 'Casa Port',
                phone: '+212522274207',
                rating: 4.5,
                deliveryTime: 40,
                deliveryCost: 15.00,
                openingTime: '12:00:00',
                closingTime: '23:30:00',
                isActive: true,
                cuisineType: 'Moroccan Fusion',
                tags: ['Halal', 'Romantic']
            },
            {
                name: 'Dae Beida',
                description: 'Family-friendly Moroccan restaurant with home-style cooking',
                categoryId: categories[0].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771025316/Dar_beida_agiwno.jpg',
                address: 'Rue Mohamed V, Gauthier',
                district: 'Gauthier',
                phone: '+212522220156',
                rating: 4.3,
                deliveryTime: 30,
                deliveryCost: 10.00,
                openingTime: '11:30:00',
                closingTime: '22:30:00',
                isActive: true,
                cuisineType: 'Moroccan',
                tags: ['Halal', 'Home Style']
            },

            // Asian cuisin

            {
                name: 'Yokohama Sushi Bar',
                description: 'Premium sushi and Japanese cuisine with fresh daily',
                categoryId: categories[1].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771026927/yokohama_necjjd.jpg',
                address: 'Rue Tafilalet, Quartier Gauthier',
                district: 'Gauthier',
                phone: '+212522369900',
                rating: 5.8,
                deliveryTime: 35,
                deliveryCost: 15.00,
                openingTime: '12:00:00',
                closingTime: '22:30:00',
                isActive: true,
                cuisineType: 'Japanese',
                tags: ['Sushi', 'Fresh']
            },
            {
                name: 'Saigon Street',
                description: 'Authentic Vietnamese street food and pho',
                categoryId: categories[1].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771029123/sagegon_idcs20.',
                address: 'Boulevard Zerktouni, Maârif',
                district: 'Maârif',
                phone: '+212522987654',
                rating: 4.4,
                deliveryTime: 30,
                deliveryCost: 12.00,
                openingTime: '11:00:00',
                closingTime: '22:00:00',
                isActive: true,
                cuisineType: 'Vietnamese',
                tags: ['Healthy', 'Spicy']
            },
            {
                name: 'Dragon Wok',
                description: 'Chinese Wok dishes and dim sum',
                categoryId: categories[1].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771030104/dragon_algqso.jpg',
                address: 'Rue Abou Kacem Chabbi, Anfa',
                district: 'Anfa',
                phone: '+212522365432',
                rating: 4.2,
                deliveryTime: 35,
                deliveryCost: 18.00,
                openingTime: '11:30:00',
                closingTime: '23:00:00',
                isActive: true,
                cuisineType: 'Chinese',
                tags: ['Wok', 'Dim Sum']
            },

            // Itlian cuisine
            {
                name: 'Napoli Pizza',
                description: 'Wood-fired Neapolitan pizzas',
                categoryId: categories[2].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771031715/napoli_petixo.jpg',
                address: 'Rue Soumaya, Gauthier',
                district: 'Gauthier',
                phone: '+212522278899',
                rating: 4.6,
                deliveryTime: 25,
                deliveryCost: 10.00,
                openingTime: '23:00:00',
                closingTime: '23:00:00',
                isActive: true,
                cuisineType: 'Italian',
                tags: ['Pizza', 'Wood Fired']
            },
            {
                name: 'La Trattoria',
                description: 'Homemade pasta and classic Italian dishes',
                categoryId: categories[2].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771082028/la_Trattoria_sjsv6w.jpg',
                address: 'Boulevard d\'Anfa, Anfa',
                district: 'Anfa',
                phone: '+212522361234',
                rating: 4.5,
                deliveryTime: 30,
                deliveryCost: 15.00,
                openingTime: '12:00:00',
                closingTime: '22:30:00',
                isActive: true,
                cuisineType: 'Italian',
                tags: ['Pasta', 'Homemade']
            },

            // Fast food

            {
                name: 'Burger House',
                description: 'Gourment burgers with fresh beef',
                categoryId: categories[3].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771084373/burger_food_hrbpru.jpg',
                address: 'Rue Bnou Majed Aljouhary, Maârif',
                district: 'Maârif',
                phone: '+212522445566',
                rating: 4.3,
                deliveryTime: 20,
                deliveryCost: 10.00,
                openingTime: '11:00:00',
                closingTime: '00:00:00',
                isActive: false,
                cuisineType: 'American',
                tags: ['Burgers', 'Fast']
            },
            {
                name: 'Tacos Del Rey',
                description: 'Mexican street tacos',
                categoryId: categories[3].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771085247/tacos_bcsgoy.jpg',
                address: 'Rue Mekenes, Gauthier',
                district: 'Gauthier',
                phone: '+212522556677',
                rating: 4.1,
                deliveryTime: 25,
                deliveryCost: 10.00,
                openingTime: '11:30:00',
                closingTime: '23:30:00',
                isActive: true,
                cuisineType: 'Mexican',
                tags: ['Tacos', 'Spicy']
            },

            // Desserts & bakery
            {
                name: 'Paul Casablanca',
                description: 'French bakery with frech pastries',
                categoryId: categories[4].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771093784/Paul_jwqlas.jpg',
                address: 'Boulevard Zerktouni, Maârif',
                district: 'Maârif',
                phone: '+212522367800',
                rating: 4.4,
                deliveryTime: 20,
                deliveryCost: 10.00,
                openingTime: '07:00:00',
                closingTime: '21:00:00',
                isActive: true,
                cuisineType: 'French',
                tags: ['Bakery', 'coffee']
            },
            {
                name: 'Sweet Dreams',
                description: 'Artisan ice cream and desserts',
                categoryId: categories[4].id,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771094808/sweet_dream_uawul7.jpg',
                address: 'Rue Abou Hanifa, Anfa',
                district: 'Anfa',
                phone: '+212522378900',
                rating: 4.6,
                deliveryTime: 15,
                deliveryCost: 10.00,
                openingTime: '10:00:00',
                closingTime: '23:00:00',
                isActive: true,
                cuisineType: 'Desserts',
                tags: ['Ice Cream', 'Sweet']
            },


        ],
            { returning: true }
        );
        console.log("✅ Restaurant seeded");

        const products = await Product.bulkCreate([

            {
                restaurantId: restaurants[0].id,
                name: 'Couscous Royal',
                description: 'Traditional couscous with lamb, chocken',
                ingredients: 'Smmolina, lamb, chicken, vegetable , Moroccan spices',
                price: 150.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771097063/couscous_ntg3z5.jpg',
                preparationTime: 60,
                isAvailable: true,
                tags: ['Halal', 'Traditional']
            },
            {
                restaurantId: restaurants[0].id,
                name: 'Tajine Poulet Citron',
                description: 'Chicken tagine with preserved lemon',
                ingredients: 'Chicken, preserved lemons, green olives, onions, garlic, ginger, saffron, olive oil',
                price: 80.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771097892/tajine_2_t8dn8h.jpg',
                preparationTime: 40,
                isAvailable: true,
                tags: ['Halal', 'Tradition']
            },
            {
                restaurantId: restaurants[0].id,
                name: 'Pastilla au Poulet',
                description: 'Sweet and savory chicken',
                ingredients: 'Chicken, phyllo pastry, almonds, eggs, cinnamon, sugar, orange blossom water',
                price: 85.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771098474/Pastilla_ol4vki.jpg',
                preparationTime: 50,
                isAvailable: true,
                tags: ['Halal', 'Traditional']
            },
            {
                restaurantId: restaurants[0].id,
                name: 'Harira Soup',
                description: 'Traditional Moroccan soup ',
                ingredients: 'Tomatoes, lentils, chickpeas, lamb, onions, celery, herbs, spices',
                price: 25,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771099235/Moroccan_Harira_g5dv10.jpg',
                preparationTime: 20,
                isAvailable: true,
                tags: ['Halal', 'Soup']
            },

            // Yokohama Sushi 
            {
                restaurantId: restaurants[3].id,
                name: 'Sushi Maki Mix',
                description: 'Assorted maki rolls - 18 pieces',
                ingredients: 'Salmon, tuna, avocado, cucumber, rice, nori, wasabi, soy sauce',
                price: 135.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771100123/sushi_xfymuo.jpg',
                preparationTime: 25,
                isAvailable: true,
                tags: ['Sushi', 'Fresh']
            },
            {
                restaurantId: restaurants[3].id,
                name: 'Salmon Sashimi',
                description: 'Fresh Norwegian salmon sashimi - 8 pieces',
                ingredients: 'Norwegian salmon, wasabi, soy sauce, pickled ginger',
                price: 95.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771100514/Salmon_Sashimi_b5jyna.jpg',
                preparationTime: 15,
                isAvailable: true,
                tags: ['Sashimi', 'Premium']
            },
            {
                restaurantId: restaurants[3].id,
                name: 'California Roll',
                description: 'Crab, avocado, and cucumber roll - 8 pieces',
                ingredients: 'Imitation crab, avocado, cucumber, rice, nori, sesame seeds',
                price: 65.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771100915/California_Roll_1_y7kkeb.jpg',
                preparationTime: 20,
                isAvailable: true,
                tags: ['Sushi', 'Classic']
            },

            {
                restaurantId: restaurants[3].id,
                name: 'Ramen Tonkotsu',
                description: 'Rich pork bone broth ramen',
                ingredients: 'Pork broth, noodles, chashu pork, egg',
                price: 85.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771101353/Tonkotsu_Ramen_rkgayi.jpg',
                preparationTime: 30,
                isAvailable: true,
                tags: ['Ramen', 'Hot']
            },
            //Napoli Pizza
            {
                restaurantId: restaurants[6].id,
                name: 'Pizza Margherita',
                description: 'Classic Neapolitan pizza',
                ingredients: 'Tomato sauce, mozzarella, fresh basil, olive oil',
                price: 65.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771101855/Pizza_Margherita_p6hc4w.jpg',
                preparationTime: 15,
                category: 'Main',
                isAvailable: true,
                tags: ['Pizza', 'Vegetarian']
            },
            {
                restaurantId: restaurants[6].id,
                name: 'Pizza Quattro Formaggi',
                description: 'Four cheese pizza',
                ingredients: 'Mozzarella, gorgonzola, parmesan, goat cheese, olive oil',
                price: 85.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771102208/Pizza_Quattro_Formaggi_Recipe_x1maz6.jpg',
                preparationTime: 15,
                isAvailable: true,
                tags: ['Vegetarian', 'Cheese']
            },
            {
                restaurantId: restaurants[6].id,
                name: 'Tiramisu',
                description: 'Classic Italian tiramisu dessert',
                ingredients: 'Mascarpone, espresso, ladyfingers, cocoa powder',
                price: 45.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771103071/Easy_Chocolate_Tiramisu__20_Min_Indulgence_qtx4ju.jpg',
                preparationTime: 5,
                isAvailable: true,
                tags: ['Dessert', 'Sweet']
            },

            // Burger House 
            {
                restaurantId: restaurants[8].id,
                name: 'Classic Burger',
                description: 'Beef burger with fresh toppings',
                ingredients: 'Beef patty, lettuce, tomato, onion, pickles, special sauce, sesame bun',
                price: 55.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771103339/Delicious_Yummy_Burger_mlpa7z.jpg',
                preparationTime: 15,
                isAvailable: true,
                tags: ['Burger', 'Fast']
            },
            {
                restaurantId: restaurants[8].id,
                name: 'Cheese Burger',
                description: 'Beef burger with double cheddar cheese',
                ingredients: 'Beef patty, double cheddar, lettuce, tomato, onion, sauce, bun',
                price: 65.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771103650/crack_burgers_-_ndlout.jpg',
                preparationTime: 15,
                isAvailable: true,
                tags: ['Burger', 'Cheese']
            },
            {
                restaurantId: restaurants[8].id,
                name: 'French Fries',
                description: 'Crispy golden french fries',
                ingredients: 'Potatoes, salt',
                price: 20.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771104010/french_fries_ryc0zv.jpg',
                preparationTime: 10,
                isAvailable: true,
                tags: ['Side', 'Spicy']
            },

            // Paul coffe
            {
                restaurantId: restaurants[10].id,
                name: 'Croissant',
                description: 'Buttery French croissant',
                ingredients: 'Flour, butter, milk, yeast, sugar',
                price: 15.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771104711/Croissant_fhegs2.jpg',
                preparationTime: 5,
                isAvailable: true,
                tags: ['Breakfast', 'Pastry']
            },
            {
                restaurantId: restaurants[10].id,
                name: 'Pain au Chocolat',
                description: 'Chocolate-filled pastry',
                ingredients: 'Flour, butter, chocolate, milk, yeast',
                price: 18.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771105005/Irresistibly_Flaky_Pain_au_Chocolat_You_ll_Crave_Daily_gzvewy.jpg',
                preparationTime: 5,
                isAvailable: true,
                tags: ['Chocolate', 'Pastry']
            },
            {
                restaurantId: restaurants[10].id,
                name: 'Espresso',
                description: 'Strong Italian espresso',
                ingredients: 'Coffee beans, water',
                price: 12.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771105174/Espresso_r8j6hw.jpg',
                preparationTime: 5,
                isAvailable: true,
                tags: ['Coffee', 'Hot', 'Strong']
            },
            {
                restaurantId: restaurants[10].id,
                name: 'Cappuccino',
                description: 'Espresso with steamed milk ',
                ingredients: 'Coffee beans, milk',
                price: 22.00,
                image: 'https://res.cloudinary.com/due3ly2d3/image/upload/v1771105339/Cappuccino_vtjjff.jpg',
                preparationTime: 5,
                isAvailable: true,
                tags: ['Coffee', 'Hot', 'Milk']
            },

        ],
            { returning: true }
        );
        console.log("✅Products seeded")



        console.log("\n casaBite SEEDED SUCCESSFULLY!");
        console.log("\n📊 Database Summary:");
        console.log(`   ✅ ${users.length} Users`);
        console.log(`   ✅ ${categories.length} Categories`);
        console.log(`   ✅ ${restaurants.length} Restaurants`);
        console.log(`   ✅ ${products.length} Products`);

        console.log("\n📧 Test Credentials:");
        console.log("   Admin    - Email: siham@casalivraison.com, Password: admin123");
        console.log("   Customer - Email: ahmed@example.com, Password: password123");
        console.log("   Customer - Email: fatima@example.com, Password: password123");


        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding error:", error);
        console.error("Error details:", error.message);
        process.exit(1);

    }
};

seedAll();


