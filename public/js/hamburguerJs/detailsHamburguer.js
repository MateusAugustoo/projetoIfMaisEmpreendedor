firebase.initializeApp(window.firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

function conteudoDetails() {
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
conteudoDetails();

const arrowBackPage = document.getElementById('arrowBackPage');
arrowBackPage.addEventListener('click', () => {
    history.back();
});