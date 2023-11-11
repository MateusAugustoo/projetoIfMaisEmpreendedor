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
}

const arrowBackPage = document.getElementById('arrowBackPage');
arrowBackPage.addEventListener('click', () => {
    history.back();
});