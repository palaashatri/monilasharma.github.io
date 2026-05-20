document.addEventListener('DOMContentLoaded', () => {

    // 1. Automatically match system color scheme
    const root = document.documentElement;
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applySystemTheme = () => {
        root.dataset.theme = colorSchemeQuery.matches ? 'dark' : 'light';
    };

    applySystemTheme();

    if (typeof colorSchemeQuery.addEventListener === 'function') {
        colorSchemeQuery.addEventListener('change', applySystemTheme);
    } else if (typeof colorSchemeQuery.addListener === 'function') {
        colorSchemeQuery.addListener(applySystemTheme);
    }

    // 2. Generate ambient animated background blobs
    const bgContainer = document.getElementById('animated-bg');

    for (let i = 0; i < 16; i++) {
        const blob = document.createElement('div');
        blob.className = 'ambient-blob';

        blob.style.setProperty('--x', `${Math.random() * 100}%`);
        blob.style.setProperty('--y', `${Math.random() * 100}%`);
        blob.style.setProperty('--size', `${70 + Math.random() * 180}px`);
        blob.style.setProperty('--duration', `${10 + Math.random() * 12}s`);
        blob.style.setProperty('--delay', `-${Math.random() * 12}s`);

        bgContainer.appendChild(blob);
    }

    const images = [
  "elegant-grey-rosette-birthday-cake.webp",
  "red-velvet-swirl-cake-bowl.webp",
  "astronaut-space-rocket-birthday-cake.webp",
  "kitchen-cooking-lady-birthday-cake.webp",
  "lazy-retirement-65th-birthday-cake.webp",
  "romantic-red-roses-love-anniversary-cake.webp",
  "heart-shaped-chocolate-gift-box-cake.webp",
  "21st-anniversary-photo-film-strip-cake.webp",
  "42nd-anniversary-pink-butterfly-cake.webp",
  "50th-anniversary-butterfly-cake.webp",
  "baby-bottle-1st-birthday-cake.webp",
  "blue-purple-rosette-birthday-girl-cake.webp",
  "blueberry-compote-round-cake.webp",
  "chocolate-overload-happy-holi-cake.webp",
  "cute-lion-face-kids-cake.webp",
  "elegant-red-silver-ornament-anniversary-cake.webp",
  "floral-tri-cake-setup-with-photos.webp",
  "heart-shaped-chocolate-birthday-cake.webp",
  "papas-shirt-and-tie-cake.webp",
  "pink-makeup-theme-birthday-cake.webp",
  "pink-purple-floral-butterfly-cake.webp",
  "pizza-slice-illusion-cake.webp",
  "premium-chocolate-swirl-cake.webp",
  "red-mini-cake-black-hearts.webp",
  "red-mirror-glaze-heart-cake.webp",
  "red-velvet-heart-cake.webp",
  "romantic-love-you-bunting-cake.webp",
  "valentines-day-rose-pot-cake.webp",
  "white-swirl-rose-anniversary-cake.webp",
  "worlds-best-sister-cake.webp",
  "classic-oreo-chocolate-cake-bowl.webp",
  "strawberry-dream-pink-cake-bowl.webp",
  "oreo-swirl-chocolate-chip-cake-bowl.webp",
  "romantic-red-velvet-heart-cake-bowl.webp",
  "velvety-red-velvet-cream-cake-bowl.webp",
  "fresh-fruit-rainbow-cake-bowl.webp",
  "pineapple-mango-gold-pearl-cake-bowl.webp"
];

    const cakeCatalog = [
  {
    "title": "Elegant Grey Rosette Cake",
    "description": "A sophisticated grey buttercream cake adorned with delicate rosettes and shimmering pearls.",
    "category": "Birthday",
    "fileName": "elegant-grey-rosette-birthday-cake.webp"
  },
  {
    "title": "Red Velvet Swirl Bowl",
    "description": "Elegant red velvet layers topped with rich crimson swirls and shimmering silver pearls.",
    "category": "Cake Bowls",
    "fileName": "red-velvet-swirl-cake-bowl.webp"
  },
  {
    "title": "Astronaut Space Adventure Cake",
    "description": "Journey to the stars with this space-themed cake featuring a rocket, astronaut, and lunar landscape.",
    "category": "Kids",
    "fileName": "astronaut-space-rocket-birthday-cake.webp"
  },
  {
    "title": "Chef's Kitchen Birthday Cake",
    "description": "A detailed kitchen-themed cake celebrating a love for cooking, featuring a custom lady figurine.",
    "category": "Birthday",
    "fileName": "kitchen-cooking-lady-birthday-cake.webp"
  },
  {
    "title": "Relaxing 65th Birthday Cake",
    "description": "A humorous 65th birthday cake featuring a relaxing man in a recliner, perfect for a cozy celebration.",
    "category": "Birthday",
    "fileName": "lazy-retirement-65th-birthday-cake.webp"
  },
  {
    "title": "Romantic Red Roses Cake",
    "description": "Express your love with this elegant white cake topped with fresh red roses and a \"LOVE\" topper.",
    "category": "Anniversary",
    "fileName": "romantic-red-roses-love-anniversary-cake.webp"
  },
  {
    "title": "Chocolate Heart Gift Box Cake",
    "description": "A beautiful heart-shaped chocolate cake presented in a charming gift box with straw and festive decorations.",
    "category": "Birthday",
    "fileName": "heart-shaped-chocolate-gift-box-cake.webp"
  },
  {
    "title": "Film Strip Memories Cake",
    "description": "A sentimental 21st-anniversary cake featuring a photographic film strip design.",
    "category": "Anniversary",
    "fileName": "21st-anniversary-photo-film-strip-cake.webp"
  },
  {
    "title": "Pink Butterfly Anniversary Delight",
    "description": "Elegant pink butterflies flutter across this charming 42nd-anniversary creation.",
    "category": "Anniversary",
    "fileName": "42nd-anniversary-pink-butterfly-cake.webp"
  },
  {
    "title": "Golden Jubilee Butterfly Cake",
    "description": "Celebrate a 50th milestone with graceful butterflies and shimmering accents.",
    "category": "Anniversary",
    "fileName": "50th-anniversary-butterfly-cake.webp"
  },
  {
    "title": "Baby's First Bottle Cake",
    "description": "An adorable baby bottle-themed cake, perfect for a little one's 1st birthday.",
    "category": "Birthday",
    "fileName": "baby-bottle-1st-birthday-cake.webp"
  },
  {
    "title": "Blue & Purple Rosette Dream",
    "description": "Vibrant blue and purple buttercream rosettes cover this stunning birthday treat.",
    "category": "Birthday",
    "fileName": "blue-purple-rosette-birthday-girl-cake.webp"
  },
  {
    "title": "Blueberry Compote Round Cake",
    "description": "A classic round cake topped with a luscious, homemade blueberry compote.",
    "category": "Specialty",
    "fileName": "blueberry-compote-round-cake.webp"
  },
  {
    "title": "Holi Chocolate Overload",
    "description": "Celebrate the festival of colors with this chocolatey burst of joy.",
    "category": "Festive",
    "fileName": "chocolate-overload-happy-holi-cake.webp"
  },
  {
    "title": "Little Lion King Cake",
    "description": "Roar into the party with this cute and courageous lion-faced birthday cake.",
    "category": "Birthday",
    "fileName": "cute-lion-face-kids-cake.webp"
  },
  {
    "title": "Red & Silver Ornament Cake",
    "description": "Celebrate your anniversary with this stunning red and silver accented design.",
    "category": "Anniversary",
    "fileName": "elegant-red-silver-ornament-anniversary-cake.webp"
  },
  {
    "title": "Triple Floral Photo Display",
    "description": "A grand three-cake setup featuring beautiful flowers and personalized photos.",
    "category": "Specialty",
    "fileName": "floral-tri-cake-setup-with-photos.webp"
  },
  {
    "title": "Classic Heart Chocolate",
    "description": "The perfect chocolate heart for a sweet and simple birthday celebration.",
    "category": "Birthday",
    "fileName": "heart-shaped-chocolate-birthday-cake.webp"
  },
  {
    "title": "Dapper Dad's Shirt Cake",
    "description": "A stylish shirt-and-tie cake, perfect for celebrating the best dad.",
    "category": "Specialty",
    "fileName": "papas-shirt-and-tie-cake.webp"
  },
  {
    "title": "Glamour & Glitz Makeup Cake",
    "description": "A fabulous cake for the fashionista who loves all things beauty.",
    "category": "Birthday",
    "fileName": "pink-makeup-theme-birthday-cake.webp"
  },
  {
    "title": "Pastel Butterfly Garden",
    "description": "A whimsical blend of pink and purple flowers with fluttering butterflies.",
    "category": "Birthday",
    "fileName": "pink-purple-floral-butterfly-cake.webp"
  },
  {
    "title": "Pizza Party Illusion Cake",
    "description": "It looks like a pizza, but it tastes like a sweet, delicious dream!",
    "category": "Specialty",
    "fileName": "pizza-slice-illusion-cake.webp"
  },
  {
    "title": "Premium Chocolate Swirl",
    "description": "An indulgent chocolate cake with artistic swirls of premium frosting.",
    "category": "Specialty",
    "fileName": "premium-chocolate-swirl-cake.webp"
  },
  {
    "title": "Petite Crimson Hearts",
    "description": "A cute and compact mini cake adorned with bold black hearts.",
    "category": "Specialty",
    "fileName": "red-mini-cake-black-hearts.webp"
  },
  {
    "title": "Scarlet Mirror Glaze Heart",
    "description": "A sleek and shiny mirror-glazed heart cake that speaks of true love.",
    "category": "Anniversary",
    "fileName": "red-mirror-glaze-heart-cake.webp"
  },
  {
    "title": "Romantic Red Velvet Heart",
    "description": "The classic red velvet cake in a beautiful heart shape for your love.",
    "category": "Anniversary",
    "fileName": "red-velvet-heart-cake.webp"
  },
  {
    "title": "Sweet Bunting Love Cake",
    "description": "Express your feelings with this charming 'Love You' bunting cake.",
    "category": "Anniversary",
    "fileName": "romantic-love-you-bunting-cake.webp"
  },
  {
    "title": "Valentine's Rose Pot Delight",
    "description": "A unique cake shaped like a flower pot, overflowing with red roses.",
    "category": "Festive",
    "fileName": "valentines-day-rose-pot-cake.webp"
  },
  {
    "title": "Pristine Swirl Rose Anniversary",
    "description": "Celebrate another year together with this classic white rose cake.",
    "category": "Anniversary",
    "fileName": "white-swirl-rose-anniversary-cake.webp"
  },
  {
    "title": "World's Best Sister Cake",
    "description": "Show your sister some love with this specially designed tribute cake.",
    "category": "Specialty",
    "fileName": "worlds-best-sister-cake.webp"
  },
  {
    "title": "Classic Oreo Chocolate Bowl",
    "description": "Indulge in a rich chocolate base topped with creamy frosting, a whole Oreo cookie, and elegant silver pearls.",
    "category": "Cake Bowls",
    "fileName": "classic-oreo-chocolate-cake-bowl.webp"
  },
  {
    "title": "Strawberry Dream Bowl",
    "description": "A delightful pink-frosted treat featuring light, airy sponge and shimmering silver pearls for a touch of magic.",
    "category": "Cake Bowls",
    "fileName": "strawberry-dream-pink-cake-bowl.webp"
  },
  {
    "title": "Oreo Swirl & Chips Bowl",
    "description": "A playful mix of pink and chocolate frosting swirls, chocolate chips, and Oreo cookies for the ultimate crunch.",
    "category": "Cake Bowls",
    "fileName": "oreo-swirl-chocolate-chip-cake-bowl.webp"
  },
  {
    "title": "Romantic Red Velvet Bowl",
    "description": "Velvety red sponge layered with smooth cream frosting and adorable red heart-shaped sprinkles.",
    "category": "Cake Bowls",
    "fileName": "romantic-red-velvet-heart-cake-bowl.webp"
  },
  {
    "title": "Velvety Red Velvet Bowl",
    "description": "Celebrate love with this beautifully layered red velvet bowl topped with creamy swirls and golden accents.",
    "category": "Cake Bowls",
    "fileName": "velvety-red-velvet-cream-cake-bowl.webp"
  },
  {
    "title": "Fresh Fruit Rainbow Bowl",
    "description": "A refreshing blend of juicy grapes, pomegranate seeds, and vibrant sprinkles over a light cream base.",
    "category": "Cake Bowls",
    "fileName": "fresh-fruit-rainbow-cake-bowl.webp"
  },
  {
    "title": "Mango Bliss Gold Bowl",
    "description": "A sunny tropical delight featuring a bright mango glaze, golden pearls, and festive rainbow sprinkles.",
    "category": "Cake Bowls",
    "fileName": "pineapple-mango-gold-pearl-cake-bowl.webp"
  }
];

    const imageToCakeTitle = {
  "elegant-grey-rosette-birthday-cake.webp": "Elegant Grey Rosette Cake",
  "red-velvet-swirl-cake-bowl.webp": "Red Velvet Swirl Bowl",
  "astronaut-space-rocket-birthday-cake.webp": "Astronaut Space Adventure Cake",
  "kitchen-cooking-lady-birthday-cake.webp": "Chef's Kitchen Birthday Cake",
  "lazy-retirement-65th-birthday-cake.webp": "Relaxing 65th Birthday Cake",
  "romantic-red-roses-love-anniversary-cake.webp": "Romantic Red Roses Cake",
  "heart-shaped-chocolate-gift-box-cake.webp": "Chocolate Heart Gift Box Cake",
  "21st-anniversary-photo-film-strip-cake.webp": "Film Strip Memories Cake",
  "42nd-anniversary-pink-butterfly-cake.webp": "Pink Butterfly Anniversary Delight",
  "50th-anniversary-butterfly-cake.webp": "Golden Jubilee Butterfly Cake",
  "baby-bottle-1st-birthday-cake.webp": "Baby's First Bottle Cake",
  "blue-purple-rosette-birthday-girl-cake.webp": "Blue & Purple Rosette Dream",
  "blueberry-compote-round-cake.webp": "Blueberry Compote Round Cake",
  "chocolate-overload-happy-holi-cake.webp": "Holi Chocolate Overload",
  "cute-lion-face-kids-cake.webp": "Little Lion King Cake",
  "elegant-red-silver-ornament-anniversary-cake.webp": "Red & Silver Ornament Cake",
  "floral-tri-cake-setup-with-photos.webp": "Triple Floral Photo Display",
  "heart-shaped-chocolate-birthday-cake.webp": "Classic Heart Chocolate",
  "papas-shirt-and-tie-cake.webp": "Dapper Dad's Shirt Cake",
  "pink-makeup-theme-birthday-cake.webp": "Glamour & Glitz Makeup Cake",
  "pink-purple-floral-butterfly-cake.webp": "Pastel Butterfly Garden",
  "pizza-slice-illusion-cake.webp": "Pizza Party Illusion Cake",
  "premium-chocolate-swirl-cake.webp": "Premium Chocolate Swirl",
  "red-mini-cake-black-hearts.webp": "Petite Crimson Hearts",
  "red-mirror-glaze-heart-cake.webp": "Scarlet Mirror Glaze Heart",
  "red-velvet-heart-cake.webp": "Romantic Red Velvet Heart",
  "romantic-love-you-bunting-cake.webp": "Sweet Bunting Love Cake",
  "valentines-day-rose-pot-cake.webp": "Valentine's Rose Pot Delight",
  "white-swirl-rose-anniversary-cake.webp": "Pristine Swirl Rose Anniversary",
  "worlds-best-sister-cake.webp": "World's Best Sister Cake",
  "classic-oreo-chocolate-cake-bowl.webp": "Classic Oreo Chocolate Bowl",
  "strawberry-dream-pink-cake-bowl.webp": "Strawberry Dream Bowl",
  "oreo-swirl-chocolate-chip-cake-bowl.webp": "Oreo Swirl & Chips Bowl",
  "romantic-red-velvet-heart-cake-bowl.webp": "Romantic Red Velvet Bowl",
  "velvety-red-velvet-cream-cake-bowl.webp": "Velvety Red Velvet Bowl",
  "fresh-fruit-rainbow-cake-bowl.webp": "Fresh Fruit Rainbow Bowl",
  "pineapple-mango-gold-pearl-cake-bowl.webp": "Mango Bliss Gold Bowl"
};

    const cakeCatalogByTitle = Object.fromEntries(
        cakeCatalog.map((entry) => [entry.title, entry])
    );

    const cakeNotesByImage = Object.fromEntries(
        Object.entries(imageToCakeTitle)
            .map(([fileName, title]) => [fileName, cakeCatalogByTitle[title]])
            .filter(([, note]) => Boolean(note))
    );

    const galleryContainer = document.getElementById('gallery-container');
    const modal = document.getElementById('postcard-modal');
    const closeModalBtn = document.getElementById('modal-close');
    const postcardImage = document.getElementById('postcard-image');
    const postcardTitle = document.getElementById('postcard-title');
    const postcardDescription = document.getElementById('postcard-description');
    const postcardCategory = document.getElementById('postcard-category');
    const postcardFile = document.getElementById('postcard-file');

    const getCakeNote = (imageName) => {
        const note = cakeNotesByImage[imageName];

        if (note) {
            return note;
        }

        return {
            title: 'Signature Bakery Delight',
            description: 'Freshly handcrafted at Pallav\'s Kitchen with premium ingredients and thoughtful finishing details.',
            category: 'House Special'
        };
    };

    const openPostcard = ({ src, title, description, category, alt, fileName }) => {
        postcardImage.src = src;
        postcardImage.alt = alt;
        postcardTitle.textContent = title;
        postcardDescription.textContent = description;
        postcardCategory.textContent = category;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closePostcard = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const renderGallery = (categoryFilter = 'all') => {
        galleryContainer.innerHTML = '';
        
        images.forEach((imgSrc) => {
            const note = getCakeNote(imgSrc);
            
            if (categoryFilter !== 'all' && note.category !== categoryFilter) {
                return;
            }

            const item = document.createElement('div');
            item.className = 'gallery-item reveal active'; // Add active to show immediately when filtered
            item.tabIndex = 0;
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Open details for ${note.title}`);
            
            const img = document.createElement('img');
            img.loading = 'lazy';
            img.src = `images/${encodeURIComponent(imgSrc)}`;
            img.alt = note.title;

            item.addEventListener('click', () => {
                openPostcard({
                    src: img.src,
                    alt: note.title,
                    title: note.title,
                    description: note.description,
                    category: note.category,
                    fileName: imgSrc
                });
            });

            item.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openPostcard({
                        src: img.src,
                        alt: note.title,
                        title: note.title,
                        description: note.description,
                        category: note.category,
                        fileName: imgSrc
                    });
                }
            });

            item.appendChild(img);
            galleryContainer.appendChild(item);
        });
    };

    // Filter event listeners
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.dataset.category);
        });
    });

    // Populate initial gallery
    renderGallery();

    closeModalBtn.addEventListener('click', closePostcard);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closePostcard();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
            closePostcard();
        }
    });

    // 4. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial trigger for hero section items
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach((el) => {
            if (el.classList.contains('hero-content')) {
                el.classList.add('active');
            } else {
                revealOnScroll.observe(el);
            }
        });
    }, 100);

});
