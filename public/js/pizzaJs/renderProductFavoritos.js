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

auth.onAuthStateChanged(async function (user) {
    if (user) {
        const userId = user.uid;
        const favoritoRef = db.collection('Favoritos').doc(userId)

        try {
            const doc = await favoritoRef.get();
            if (doc.exists) {
                const favoritosData = doc.data()
                const favoritos = favoritosData.lanches

                renderizarFavoritos(favoritos);
            }
        } catch (error) {
            console.error(error);
        }
    }
});

function renderizarFavoritos(favoritos) {
    const sectionPizzaFavorita = document.getElementById('pizzaFavorita')

    favoritos.forEach(async (pizzaId) => {
        const pizzaRef = db.collection('Pizza').doc(pizzaId)

        try {
            const doc = await pizzaRef.get();
            if (doc.exists) {
                const pizzaData = doc.data()
                const pizzaId = doc.id
                //refazer o card de favoritos para a Pizza
                

                cardFavoritoPizza.addEventListener('click', () => {
                    window.location.href = `../pagesProdutos/pizza/detalhesPizza.html?lancheId=${pizzaId}`
                })

                sectionPizzaFavorita.appendChild(cardFavoritoPizza);
            }
        } catch (error) {
            console.error(error);
        }
    });
}

