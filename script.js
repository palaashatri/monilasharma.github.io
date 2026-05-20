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

    // 2. Generate floating 3D bakery items in the background
    const bgContainer = document.getElementById('animated-bg');
    const floatingAssets = [
        'images/3d_strawberry_cake.png',
        'images/3d_chocolate_cookie.png',
        'images/3d_pastel_cupcake.png',
        'images/3d_golden_croissant.png'
    ];
    const anims = ['float-slow-1', 'float-slow-2', 'float-slow-3'];

    for (let i = 0; i < 12; i++) {
        const item = document.createElement('img');
        item.className = 'floating-item';
        item.src = floatingAssets[i % floatingAssets.length];
        item.alt = 'Bakery illustration decoration';

        item.style.setProperty('--x', `${Math.random() * 100}%`);
        item.style.setProperty('--y', `${Math.random() * 100}%`);
        item.style.setProperty('--size', `${50 + Math.random() * 80}px`);

        const randomAnim = anims[Math.floor(Math.random() * anims.length)];
        item.style.animation = `${randomAnim} ${15 + Math.random() * 20}s ease-in-out infinite`;
        item.style.animationDelay = `-${Math.random() * 20}s`;

        bgContainer.appendChild(item);
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
            
            // Random slight rotation for Polaroid effect
            const randomRotation = (Math.random() * 6 - 3).toFixed(1);
            item.style.setProperty('--rotation', `${randomRotation}deg`);
            
            const imgWrap = document.createElement('div');
            imgWrap.className = 'polaroid-img-wrap';

            const img = document.createElement('img');
            img.loading = 'lazy';
            img.src = `images/${encodeURIComponent(imgSrc)}`;
            img.alt = note.title;

            imgWrap.appendChild(img);
            item.appendChild(imgWrap);

            const caption = document.createElement('div');
            caption.className = 'polaroid-caption';

            const title = document.createElement('span');
            title.className = 'polaroid-title';
            title.textContent = note.title;

            const tag = document.createElement('span');
            tag.className = 'polaroid-tag';
            tag.textContent = note.category;

            caption.appendChild(title);
            caption.appendChild(tag);
            item.appendChild(caption);

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

    // 5. Interactive 3D Shaded Chocolate Cake in Hero (Three.js)
    const initWireframeCake = () => {
        const canvas = document.getElementById('wireframe-cake');
        if (!canvas || typeof THREE === 'undefined') return;

        const container = canvas.parentElement;
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.set(0, 1.3, 4.5);
        camera.lookAt(0, 0.2, 0);

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Add soft lighting to shade the 3D surfaces
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 0.75);
        mainLight.position.set(3, 5, 4);
        scene.add(mainLight);

        // Soft brand coral rim light for delicious warm glow
        const rimLight = new THREE.DirectionalLight(0xfa6e6d, 0.35);
        rimLight.position.set(-3, 2, -3);
        scene.add(rimLight);

        // Brand color utility from CSS variables
        const getBrandColors = () => {
            const style = getComputedStyle(document.documentElement);
            const blueStr = style.getPropertyValue('--brand-blue').trim() || '#0e4693';
            const coralStr = style.getPropertyValue('--brand-coral').trim() || '#fa6e6d';
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            return {
                blue: new THREE.Color(blueStr),
                coral: new THREE.Color(coralStr),
                plate: new THREE.Color(isDark ? '#0c2d5f' : '#f5edd8')
            };
        };

        const currentColors = getBrandColors();

        // 3D Shaded Materials (Phong Material for specular reflections)
        const chocolateMaterial = new THREE.MeshPhongMaterial({
            color: 0x482816, // Rich chocolate sponge
            specular: 0x1a0f0a,
            shininess: 6,
            flatShading: true
        });

        const creamMaterial = new THREE.MeshPhongMaterial({
            color: 0xffdbdb, // Soft vanilla-strawberry cream layer
            specular: 0x221111,
            shininess: 12
        });

        const frostingMaterial = new THREE.MeshPhongMaterial({
            color: currentColors.coral, // Brand coral dripping frosting
            specular: 0x664444,
            shininess: 85
        });

        const plateMaterial = new THREE.MeshPhongMaterial({
            color: currentColors.plate, // Ceramic light cream or brand blue
            specular: 0x888888,
            shininess: 100
        });

        const cherryMaterial = new THREE.MeshPhongMaterial({
            color: 0xd62828, // Deep red glossy cherry
            specular: 0xbbbbbb,
            shininess: 120
        });

        const stemMaterial = new THREE.MeshPhongMaterial({
            color: 0x4d372c,
            specular: 0x050505,
            shininess: 2
        });

        const particleMaterial = new THREE.PointsMaterial({
            color: currentColors.coral,
            size: 0.04,
            transparent: true,
            opacity: 0.7
        });

        // Dynamic updates on theme changes
        const themeObserver = new MutationObserver(() => {
            const updated = getBrandColors();
            frostingMaterial.color.copy(updated.coral);
            plateMaterial.color.copy(updated.plate);
            particleMaterial.color.copy(updated.coral);
        });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        // Cake Assembly Group
        const cakeGroup = new THREE.Group();

        // 1. Ceramic Plate (Full cylinder)
        const plateGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.08, 32);
        const plate = new THREE.Mesh(plateGeo, plateMaterial);
        plate.position.y = -0.4;
        cakeGroup.add(plate);

        // Helper to draw a circle sector shape for the main cake and the slice
        const getCakeShape = (radius, startAngle, endAngle) => {
            const shape = new THREE.Shape();
            shape.moveTo(0, 0);
            shape.absarc(0, 0, radius, startAngle, endAngle, false);
            shape.lineTo(0, 0);
            return shape;
        };

        // Helper to create a whole cake tier (perfectly aligned cylinders)
        const createWholeTier = (radius, height, yOffset) => {
            const tierGroup = new THREE.Group();

            const spongeHeight = height * 0.9;
            const frostingHeight = height * 0.1;

            // 1. Sponge Base Cylinder
            const spongeGeo = new THREE.CylinderGeometry(radius, radius, spongeHeight, 48);
            spongeGeo.translate(0, spongeHeight / 2, 0); // Bottom is at y = 0
            const spongeMesh = new THREE.Mesh(spongeGeo, chocolateMaterial);
            spongeMesh.position.y = 0;
            tierGroup.add(spongeMesh);

            // 2. Cream Frosting Top Glaze Cylinder
            const frostingGeo = new THREE.CylinderGeometry(radius, radius, frostingHeight, 48);
            frostingGeo.translate(0, frostingHeight / 2, 0); // Bottom is at y = 0
            const frostingMesh = new THREE.Mesh(frostingGeo, frostingMaterial);
            frostingMesh.position.y = spongeHeight;
            tierGroup.add(frostingMesh);

            // Add cream dollops in a perfect circle along the top rim
            const dollopCount = 18;
            const dollopGeo = new THREE.SphereGeometry(0.045, 8, 8);
            const topY = spongeHeight + frostingHeight;
            for (let i = 0; i < dollopCount; i++) {
                const angle = (i / dollopCount) * Math.PI * 2;
                const dollop = new THREE.Mesh(dollopGeo, creamMaterial); // Vanilla cream dollops for contrast
                dollop.position.set(
                    Math.cos(angle) * (radius - 0.08),
                    topY + 0.02,
                    Math.sin(angle) * (radius - 0.08)
                );
                const s = 0.85 + Math.random() * 0.3;
                dollop.scale.set(s, s, s);
                tierGroup.add(dollop);
            }

            tierGroup.position.y = yOffset;
            return tierGroup;
        };

        // 2. Whole Cake Assembly (Single Tier Cylinder)
        const mainCake = createWholeTier(1.3, 0.75, -0.4);
        cakeGroup.add(mainCake);

        // 3. Glazed Cherry topping on center of the cake
        const cherryGroup = new THREE.Group();
        const cherryGeo = new THREE.SphereGeometry(0.14, 12, 12);
        const cherry = new THREE.Mesh(cherryGeo, cherryMaterial);
        cherry.position.set(0, 0.35 + 0.08, 0); // Sitting on top of the tier at center
        cherryGroup.add(cherry);

        // Curving cherry stem
        const stemCurve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(0, 0.35 + 0.22, 0),
            new THREE.Vector3(0.12, 0.6, 0),
            new THREE.Vector3(0.04, 0.7, -0.06)
        );
        const stemPoints = stemCurve.getPoints(8);
        const stemGeo = new THREE.BufferGeometry().setFromPoints(stemPoints);
        const stemMaterialLine = new THREE.LineBasicMaterial({ color: 0x4d372c, linewidth: 2 });
        const stem = new THREE.Line(stemGeo, stemMaterialLine);
        cherryGroup.add(stem);

        // Position cherry exactly at the center of the top surface
        cherryGroup.position.set(0, 0, 0);
        cakeGroup.add(cherryGroup);



        // 6. Floating Sugar Sparkles (Orbiting particle system)
        const particleCount = 50;
        const particlesGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.6 + Math.random() * 0.8;
            const y = -0.4 + Math.random() * 1.8;
            
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particles = new THREE.Points(particlesGeo, particleMaterial);
        cakeGroup.add(particles);

        scene.add(cakeGroup);

        // Interactive mouse-tilt tracking
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        window.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            // Smooth interpolation (lerping) for mouse follow
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            // Slow idle spin & tilt
            cakeGroup.rotation.y = time * 0.15;
            cakeGroup.position.y = Math.sin(time * 0.7) * 0.08;
            
            // Apply mouse tilt forces
            cakeGroup.rotation.x = Math.sin(time * 0.35) * 0.04 - targetY * 0.18;
            cakeGroup.rotation.z = Math.cos(time * 0.35) * 0.04 + targetX * 0.18;

            // Spin sparkles in opposite direction
            particles.rotation.y = -time * 0.08;

            renderer.render(scene, camera);
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    };
    initWireframeCake();

});
