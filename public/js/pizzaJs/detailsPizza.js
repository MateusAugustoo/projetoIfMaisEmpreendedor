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
const auth = firebase.auth();

function saboresAdicionaisPizza() {
    const listaSaboresAdd = document.getElementById('SaboresAdicionais');
    const pizzaRef = db.collection('Pizza');

    pizzaRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const pizzaData = doc.data();
            const pizzaAdicionaisElement = document.createElement('div');

            const containerPizza = document.createElement('div');
            containerPizza.className = 'w-40 h-40 bg-white rounded-2xl shadow';

            const pizzaName = document.createElement('div');
            pizzaName.className = 'w-[114px] text-lg font-semibold fontText leading-snug tracking-widest ml-4 pt-2';
            pizzaName.textContent = pizzaData.sabor;
            containerPizza.appendChild(pizzaName);

            const iconeAddSabor = document.createElement('button');
            iconeAddSabor.className = 'w-6 h-6 rounded-full bg-zinc-600 flex justify-center items-center relative left-32 bottom-10';
            iconeAddSabor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 23 23">
                <path stroke="#fff" stroke-linecap="round" stroke-width="4.075"
                    d="M2.686 11.5h17.696m-8.849 8.75V2.75" />
            </svg>`;
            containerPizza.appendChild(iconeAddSabor);

            const pizzaImg = document.createElement('img');
            pizzaImg.src = '../../images/pizza_img.png';
            pizzaImg.className = 'relative bottom-7';
            containerPizza.appendChild(pizzaImg);

            const btnMostrar = document.createElement('button');
            btnMostrar.id = 'btnMostrar';
            btnMostrar.className = 'w-24 h-6 relative bottom-16 left-14 rounded-xl bg-white text-orange-600 text-xs font-semibold';
            btnMostrar.textContent = 'Ingredientes';
            containerPizza.appendChild(btnMostrar);

            //cradBack
            const containerPizzaBack = document.createElement('div');
            containerPizzaBack.className = 'w-40 h-40 bg-zinc-600 rounded-2xl shadow relative flex flex-col px-2';
            containerPizzaBack.style.display = 'none';

            const pizzaHeaderBack = document.createElement('div');
            pizzaHeaderBack.className = 'flex justify-around pt-2';

            const pizzaNameBack = document.createElement('p');
            pizzaNameBack.className = 'text-white font-bold fontText';
            pizzaNameBack.textContent = 'Ingredientes';
            pizzaHeaderBack.appendChild(pizzaNameBack);
            pizzaHeaderBack.appendChild(iconeAddSabor.cloneNode(true));

            containerPizzaBack.appendChild(pizzaHeaderBack);

            const pizzaIngredientesBack = document.createElement('div');
            pizzaIngredientesBack.className = 'text-white font-semibold fontText w-32 text-[8px] flex';
            pizzaIngredientesBack.textContent = pizzaData.ingrediente;

            containerPizzaBack.appendChild(pizzaIngredientesBack);

            const containerBtnEscoder = document.createElement('div');
            containerBtnEscoder.className = 'absolute top-32 left-[91px]';
            const btnEscoder = document.createElement('button');
            btnEscoder.id = 'btnEscoder';
            btnEscoder.className = 'bg-white w-16 h-6 shadow rounded-[15px] font-bold';
            btnEscoder.textContent = 'Voltar';

            containerBtnEscoder.appendChild(btnEscoder);
            containerPizzaBack.appendChild(containerBtnEscoder);

            pizzaAdicionaisElement.appendChild(containerPizza);
            pizzaAdicionaisElement.appendChild(containerPizzaBack);

            listaSaboresAdd.appendChild(pizzaAdicionaisElement);

            btnMostrar.addEventListener('click', () => {
                containerPizza.style.transform = 'rotateY(180deg)';
                containerPizzaBack.style.transform = 'rotateY(0deg)';
                containerPizza.style.display = 'none';
                containerPizzaBack.style.display = 'block';
            });

            btnEscoder.addEventListener('click', () => {
                containerPizza.style.transform = 'rotateY(0deg)';
                containerPizzaBack.style.transform = 'rotateY(180deg)';
                containerPizza.style.display = 'block';
                containerPizzaBack.style.display = 'none';
            });
        });
    })
} saboresAdicionaisPizza();



const quantFatiasPizzaP = 4
const quantFatiasPizzaM = 6
const quantFatiasPizzaG = 8
const quantFatiasPizzaGG = 12

const quantSaborPizzaP = 1
const quantSaborPizzaM = 2, quantSaborPizzaG = 2
const quantSaborPizzaGG = 3


const precoPizzaRefDb = db.collection('PrecoPizzas')
const fromPizza = document.getElementById('formPizza')
let precoPizza = document.getElementById('precoLanche')
let quantidadeFatias = document.getElementById('quantidadeFatias')
let quantidadesSabor = document.getElementById('quantidadeSabor')
let quantidadePizza = document.getElementById('quantidadeLanche').textContent = 0;

async function precoAndFatias() {
    await precoPizzaRefDb.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const precoPizzaDb = doc.data()

            fromPizza.addEventListener('change', (res) => {
                const tamanhoPizza = res.target.id

                switch (tamanhoPizza) {
                    case 'tamanhoP':
                        precoPizza.innerHTML = precoPizzaDb.tamanhoP
                        quantidadeFatias.innerHTML = quantFatiasPizzaP
                        quantidadesSabor.innerHTML = `Somente ${quantSaborPizzaP} sabor`
                        break;
                    case 'tamanhoM':
                        precoPizza.innerHTML = precoPizzaDb.tamanhoM
                        quantidadeFatias.innerHTML = quantFatiasPizzaM
                        quantidadesSabor.innerHTML = `Max. ${quantSaborPizzaM} sabores`
                        break;
                    case 'tamanhoG':
                        precoPizza.innerHTML = precoPizzaDb.tamanhoG
                        quantidadeFatias.innerHTML = quantFatiasPizzaG
                        quantidadesSabor.innerHTML = `Max. ${quantSaborPizzaG} sabores`
                        break;
                    case 'tamanhoGG':
                        precoPizza.innerHTML = precoPizzaDb.tamanhoGG
                        quantidadeFatias.innerHTML = quantFatiasPizzaGG
                        quantidadesSabor.innerHTML = `Max. ${quantSaborPizzaGG} sabores`
                        break;
                    default:
                        break;
                }
            })
        })
    })
} precoAndFatias()

window.onload = function () {
    const params = new URLSearchParams(window.location.search)
    const lancheId = params.get('lancheId')

    const pizzaRef = db.collection('Pizza')

    pizzaRef.doc(lancheId).get().then((doc) => {
        if (doc.exists) {
            const lancheData = doc.data()

            const nomeDaPizza = document.getElementById('nomeDoLanche')
            nomeDaPizza.textContent = lancheData.sabor
        }
    })
}



function adicionarQuantidadePizza() {
    quantidadePizza += 1;
    document.getElementById('quantidadeLanche').innerHTML = quantidadePizza;
}

function renoverQuantidadePizza() {
    if (quantidadePizza > 0) {
        quantidadePizza -= 1;
        document.getElementById('quantidadeLanche').innerHTML = quantidadePizza;

    }
}

const arrowBackHome = document.getElementById('arrow-back-home')
arrowBackHome.addEventListener('click', () => {
    history.back();
})

fromPizza.addEventListener('submit', (e) => {
    e.preventDefault();
});