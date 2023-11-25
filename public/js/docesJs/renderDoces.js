firebase.initializeApp(window.firebaseConfig);

const db = firebase.firestore();

async function renderDoces() {
    const sectionDoces = document.getElementById('sectionDoces');
    const docesRef = db.collection('Doces');

    const querySnapshot = await docesRef.get();
    querySnapshot.forEach((doc) => {
        docesData = doc.data();
        docesId = doc.id;

        const docesElement = document.createElement('div');
        docesElement.className = 'w-[155px] h-[222px] relative bg-white shadow rounded-xl mx-7 mt-5';

        const docesImage = document.createElement('img');
        docesImage.className = 'w-[149.81px] h-[100px] top-[20px] absolute'
        docesImage.src = docesData.imgPath;
        docesElement.appendChild(docesImage);

        const docesName = document.createElement('p');
        docesName.className = 'w-[137px] h-[15px] mx-auto top-[140px] relative text-center text-xl font-semibold fontText';
        docesName.textContent = docesData.nome;
        docesElement.appendChild(docesName);

        const docePriceDiv = document.createElement('div');
        docePriceDiv.className = 'left-[16px] top-[178px] absolute text-center ';
        const docePrice = document.createElement('p');
        docePrice.className = 'text-amber-400 text-xl font-semibold fontText';
        docePrice.textContent = `R$ ${docesData.preco}`;

        docePriceDiv.appendChild(docePrice);
        docesElement.appendChild(docePriceDiv);

        const iconAddFirstDiv = document.createElement('div');
        iconAddFirstDiv.className = 'w-[25px] h-[25px] left-[118px] top-[185px] absolute';
        const iconAddSecondDiv = document.createElement('div');
        iconAddSecondDiv.className = 'w-[25px] h-[25px] left-0 top-0 absolute'
        const iconAdd = document.createElement('img');
        iconAdd.src = '../../iconsFood/add_roudond.svg';

        iconAddSecondDiv.appendChild(iconAdd);
        iconAddFirstDiv.appendChild(iconAddSecondDiv);
        docesElement.appendChild(iconAddFirstDiv);

        sectionDoces.appendChild(docesElement);

        docesElement.addEventListener('click', ()=>{
            const collectionName = 'Doces';
            window.location.href = `../../pagesProdutos/doces/detalhesDoces.html?collectionName=${collectionName}&lancheId=${docesId}`;
        })
    })
} renderDoces();