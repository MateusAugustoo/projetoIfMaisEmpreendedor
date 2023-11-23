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

btnBack.addEventListener('click', () => {
    history.back();
});

// switch (input) {
//     case bebidasId:
//         img.src = bebidasData.imgPath;
//         break;

//     default:
//         break;
// }