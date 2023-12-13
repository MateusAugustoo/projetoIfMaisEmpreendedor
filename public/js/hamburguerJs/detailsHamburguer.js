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

const arrowBackPage = document.getElementById('arrowBackPage');
arrowBackPage.addEventListener('click', () => {
    history.back();
});

conteudoDetails();

function layoutCardIngrediente(hamburguerIngrediente) {
    const elementCard = document.createElement('div');
    const container = document.createElement('div');
    container.classList.add(
        'w-52',
        'h-20',
        'bg-white',
        'shadow',
        'rounded-[10px]',
        'relative',
        
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
        'w-6 h-6 appearance-none bg-white border border-orange-600 rounded checked:bg-orange-600 checked:bg-[url(\'../iconsFood/item_marcado.svg\')] bg-center transition duration-20';
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
    
    btnAdicionais.addEventListener("click", () => {
        container.classList.add('hidden');
        containerCardBack.classList.remove('hidden');
    
    })

    const containerDescricao = document.createElement('div');
    containerDescricao.className = 'w-[67px] h-8 relative';

    const btnDescricao = document.createElement('button');
    btnDescricao.className =
        'w-16 h-8 absolute top-1 right-0 bg-orange-600 rounded-tl-[10px] rounded-br-[10px]';
    btnDescricao.addEventListener("click", () => {
        container.classList.add('hidden');
        containerCardDescricao.classList.remove('hidden');
    })
    const imgDescricao = document.createElement('img');
    imgDescricao.src = '../../images/iconDescricao.png';
    imgDescricao.alt = 'icon para abrir a descrição';
    imgDescricao.className = 'mx-auto p-1';
    btnDescricao.appendChild(imgDescricao);
    containerDescricao.appendChild(btnDescricao);

    containerAdicionaisDescricao.appendChild(containerAdicionais);
    containerAdicionaisDescricao.appendChild(containerDescricao);

    container.appendChild(containerAdicionaisDescricao);

    cardIngredientes.appendChild(elementCard);

    //card is back
    const containerCardBack = document.createElement('div');
    containerCardBack.className = 'w-48 h-28 bg-zinc-600 rounded-[10px] shadow hidden';

    const form = document.createElement('form');
    form.className = 'flex justify-around items-center py-2';

    const labelBack = document.createElement('label');
    labelBack.className = 'text-white text-lg font-lg font-bold fontText mx-10';
    labelBack.textContent = hamburguerIngrediente.nome;
    
    containerCardBack.appendChild(labelBack)

    const input = document.createElement('input');
    input.className = 'mx-2 mt-2 w-6 h-6 appearance-none bg-white border border-orange-600 rounded checked:bg-orange-600 checked:bg-[url(\'../iconsFood/item_marcado.svg\')] bg-center transition duration-20';
    input.type = 'checkbox';

    containerCardBack.appendChild(input);

    const preco = document.createElement('div');
    preco.className = 'w-20 text-center mx-auto text-lg relative text-white font-bold text-base';
    preco.textContent = `R$ 1,99`;

    containerCardBack.appendChild(preco);

    const addOrRenoveQuantidade = document.createElement('div');
    addOrRenoveQuantidade.id = 'containerBtn';
    addOrRenoveQuantidade.className = 'w-[105px] h-9 mx-auto';

    form.appendChild(addOrRenoveQuantidade);
    containerCardBack.appendChild(form);

    const btnOcultar = document.createElement('button');

    const imgSetaOcultar = document.createElement('img');
    imgSetaOcultar.className = 'relative -top-16 clock  ';
    imgSetaOcultar.src = '../../images/iconeSetaBranca.svg';
    imgSetaOcultar.alt = 'Icone para ocultar os adicionais';

    btnOcultar.addEventListener("click", () => {
        container.classList.remove('hidden');
        containerCardBack.classList.add('hidden');
    })
    btnOcultar.appendChild(imgSetaOcultar);
    containerCardBack.appendChild(btnOcultar);
    
    const containerBtnCloseAdicionais = document.createElement('div');
    containerBtnCloseAdicionais.className = 'w-8 h-16 relative';

    const btnClose = document.createElement('button');
    btnClose.className = 'w-8 h-16 absolute -top-14 bg-white rounded-tr-[10px] rounded-br-[10px]';
    elementCard.appendChild(container)
    elementCard.appendChild(containerCardBack);

   
    //card is back orange
    const containerCardDescricao = document.createElement('div');
    containerCardDescricao.className = 'w-48 h-28 bg-orange-600 rounded-[10px] shadow hidden';
    
    const descricaoLabel = document.createElement('label');
    descricaoLabel.className = 'relative bottom-10 text-white text-xs font-medium fontText ml-5';
    descricaoLabel.textContent = "Blender de Carne de 200g"

    const btnOcultarDescricao = document.createElement('button');
    const imgSetaOcultarDescricao = document.createElement('img');  
    imgSetaOcultarDescricao.src = '../../images/iconeDescricaoOpen.png';
    btnOcultarDescricao.appendChild(imgSetaOcultarDescricao);
    btnOcultarDescricao.addEventListener("click", () => {
        container.classList.remove('hidden');
        containerCardDescricao.classList.add('hidden');
    })
    
    containerCardDescricao.appendChild(labelBack.cloneNode(true));
    containerCardDescricao.appendChild(input.cloneNode(true));
    containerCardDescricao.appendChild(descricaoLabel)
    containerCardDescricao.appendChild(btnOcultarDescricao);

    elementCard.appendChild(containerCardDescricao);
}