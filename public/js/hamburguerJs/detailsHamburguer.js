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

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const hamburguerId = params.get('hamburguerid');

    const hamburguersRef = db.collection('Hamburguer');

    hamburguersRef.doc(hamburguerId).get().then((doc) => {
        if (doc.exists) {
            const hamburguerData = doc.data();

            const nomeHamburguer = document.getElementById('nomeHamburguer');
            nomeHamburguer.textContent = hamburguerData.nome;

            const precoHamburguer = document.getElementById('precoHamburguer');
            precoHamburguer.textContent = `R$ ${hamburguerData.preco}`;

            const descricaoHamburguer = document.getElementById('ingredientesHamburguer');
            descricaoHamburguer.textContent = hamburguerData.ingredientes;

            const imagemHamburguer = document.getElementById('imageHamburguer');
            imagemHamburguer.src = hamburguerData.pathPhoto;
        }
    });

    const favoritarHamburguer = document.getElementById('favoritar');
    const pathElements = favoritarHamburguer.querySelectorAll('path');

    auth.onAuthStateChanged((user) => {
        if (user) {
            favoritarHamburguer.addEventListener('click', () => {
                const userId = user.uid
                adicionarLancheAoFavorito(userId, hamburguerId);

                pathElements.forEach(pathElement => {
                    pathElement.setAttribute('fill', 'red');
                })
            })
        }
    })
}


function adicionarLancheAoFavorito(userId, hamburguerId) {
    const favoritosRef = db.collection('Favoritos');

    favoritosRef.doc(userId).get().then((doc) => {
        if (doc.exists) {
            const favoritosData = doc.data();

            if (!favoritosData.lanches.includes(hamburguerId)) {
                favoritosData.lanches.push(hamburguerId);
            }

            favoritosRef.doc(userId).update({
                lanches: favoritosData.lanches
            })
        }
        else {
            const novosFavoritos = {
                lanches: [hamburguerId]
            };

            favoritosRef.doc(userId).set(novosFavoritos);
        }
        alert('Hamburguer adicionado aos favoritos');
    }).catch((error) => {
        console.log(error);
    });
}

const btnAdicionarQauntidade = document.getElementById('addQuantLanche');
let quantidadeLanche = 0;
const btnRemoverQuantidade = document.getElementById('removeQuantLanche');

function addQauntidadeLanche() {
    quantidadeLanche++;
    document.getElementById('quantidade').textContent = quantidadeLanche;
}

function removerQuantidadeLanche() {
    if (quantidadeLanche > 0) {
        quantidadeLanche--;
        document.getElementById('quantidade').textContent = quantidadeLanche;
    }

}

const arrowBackPage = document.getElementById('arrowBackPage');
arrowBackPage.addEventListener('click', () => {
    history.back();
});