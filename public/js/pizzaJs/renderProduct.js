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
    const sectionPizza = document.getElementById('sectionPizza')
    const pizzasRef = db.collection('Pizza')

    pizzasRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const pizzaData = doc.data()
            const pizzaId = doc.id;

            const pizzaElement = document.createElement('div')

            pizzaElement.className = 'w-[333px] h-[142px] relative mx-8 mt-5'

            pizzaElement.innerHTML = `
                <div class='w-[333px] h-[142px] left-0 top-0 absolute bg-white rounded-[20px] shadow'></div>
                <div class="w-[142.86px] h-[142px] left-[190.14px] top-0 absolute bg-orange-600 rounded-[20px]"></div>
                <div class='w-[90.47px] left-[14.08px] top-[108px] absolute text-center'>
                </div>
                <div class='w-[134.81px] left-[22.13px] top-[15px] absolute text-orange-600 text-xl font-semibold fontText'>${pizzaData.sabor}</div>
                <div class="w-[134.81px] left-[22.13px] top-[47px] absolute text-zinc-600 text-[7px] font-bold fontText">${pizzaData.ingrediente}</div>
            `;

            sectionPizza.appendChild(pizzaElement)

            pizzaElement.addEventListener('click', () => {
                window.location.href = `../pagesProdutos/detalhesPizza.html?pizzaid=${pizzaId}`;
            })
        })
    })
}

renderPizza();