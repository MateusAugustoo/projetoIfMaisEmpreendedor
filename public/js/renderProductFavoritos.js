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
    const sectionFavorita = document.getElementById('sectionFavoritos')

    favoritos.forEach(async (lancheId) => {
        const pizzaRef = db.collection('Pizza').doc(lancheId);

        try {
            const doc = await pizzaRef.get();
            if (doc.exists) {
                const lancheData = doc.data()
                const lancheId = doc.id
                //refazer o card de favoritos para a Pizza
                const pizzaElement = document.createElement('div');
                pizzaElement.className = 'w-[333px] h-[142px] relative mx-8 mt-5';

                const pizzaBackground = document.createElement('div');
                pizzaBackground.className = 'w-[333px] h-[142px] left-0 top-0 absolute bg-white rounded-[20px] shadow';
                pizzaElement.appendChild(pizzaBackground);

                const pizzaCircle = document.createElement('div');
                pizzaCircle.className = 'w-[142.86px] h-[142px] left-[190.14px] top-0 absolute bg-orange-600 rounded-[20px]';
                pizzaElement.appendChild(pizzaCircle);

                const pizzaImg = document.createElement('img');
                pizzaImg.className = 'flex justify-center items-center relative w-auto h-auto';
                pizzaImg.src = lancheData.imgPath;

                pizzaCircle.appendChild(pizzaImg);

                const pizzaPrice = document.createElement('div');
                pizzaPrice.className = 'w-[90.47px] left-[14.08px] top-[108px] absolute text-center';
                pizzaElement.appendChild(pizzaPrice);

                const pizzaFlavor = document.createElement('div');
                pizzaFlavor.className = 'w-auto left-[22.13px] top-[15px] absolute text-orange-600 text-xl font-semibold fontText';
                pizzaFlavor.textContent = lancheData.nome;
                pizzaElement.appendChild(pizzaFlavor);

                const pizzaIngredients = document.createElement('div');
                pizzaIngredients.className = 'w-[134.81px] left-[22.13px] top-[47px] absolute text-zinc-600 text-[8px] font-bold fontText';
                pizzaIngredients.textContent = lancheData.ingredientes;
                pizzaElement.appendChild(pizzaIngredients);

                pizzaElement.addEventListener('click', () => {
                    window.location.href = `../pagesProdutos/pizza/detalhesPizza.html?lancheId=${lancheId}`
                })

                sectionFavorita.appendChild(pizzaElement);
            }
        } catch (error) {
            console.error(error);
        }

        const hamburguerRef = db.collection('Hamburguer').doc(lancheId);

        try {
            const doc = await hamburguerRef.get();
            if (doc.exists) {
                const lancheData = doc.data()
                const lancheId = doc.id
                //card de favoritos para a Hamburguer
                const hamElement = document.createElement('div');
                hamElement.className = 'w-[333px] h-[142px] relative mx-8 mt-5';

                const hamBackground = document.createElement('div');
                hamBackground.className = 'w-[333px] h-[142px] left-0 top-0 absolute bg-white rounded-[20px] shadow';
                hamElement.appendChild(hamBackground);

                const hamCircle = document.createElement('div');
                hamCircle.className = 'w-[142.86px] h-[142px] left-[190.14px] top-0 absolute bg-orange-600 rounded-[20px]';

                const hamImg = document.createElement('img');
                hamImg.className = 'flex justify-center items-center relative w-[121.32px] h-[107px] mx-auto mt-5';
                hamImg.src = lancheData.imgPath;

                hamCircle.appendChild(hamImg);


                hamElement.appendChild(hamCircle);

                const hamPrice = document.createElement('div');
                hamPrice.className = 'w-[90.47px] left-[14.08px] top-[108px] absolute text-center';
                hamElement.appendChild(hamPrice);

                const hamFlavor = document.createElement('div');
                hamFlavor.className = 'w-auto left-[22.13px] top-[15px] absolute text-orange-600 text-xl font-semibold fontText';
                hamFlavor.textContent = lancheData.nome;
                hamElement.appendChild(hamFlavor);

                const hamIngredients = document.createElement('div');
                hamIngredients.className = 'w-[134.81px] left-[22.13px] top-[47px] absolute text-zinc-600 text-[8px] font-bold fontText';
                hamIngredients.textContent = lancheData.ingredientes;
                hamElement.appendChild(hamIngredients);


                sectionFavorita.appendChild(hamElement);
            }
        } catch (error) {

        }

    });
}

