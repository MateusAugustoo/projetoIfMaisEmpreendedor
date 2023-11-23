const firebaseConfig = {
    apiKey: "AIzaSyAAMYwMahCex-tSp-g7eEW5uENub_EmvMU",
    authDomain: "ifmaisempreendedorangica-4cab5.firebaseapp.com",
    projectId: "ifmaisempreendedorangica-4cab5",
    storageBucket: "ifmaisempreendedorangica-4cab5.appspot.com",
    messagingSenderId: "971295144283",
    appId: "1:971295144283:web:35965497f0a0fe43b6427e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function renderPizza() {
    const sectionPizza = document.getElementById('sectionPizza');
    const pizzasRef = db.collection('Pizza');

    const querySnapshot = await pizzasRef.get();
    querySnapshot.forEach((doc) => {
        const pizzaData = doc.data();
        const pizzaId = doc.id;

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
        pizzaImg.src = pizzaData.imgPath;

        pizzaCircle.appendChild(pizzaImg);

        const pizzaPrice = document.createElement('div');
        pizzaPrice.className = 'w-[90.47px] left-[14.08px] top-[108px] absolute text-center';
        pizzaElement.appendChild(pizzaPrice);

        const pizzaFlavor = document.createElement('div');
        pizzaFlavor.className = 'w-auto left-[22.13px] top-[15px] absolute text-orange-600 text-xl font-semibold fontText';
        pizzaFlavor.textContent = pizzaData.nome;
        pizzaElement.appendChild(pizzaFlavor);

        const pizzaIngredients = document.createElement('div');
        pizzaIngredients.className = 'w-[134.81px] left-[22.13px] top-[47px] absolute text-zinc-600 text-[8px] font-bold fontText';
        pizzaIngredients.textContent = pizzaData.ingredientes;
        pizzaElement.appendChild(pizzaIngredients);

        sectionPizza.appendChild(pizzaElement);

        pizzaElement.addEventListener('click', () => {
            const collectionName = 'Pizza';
            window.location.href = `../pagesProdutos/pizza/detalhesPizza.html?collectionName=${collectionName}&lancheId=${pizzaId}`;
        });
    });
}renderPizza();