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

const sectionBebidas = document.getElementById('sectionBebidas');

const renderCardBebidas = async () => {
    const bebidasRef = db.collection('Bebidas');
    const querySnapshot = await bebidasRef.get();

    querySnapshot.forEach((doc) => {
        const bebidasData = doc.data();
        const lancheId = doc.id;

        const container = document.createElement('div');
        container.id = 'cardBebidas'
        container.className = 'w-[331px] h-[222px] relative mx-auto';
    
        const containerColorBackground = document.createElement('div');
        containerColorBackground.className = 'w-[331px] h-[222px] relative mx-auto mt-5 bg-white rounded-[20px] shadow';
        container.appendChild(containerColorBackground);
    
        const containerImageAdd = document.createElement('button');
        containerImageAdd.className = 'w-[30px] h-[30px] left-[294px] top-[185px] absolute';
    
        const imageIconAdd = document.createElement('img');
        imageIconAdd.className = 'w-[30px] h-[30px] left-[294px] top-[185px] absolute';
        imageIconAdd.src = '../../iconsFood/add_roudond.svg';
        imageIconAdd.alt = 'icone de adicionar bebidas';
        containerImageAdd.appendChild(imageIconAdd);
        containerColorBackground.appendChild(containerImageAdd);
    
        const titleCard = document.createElement('p');
        titleCard.className = 'w-[133px] left-[188px] top-[13px] absolute text-xl font-semibold fontText';
        titleCard.textContent = bebidasData.title;
        containerColorBackground.appendChild(titleCard);
    
        const descriptionCard = document.createElement('p');
        descriptionCard.className = 'w-[122px] left-[190px] top-[76px] absolute text-zinc-600 text-[13px] font-bold fontText';
        descriptionCard.textContent = bebidasData.description;
        containerColorBackground.appendChild(descriptionCard);
    
        const priceCard = document.createElement('p');
        priceCard.className = 'left-[23px] top-[178px] absolute text-center text-amber-400 text-xl font-bold fontText tracking-wide';
        priceCard.id = 'priceCard';
        containerColorBackground.appendChild(priceCard);
    
        const image = document.createElement('img');
        image.className = 'w-[175px] h-auto left-[10px] top-[26px] absolute';
        image.src = bebidasData.imgCard;
        image.alt = 'imagem de refrigerantes em lata';
        containerColorBackground.appendChild(image);
    
        sectionBebidas.appendChild(container);

        container.addEventListener('click', () => {
            window.location.href = `../bebidas/datailsBedidas.html?lancheId=${lancheId}`;
        });
    });
};
renderCardBebidas();