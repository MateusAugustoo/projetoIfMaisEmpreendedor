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
            const pizzaData = doc.data()
            const pizzaAdicionaisElement = document.createElement('div')

            console.log(pizzaData)

            pizzaAdicionaisElement.innerHTML = `
            <div class="w-40 h-40 bg-white rounded-2xl shadow" id="divComida">
            <div class="w-[114px] text-lg font-semibold fontText leading-snug tracking-widest ml-4 pt-2">
               Pizza ${pizzaData.sabor}
            </div>
            <div
                class="w-6 h-6 rounded-full bg-zinc-600 flex justify-center items-center relative left-32 bottom-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 23 23">
                    <path stroke="#fff" stroke-linecap="round" stroke-width="4.075"
                        d="M2.686 11.5h17.696m-8.849 8.75V2.75" />
                </svg>
            </div>
            <img src="../images/pizza_img.png" class="relative bottom-7">
            <button id="btnMostrar"
                class="w-24 h-6 relative bottom-16 left-14 rounded-xl bg-white text-orange-600 text-xs font-semibold"
                onclick="MostrarOuOcultarIngredientes()">
                Ingredientes
            </button>
            </div>
            `;

            listaSaboresAdd.appendChild(pizzaAdicionaisElement);
        })
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
let precoPizza = document.getElementById('precoPizza')
let quantidadeFatias = document.getElementById('quantidadeFatias')
let quantidadesSabor = document.getElementById('quantidadeSabor')
let quantidadePizza = document.getElementById('quantidadePizza').innerHTML = 0;

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
    const pizzaId = params.get('pizzaid')

    const pizzaRef = db.collection('Pizza')

    pizzaRef.doc(pizzaId).get().then((doc) => {
        if (doc.exists) {
            const pizzaData = doc.data()

            const nomeDaPizza = document.getElementById('nomeDaPizza')
            nomeDaPizza.textContent = pizzaData.sabor
        }
    })

    const favoritarButton = document.getElementById('favoritar')
    const pathElement = favoritarButton.querySelectorAll('path')

    auth.onAuthStateChanged((user) => {
        if (user) {
            favoritarButton.addEventListener('click', () => {
                const userId = user.uid
                adicionarLancheAoFavorito(userId, pizzaId)

                pathElement.forEach(pathElement => {
                    pathElement.setAttribute('fill', 'red')
                })
            })
        }
    })
}

function adicionarLancheAoFavorito(userId, pizzaId) {
    const favoritosRef = db.collection('Favoritos');

    favoritosRef.doc(userId).get().then((doc) => {
        if (doc.exists) {
            const favoritosData = doc.data();

            if (!favoritosData.lanches.includes(pizzaId)) {
                favoritosData.lanches.push(pizzaId);
            }

            favoritosRef.doc(userId).update({
                lanches: favoritosData.lanches
            })
        }
        else {
            const novosFavoritos = {
                lanches: [pizzaId]
            };

            favoritosRef.doc(userId).set(novosFavoritos)
        }
        alert('Lanche adicionado aos favoritos!');
    }).catch((erro) => {
        alert('Erro ao adicionar lanche aos favoritos!' + erro);
    })
}

function adicionarQuantidadePizza() {
    quantidadePizza += 1;
    document.getElementById('quantidadePizza').innerHTML = quantidadePizza;
    localStorage.setItem('quantidadePizza', quantidadePizza)
}

function renoverQuantidadePizza() {
    if (quantidadePizza > 0) {
        quantidadePizza -= 1;
        document.getElementById('quantidadePizza').innerHTML = quantidadePizza;

    }
    localStorage.setItem('quantidadePizza', quantidadePizza)
}

const arrowBackHome = document.getElementById('arrow-back-home')
arrowBackHome.addEventListener('click', () => {
    history.back();
})

fromPizza.addEventListener('submit', (e) => {
    e.preventDefault();
    adicionarAoCarrinho();
});

function adicionarAoCarrinho() {
    const urlParams = new URLSearchParams(window.location.search);
    const pizzaId = urlParams.get('pizzaid');
    const nomeDaPizza = document.getElementById('nomeDaPizza').textContent;
    const quantidadePizza = parseInt(document.getElementById('quantidadePizza').textContent);
    const precoPizza = parseFloat(document.getElementById('precoPizza').textContent.replace(',', '.'));
    const tamanhoPizza = document.querySelector('input[name="tamanhoComida"]:checked').value;

    const pizza = {
        id: pizzaId,
        nome: nomeDaPizza,
        quantidade: quantidadePizza,
        preco: precoPizza,
        tamanho: tamanhoPizza
    };

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const index = carrinho.findIndex(item => item.id === pizzaId);
    if (index !== -1) {
        carrinho[index].quantidade += quantidadePizza;
    } else {
        carrinho.push(pizza);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

fromPizza.addEventListener('submit', (e) => {
    e.preventDefault();
    adicionarAoCarrinho();
});