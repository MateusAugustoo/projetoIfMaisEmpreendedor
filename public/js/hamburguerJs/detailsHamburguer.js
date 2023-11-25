firebase.initializeApp(window.firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

function condeutoDetails() {
    const params = new URLSearchParams(window.location.search);
    const hamburguerId = params.get('lancheId');
    const nomeHamburguer = document.getElementById('nomeDoLanche');
    const precoHamburguer = document.getElementById('precoLanche');
    const descricaoHamburguer = document.getElementById('ingredientesHamburguer');
    const imagemHamburguer = document.getElementById('imageHamburguer');

    const hamburguersRef = db.collection('Hamburguer');

    hamburguersRef.doc(hamburguerId).get().then((doc) => {
        if (doc.exists) {
            const hamburguerData = doc.data();

            nomeHamburguer.textContent = hamburguerData.nome;
            precoHamburguer.textContent = `R$ ${hamburguerData.preco}`;
            descricaoHamburguer.textContent = hamburguerData.ingredientes;
            imagemHamburguer.src = hamburguerData.imgPath;
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
condeutoDetails();


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
    document.getElementById('quantidadeLanche').textContent = quantidadeLanche;
}

function removerQuantidadeLanche() {
    if (quantidadeLanche > 0) {
        quantidadeLanche--;
        document.getElementById('quantidadeLanche').textContent = quantidadeLanche;
    }

}

const arrowBackPage = document.getElementById('arrowBackPage');
arrowBackPage.addEventListener('click', () => {
    history.back();
});