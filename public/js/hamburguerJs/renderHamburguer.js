firebase.initializeApp(window.firebaseConfig);

const db = firebase.firestore();

async function renderHamburguer() {
    const sectionHamburguer = document.getElementById('sectionHamburguer');
    const hamburguersRef = db.collection('Hamburguer');

    const querySnapshot = await hamburguersRef.get();
    querySnapshot.forEach((doc)=>{
        hamburguerData = doc.data();
        hamburguerId = doc.id;

        const hamburguerElement = document.createElement('div');
        hamburguerElement.className = 'w-[155px] h-[222px] relative bg-white shadow rounded-xl';

        const hamburguerImage = document.createElement('img');
        hamburguerImage.className = 'w-[134.80px] h-[116.21px] left-[10px] top-[20px] absolute'
        hamburguerImage.src = hamburguerData.imgPath;
        hamburguerElement.appendChild(hamburguerImage);

        const hamburguerName = document.createElement('p');
        hamburguerName.className = 'h-[15px] top-[140px] relative mx-auto text-center text-xl font-semibold fontText';
        hamburguerName.textContent = hamburguerData.nome;
        hamburguerElement.appendChild(hamburguerName);

        const hamburguerPriceDiv = document.createElement('div');
        hamburguerPriceDiv.className = 'left-[16px] top-[178px] absolute text-center ';
        const hamburguerPrice = document.createElement('p');
        hamburguerPrice.className ='text-amber-400 text-xl font-semibold fontText';
        hamburguerPrice.textContent = `R$ ${hamburguerData.preco}`;

        hamburguerPriceDiv.appendChild(hamburguerPrice);
        hamburguerElement.appendChild(hamburguerPriceDiv);

        const iconAddFirstDiv = document.createElement('div');
        iconAddFirstDiv.className = 'w-[25px] h-[25px] left-[118px] top-[185px] absolute';
        const iconAddSecondDiv = document.createElement('div');
        iconAddSecondDiv.className = 'w-[25px] h-[25px] left-0 top-0 absolute'
        const iconAdd = document.createElement('img');
        iconAdd.src = '../../iconsFood/add_roudond.svg';

        iconAddSecondDiv.appendChild(iconAdd);
        iconAddFirstDiv.appendChild(iconAddSecondDiv);
        hamburguerElement.appendChild(iconAddFirstDiv);

        sectionHamburguer.appendChild(hamburguerElement);

        hamburguerElement.addEventListener('click', () => {
            const collectionName = 'Hamburguer';
            window.location.href = `../../pagesProdutos/hamburguer/detalhesHamburguer.html?collectionName=${collectionName}&lancheId=${hamburguerId}`;
        });
    });
}

renderHamburguer();