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

function renderPizza() {
    const sectionPizza = document.getElementById('sectionPizza');
    const pizzasRef = db.collection('Pizza');

    pizzasRef.get().then((querySnapshot) => {
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
    });
}

renderPizza();


function renderHamburguer() {
    const sectionHamburguer = document.getElementById('sectionHamburguer');
    const hamburguersRef = db.collection('Hamburguer');

    hamburguersRef.get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            hamburguerData = doc.data();
            hamburguerId = doc.id;

            const hamburguerElement = document.createElement('div');
            hamburguerElement.className = 'w-[155px] h-[222px] relative bg-white shadow rounded-xl mx-7';

            const hamburguerImage = document.createElement('img');
            hamburguerImage.classList = 'w-[134.80px] h-[116.21px] left-[10px] top-[20px] absolute'
            hamburguerImage.src = hamburguerData.pathPhoto;
            hamburguerElement.appendChild(hamburguerImage);

            const hamburguerName = document.createElement('p');
            hamburguerName.className = 'w-[86px] h-[15px] left-[35px] top-[140px] absolute text-center text-xl font-semibold fontText';
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
        })
    })
}renderHamburguer();