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

        const pizzaPrice = document.createElement('div');
        pizzaPrice.className = 'w-[90.47px] left-[14.08px] top-[108px] absolute text-center';
        pizzaElement.appendChild(pizzaPrice);

        const pizzaFlavor = document.createElement('div');
        pizzaFlavor.className = 'w-[134.81px] left-[22.13px] top-[15px] absolute text-orange-600 text-xl font-semibold fontText';
        pizzaFlavor.textContent = pizzaData.sabor;
        pizzaElement.appendChild(pizzaFlavor);

        const pizzaIngredients = document.createElement('div');
        pizzaIngredients.className = 'w-[134.81px] left-[22.13px] top-[47px] absolute text-zinc-600 text-[7px] font-bold fontText';
        pizzaIngredients.textContent = pizzaData.ingrediente;
        pizzaElement.appendChild(pizzaIngredients);

        sectionPizza.appendChild(pizzaElement);

        pizzaElement.addEventListener('click', () => {
            window.location.href = `../pagesProdutos/detalhesPizza.html?pizzaid=${pizzaId}`;
        });
    });
}renderPizza();


async function renderHamburguer() {
    const sectionHamburguer = document.getElementById('sectionHamburguer');
    const hamburguersRef = db.collection('Hamburguer');

    const querySnapshot = await hamburguersRef.get();
    querySnapshot.forEach((doc)=>{
        hamburguerData = doc.data();
        hamburguerId = doc.id;

        const hamburguerElement = document.createElement('div');
        hamburguerElement.className = 'w-[155px] h-[222px] relative bg-white shadow rounded-xl mx-7';

        const hamburguerImage = document.createElement('img');
        hamburguerImage.className = 'w-[134.80px] h-[116.21px] left-[10px] top-[20px] absolute'
        hamburguerImage.src = hamburguerData.pathPhoto;
        hamburguerElement.appendChild(hamburguerImage);

        const hamburguerName = document.createElement('p');
        hamburguerName.className = 'h-[15px] top-[140px] relative mx-auto text-center text-xl font-semibold fontText';
        hamburguerName.textContent = hamburguerData.nome;
        hamburguerElement.appendChild(hamburguerName);

        const hamburguerPriceDiv = document.createElement('div');
        hamburguerPriceDiv.className = 'left-[16px] top-[178px] absolute text-center ';
        const hamburguerPrice = document.createElement('p');
        hamburguerPrice.className ='text-amber-400 text-xl font-semibold fontText';
        hamburguerPrice.textContent = `R$ ${hamburguerData.preco}`;

        hamburguerPriceDiv.appendChild(hamburguerPrice);
        hamburguerElement.appendChild(hamburguerPriceDiv);

        const iconAddFirstDiv = document.createElement('div');
        iconAddFirstDiv.className = 'w-[25px] h-[25px] left-[118px] top-[185px] absolute';
        const iconAddSecondDiv = document.createElement('div');
        iconAddSecondDiv.className = 'w-[25px] h-[25px] left-0 top-0 absolute'
        const iconAdd = document.createElement('img');
        iconAdd.src = '../iconsFood/add_roudond.svg';

        iconAddSecondDiv.appendChild(iconAdd);
        iconAddFirstDiv.appendChild(iconAddSecondDiv);
        hamburguerElement.appendChild(iconAddFirstDiv);

        sectionHamburguer.appendChild(hamburguerElement);

        hamburguerElement.addEventListener('click', () => {
            window.location.href = `../pagesProdutos/detalhesHamburguer.html?hamburguerid=${hamburguerId}`;
        });
    });
}

renderHamburguer();

async function renderDoces() {
    const sectionDoces = document.getElementById('sectionDoces');
    const docesRef = db.collection('Doces');

    const querySnapshot = await docesRef.get();
    querySnapshot.forEach((doc) => {
        docesData = doc.data();
        docesId = doc.id;

        const docesElement = document.createElement('div');
        docesElement.className = 'w-[155px] h-[222px] relative bg-white shadow rounded-xl mx-7';

        const docesImage = document.createElement('img');
        docesImage.className = 'w-[149.81px] h-[100px] top-[20px] absolute'
        docesImage.src = docesData.pathPhoto;
        docesElement.appendChild(docesImage);

        const docesName = document.createElement('p');
        docesName.className = 'w-[137px] h-[15px] mx-auto top-[140px] relative text-center text-xl font-semibold fontText';
        docesName.textContent = docesData.nome;
        docesElement.appendChild(docesName);

        const docePriceDiv = document.createElement('div');
        docePriceDiv.className = 'left-[16px] top-[178px] absolute text-center ';
        const docePrice = document.createElement('p');
        docePrice.className = 'text-amber-400 text-xl font-semibold fontText';
        docePrice.textContent = `R$ ${docesData.preco}`;

        docePriceDiv.appendChild(docePrice);
        docesElement.appendChild(docePriceDiv);

        const iconAddFirstDiv = document.createElement('div');
        iconAddFirstDiv.className = 'w-[25px] h-[25px] left-[118px] top-[185px] absolute';
        const iconAddSecondDiv = document.createElement('div');
        iconAddSecondDiv.className = 'w-[25px] h-[25px] left-0 top-0 absolute'
        const iconAdd = document.createElement('img');
        iconAdd.src = '../iconsFood/add_roudond.svg';

        iconAddSecondDiv.appendChild(iconAdd);
        iconAddFirstDiv.appendChild(iconAddSecondDiv);
        docesElement.appendChild(iconAddFirstDiv);

        sectionDoces.appendChild(docesElement);

        docesElement.addEventListener('click', ()=>{
            window.location.href = `../pagesProdutos/detalhesDoces.html?docesid=${docesId}`;
        })
    })
} renderDoces();