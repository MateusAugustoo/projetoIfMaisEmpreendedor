firebase.initializeApp(window.firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const paramsUrl = new URLSearchParams(window.location.search);
const lancheId = paramsUrl.get('lancheId');
const bebidasRef = db.collection('Bebidas').doc(lancheId);
const getRefrigerantes = bebidasRef.collection('refrigerante').get()

const main = document.getElementById('fromSelectBebidasRender');
const img = document.getElementById('imageId');

const formsSelectBebidas = document.createElement('form');
formsSelectBebidas.className = 'flex justify-center gap-5';
formsSelectBebidas.id = 'formBebidas';

function renderBebidas() {
    getRefrigerantes.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            if (doc.exists) {
                const bebidasData = doc.data();
                const bebidasId = doc.id;

                const containerSelect = document.createElement('div');
                containerSelect.className = 'flex relative w-[71px] h-24 items-center justify-center';

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'bebidas';
                input.value = bebidasData.name;
                input.id = bebidasId;
                input.className = 'appearance-none w-[71px] h-24 bg-white rounded-[10px] shadow checked:bg-orange-600';


                const label = document.createElement('label');
                label.htmlFor = bebidasId;
                label.className = 'absolute';

                const imageSelect = document.createElement('img');
                imageSelect.src = bebidasData.imgPath;
                imageSelect.className = 'w-10 h-16';

                label.appendChild(imageSelect);

                containerSelect.appendChild(input);
                containerSelect.appendChild(label);

                formsSelectBebidas.appendChild(containerSelect);

                main.appendChild(formsSelectBebidas);
            }
        });
    }).catch((err) => {
        console.error(err);
    });

};
renderBebidas();


function changeImage() {
    getRefrigerantes.then((result) => {
        result.forEach((doc) => {
            const bebidasData = doc.data();
            const bebidasId = doc.id;

            formsSelectBebidas.addEventListener('change', (e) => {
                const input = e.target.id;

                if (input === bebidasId) {
                    img.src = bebidasData.imgPath;
                }
            });
        });
    }).catch((err) => {

    });
}
changeImage();

const btnBack = document.getElementById('btnVoltar');

const btnAdicionarQauntidade = document.getElementById('addQuantLanche');
let quantidadeLanche = 0;
const btnRemoverQuantidade = document.getElementById('removeQuantLanche');


function addQauntidadeLanche() {
    quantidadeLanche += 1;
    document.getElementById('quantidadeLanche').innerHTML = quantidadeLanche;
}

function removerQuantidadeLanche() {
    if (quantidadeLanche > 0) {
        quantidadeLanche -= 1;
        document.getElementById('quantidadeLanche').innerHTML = quantidadeLanche;

    }
}

btnBack.addEventListener('click', () => {
    history.back();
});

