firebase.initializeApp(window.firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const cardIngredientes = document.getElementById('cardAdicionais');
cardIngredientes.className = 'flex gap-6';

function conteudoDetails() {
    const params = new URLSearchParams(window.location.search);
    const hamburguerId = params.get('lancheId');
    const nomeHamburguer = document.getElementById('nomeDoLanche');
    const precoHamburguer = document.getElementById('precoLanche');
    const imagemHamburguer = document.getElementById('imageHamburguer');

    const hamburguersRef = db.collection('Hamburguer');

    hamburguersRef.doc(hamburguerId).get().then((doc) => {
        if (doc.exists) {
            const hamburguerData = doc.data();
            const hamburguerIngredientes = hamburguerData.ingredientes;

            nomeHamburguer.textContent = hamburguerData.nome;
            precoHamburguer.textContent = `R$ ${hamburguerData.preco}`;
            imagemHamburguer.src = hamburguerData.imgPath;

            hamburguerIngredientes.forEach(hamburguerIngrediente => {
                layoutCardIngrediente(hamburguerIngrediente);
            })
        }
    });
}
conteudoDetails();

const arrowBackPage = document.getElementById('arrowBackPage');
arrowBackPage.addEventListener('click', () => {
    history.back();
});


function layoutCardIngrediente(hamburguerIngrediente) {
    const container = document.createElement('div');
    container.classList.add(
        'w-52',
        'h-20',
        'bg-white',
        'shadow',
        'rounded-[10px]',
        'relative'
    );

    const headerCard = document.createElement('form');
    headerCard.className = 'flex justify-around items-center py-2';

    const label = document.createElement('label');
    label.className = 'text-zinc-600 text-lg font-bold fontText';
    label.textContent = hamburguerIngrediente.nome;
    headerCard.appendChild(label);

    const inputCheckbox = document.createElement('input');
    inputCheckbox.type = 'checkbox';
    inputCheckbox.className =
        'w-5 h-5 appearance-none bg-white border border-orange-600 rounded checked:bg-orange-600 checked:bg-[url(\'../iconsFood/item_marcado.svg\')] bg-center transition duration-20';
    headerCard.appendChild(inputCheckbox);

    container.appendChild(headerCard);

    const containerAdicionaisDescricao = document.createElement('div');
    containerAdicionaisDescricao.className = 'flex justify-between';

    const containerAdicionais = document.createElement('div');
    containerAdicionais.className = 'w-[67px] h-8 relative';

    const btnAdicionais = document.createElement('button');
    btnAdicionais.className =
        'w-16 h-8 absolute top-1 bg-zinc-600 rounded-tr-[10px] rounded-bl-[10px]';

    const imgAdicionais = document.createElement('img');
    imgAdicionais.className = 'mx-auto py-1';
    imgAdicionais.src = '../../images/iconSeta.png';
    imgAdicionais.alt = 'icon para abrir os adicionais';
    btnAdicionais.appendChild(imgAdicionais);
    containerAdicionais.appendChild(btnAdicionais);

    const containerDescricao = document.createElement('div');
    containerDescricao.className = 'w-[67px] h-8 relative';

    const btnDescricao = document.createElement('button');
    btnDescricao.className =
        'w-16 h-8 absolute top-1 right-0 bg-orange-600 rounded-tl-[10px] rounded-br-[10px]';

    const imgDescricao = document.createElement('img');
    imgDescricao.src = '../../images/iconDescricao.png';
    imgDescricao.alt = 'icon para abrir a descrição';
    imgDescricao.className = 'mx-auto p-1';
    btnDescricao.appendChild(imgDescricao);
    containerDescricao.appendChild(btnDescricao);

    containerAdicionaisDescricao.appendChild(containerAdicionais);
    containerAdicionaisDescricao.appendChild(containerDescricao);

    container.appendChild(containerAdicionaisDescricao);

    cardIngredientes.appendChild(container);

    //card is back
    // const containerCardBack = document.createElement('div');
    // containerCardBack.className = 'w-48 h-28 bg-zinc-600 rounded-[10px] shadow';

    // const from = document.createElement('form');
    // from.className = 'flex justify-around items-center py-2';

    // const labelBack = document.createElement('label');
    // labelBack.className = 'text-white text-lg font-lg font-bold fontText';

    // const input = document.createElement('input');
    // input.className = "w-5 h-5 apparence-none bg-white border border-orange-600 rounded checked:bg-orange-600 checked:bg-[url('../../iconsFood/item_marcado.svg')] bg-center transition duration-200";
    // input.type = 'checkbox';

    // const preco = document.createElement('div');
    // preco.className = 'w-20 text-center mx-auto relative text-white font-bold text-base';

    // const addOrRenoveQuantidade = document.createElement('div');
    // addOrRenoveQuantidade.id = 'containerBtn';
    // addOrRenoveQuantidade.className = 'w-[105px] h-9 mx-auto';

    // const containerBtnCloseAdicionais = document.createElement('div');
    // containerBtnCloseAdicionais.className = 'w-8 h-16 relative';

    // const btnClose = document.createElement('button');
    // btnClose.className = 'w-8 h-16 absolute -top-14 bg-white rounded-tr-[10px] rounded-br-[10px]';

    // const imgClose = document.createElement('img');
    // imgClose.src = '../../images/iconSetaDark.png';
    // imgClose.className = 'py-6 mx-auto';

    // //card description
    // const containerDescricaoBack = document.createElement('div');
    // containerDescricao.className = 'w-48 h-28 bg-orange-600 rounded-[10px] shadow';

    // const nameIngrediente = document.createElement('p');
    // nameIngrediente.className = 'text-white text-lg font-bold fontText p-2';

    // const descricao = document.createElement('p');
    // descricao.className = 'text-white text-sm font-medium fontText px-2';

    // const btnCloseDesc = document.createElement('div');
    // btnCloseDesc.className = 'w-8 h-16 bg-white absolute right-0 top-12 rounded-br-[10px]';

    // const imgCloseDesc = document.createElement('img');
    // imgCloseDesc.src = '../../images/iconeDescricaoOpen.png';
    // imgCloseDesc.className = 'mx-auto py-5';
}