const firebaseConfig = {
    apiKey: "AIzaSyAAMYwMahCex-tSp-g7eEW5uENub_EmvMU",
    authDomain: "ifmaisempreendedorangica-4cab5.firebaseapp.com",
    projectId: "ifmaisempreendedorangica-4cab5",
    storageBucket: "ifmaisempreendedorangica-4cab5.appspot.com",
    messagingSenderId: "971295144283",
    appId: "1:971295144283:web:35965497f0a0fe43b6427e"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function renderizarFavoritos(favoritos) {
    const sectionPizzaFavorita = document.getElementById('pizzaFavorita')

    favoritos.forEach((pizzaId) => {
        const pizzaRef = db.collection('Pizza').doc(pizzaId)

        pizzaRef.get().then((doc) => {
            if (doc.exists) {
                const pizzaData = doc.data()
                const pizzaId = doc.id

                const cardFavoritoPizza = document.createElement('div')
                cardFavoritoPizza.className = 'w-[156px] h-[222px] relative mt-5'
                cardFavoritoPizza.id = 'cardFavoritoPizza'

                cardFavoritoPizza.innerHTML = `
                <div class="w-[156px] h-[222px] left-0 top-0 absolute bg-white rounded-[15px] shadow">
                    <div
                        class="px-3 w-[156px] top-[10px] absolute text-orange-600 text-xl font-semibold fontText tracking-wider flex justify-between">
                        ${pizzaData.sabor}

                        <svg width="30" height="28" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg" id="favorito">
                        <g filter="url(#filter0_d_873_1822)">
                            <path
                                d="M37.875 14.4844C37.875 23.7812 24.0904 31.3064 23.5034 31.6172C23.3486 31.7004 23.1757 31.744 23 31.744C22.8243 31.744 22.6514 31.7004 22.4966 31.6172C21.9096 31.3064 8.125 23.7812 8.125 14.4844C8.12746 12.3012 8.9958 10.2082 10.5395 8.66451C12.0832 7.1208 14.1762 6.25246 16.3594 6.25C19.102 6.25 21.5032 7.42937 23 9.42289C24.4968 7.42937 26.898 6.25 29.6406 6.25C31.8238 6.25246 33.9168 7.1208 35.4605 8.66451C37.0042 10.2082 37.8725 12.3012 37.875 14.4844Z"
                                fill="red" />
                        </g>
                        <defs>
                            <filter id="filter0_d_873_1822" x="0.125" y="0.25" width="45.75" height="41.4939" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha" />
                                <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_873_1822" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="3" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_873_1822" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_873_1822" result="shape" />
                            </filter>
                        </defs>
                        </svg>
                    
                    </div>
                    <img class="w-[156px] h-[111px] left-0 top-[111px] absolute rounded-[15px]" src="https://via.placeholder.com/156x111" />
                    <div class="w-[132px] h-[50px] left-[12px] top-[47px] absolute text-zinc-600 text-[8px] font-bold fontText overflow-hidden line-clamp-4">
                    ${pizzaData.ingrediente}
                    </div>
                    </div>
                `;

                cardFavoritoPizza.addEventListener('click', () => {
                    window.location.href = `../pagesProdutos/detalhesPizza.html?pizzaid=${pizzaId}`
                })

                sectionPizzaFavorita.appendChild(cardFavoritoPizza);
            }
        })
    });
}

auth.onAuthStateChanged(function (user) {
    if (user) {
        const userId = user.uid;
        const favoritoRef = db.collection('Favoritos').doc(userId)

        favoritoRef.get().then((doc) => {
            if (doc.exists) {
                const favoritosData = doc.data()
                const favoritos = favoritosData.lanches

                renderizarFavoritos(favoritos);
            }
        })


    }
})

