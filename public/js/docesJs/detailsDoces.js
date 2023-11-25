firebase.initializeApp(window.firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const docesId = params.get('lancheId');

    const docesRef = db.collection('Doces');

    docesRef.doc(docesId).get().then((doc) => {
        if (doc.exists) {
            docesData = doc.data();

            const nomeDoces = document.getElementById('nomeDoLanche');
            nomeDoces.textContent = docesData.nome;

            const precoDoces = document.getElementById('precoLanche');
            precoDoces.textContent = `R$ ${docesData.preco}`;

            const descricaoDoces = document.getElementById('ingredientesDoce');
            descricaoDoces.textContent = docesData.ingredientes;

            const imageDoces = document.getElementById('imageDoce');
            imageDoces.src = docesData.pathPhoto;

        }
    })

    const favoritarDoces = document.getElementById('favoritar');
    const pathElements = favoritarDoces.querySelectorAll('path');

    auth.onAuthStateChanged((user) => {
        if (user) {
            favoritarDoces.addEventListener('click', () => {
                const userId = user.uid
                adicionarLancheAoFavorito(userId, docesId);

                pathElements.forEach(pathElement => {
                    pathElement.setAttribute('fill', 'red');
                })
            })
        }
    })
}

function adicionarLancheAoFavorito(userId, docesId) {
    const favoritosRef = db.collection('Favoritos');

    favoritosRef.doc(userId).get().then((doc) => {
        if (doc.exists) {
            const favoritosData = doc.data();

            if (!favoritosData.lanches.includes(docesId)) {
                favoritosData.lanches.push(docesId);
            }

            favoritosRef.doc(userId).update({
                lanches: favoritosData.lanches
            })
        }
        else {
            const novosFavoritos = {
                lanches: [docesId]
            };

            favoritosRef.doc(userId).set(novosFavoritos);
        }
        alert('Doce adicionado aos favoritos');
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
})