
const carrinhoCard = document.getElementById('carrinho-card');

const taxaEntrega = 0;

function renderCarrinho() {
    if (localStorage.getItem('carrinho') !== '[]') {
        layoutCarrinho();
        renderProdutosCarrinho();

    } else {
        carrinhoVazio();        
    }
}renderCarrinho();

function layoutCarrinho() {
    const table = document.createElement('div')
    table.className = 'w-[363px] h-[293px] relative mx-auto mt-4 px-5';

    const tableBody = document.createElement('div');
    tableBody.className = 'w-[363px] h-auto left-0 top-0 absolute bg-yellow-100 py-6 border border-orange-600';
    table.appendChild(tableBody);

    const tableHead = document.createElement('div');
    tableHead.className = 'flex justify-around'

    const tableHeadNome = document.createElement('p');
    tableHeadNome.className = 'relative text-zinc-600 text-xs font-extrabold uppercase tracking-wide';
    tableHeadNome.textContent = 'Descrição';
    tableHead.appendChild(tableHeadNome);

    const tableHeadQuant = document.createElement('p');
    tableHeadQuant.className = 'relative text-zinc-600 text-xs font-extrabold uppercase tracking-wide';
    tableHeadQuant.textContent = 'Quantidade';
    tableHead.appendChild(tableHeadQuant);

    const tableHeadValor = document.createElement('p');
    tableHeadValor.className = 'relative text-zinc-600 text-xs font-extrabold uppercase tracking-wide';
    tableHeadValor.textContent = 'Valor';
    tableHead.appendChild(tableHeadValor);

    tableBody.appendChild(tableHead);

    const sectionLanches = document.createElement('section');
    sectionLanches.id = 'section-lanches';
    tableBody.appendChild(sectionLanches);

    const divider = document.createElement('div');
    divider.className = 'w-[319px] h-[1px] bg-gray-500 mx-auto mt-4';
    tableBody.appendChild(divider);

    const sectionSubTotal = document.createElement('section');
    sectionSubTotal.className = 'px-5 mt-5 mb-5 flex flex-col gap-3';

    const containerSubTotal = document.createElement('div');
    containerSubTotal.className = 'flex justify-between';

    const pSubTotalTitulo = document.createElement('p');
    pSubTotalTitulo.className = 'text-zinc-600 text-[12px] font-semibold tracking-wider';
    pSubTotalTitulo.textContent = 'Subtotal';
    const pSubTotalValor = document.createElement('p');
    pSubTotalValor.id = 'p-subtotal';
    pSubTotalValor.className = 'text-right text-gray-800 text-xs font-bold';

    containerSubTotal.appendChild(pSubTotalTitulo);
    containerSubTotal.appendChild(pSubTotalValor);

    const containerTaxaEntrega = document.createElement('div');
    containerTaxaEntrega.className = 'flex justify-between';

    const pTaxaEntregaTitulo = document.createElement('p');
    pTaxaEntregaTitulo.className = 'text-zinc-600 text-[12px] font-semibold tracking-wider';
    pTaxaEntregaTitulo.textContent = 'Taxa de entrega';
    const pTaxaEntregaValor = document.createElement('p');
    pTaxaEntregaValor.id = 'p-taxa';
    pTaxaEntregaValor.className = 'text-right text-gray-800 text-xs font-bold';

    containerTaxaEntrega.appendChild(pTaxaEntregaTitulo);
    containerTaxaEntrega.appendChild(pTaxaEntregaValor);

    sectionSubTotal.appendChild(containerSubTotal);
    sectionSubTotal.appendChild(containerTaxaEntrega);

    tableBody.appendChild(sectionSubTotal);

    const divider2 = document.createElement('div');
    divider2.className = 'w-[319px] h-[1px] bg-gray-500 mx-auto mt-4';

    tableBody.appendChild(divider2);

    const sectionTotal = document.createElement('section');
    sectionTotal.className = 'relative mt-5 px-5';

    const containerTotal = document.createElement('div');
    containerTotal.className = 'flex justify-between';

    const pTotalTitulo = document.createElement('p');
    pTotalTitulo.className = 'text-zinc-600 text-[12px] font-semibold tracking-wider';
    pTotalSpan = document.createElement('span');
    pTotalSpan.className = 'text-zinc-600 text-xs font-semibold tracking-wide';
    pTotalSpan.textContent = '(R$)';
    pTotalTitulo.textContent = 'Total ';
    pTotalTitulo.appendChild(pTotalSpan);

    const pTotalValor = document.createElement('p');
    pTotalValor.id = 'p-total-pagamento';
    pTotalValor.className = 'text-right text-orange-600 text-lg font-extrabold';

    containerTotal.appendChild(pTotalTitulo);
    containerTotal.appendChild(pTotalValor);

    sectionTotal.appendChild(containerTotal);

    tableBody.appendChild(sectionTotal);

    carrinhoCard.appendChild(table);
}

function renderProdutosCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const pTaxaEntrega = document.getElementById('p-taxa');
    const pSubTotal = document.getElementById('p-subtotal');
    const pTotalPagemento = document.getElementById('p-total-pagamento');
    const sectionLanches = document.getElementById('section-lanches');
    
    let subtotal = 0;

    carrinho.forEach((lanches) => {
        const containerLanche = document.createElement('div');
        containerLanche.className = 'flex justify-between px-5 mt-2'

        const containerSelectLanches = document.createElement('div');
        containerSelectLanches.className = 'checkbox-wrapper flex items-center';

        const lableLanche = document.createElement('label');
        lableLanche.className = 'text-gray-800 text-xs font-medium';
        lableLanche.textContent = `${lanches.nome} - ${lanches.tamanho}`;

        const inputLanche = document.createElement('input');
        inputLanche.type = 'checkbox';

        containerSelectLanches.appendChild(inputLanche);
        containerSelectLanches.appendChild(lableLanche);

        containerLanche.appendChild(containerSelectLanches);

        const quantidadeLanche = document.createElement('p');
        quantidadeLanche.className = 'text-gray-800 text-xs font-medium'
        quantidadeLanche.textContent = lanches.quantidade;
        containerLanche.appendChild(quantidadeLanche)

        const precoLanche = document.createElement('p');
        precoLanche.className = 'text-right text-gray-800 text-xs font-semibold'
        precoLanche.textContent = `R$ ${lanches.preco}`;
        containerLanche.appendChild(precoLanche);

        subtotal += lanches.preco * lanches.quantidade;

        sectionLanches.appendChild(containerLanche);
    });

    pTaxaEntrega.textContent = `R$ ${taxaEntrega}`;

    pSubTotal.textContent = `R$ ${subtotal.toFixed(2)}`;

    let total = subtotal + taxaEntrega;
    pTotalPagemento.textContent = `R$ ${total.toFixed(2)}`;
}

function excluirLanche() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const carrinhoAtualizado = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            carrinho.splice(index, 1);
        }
    });

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    renderProdutosCarrinho();

    window.location.reload();
}

function carrinhoVazio() {
    const pFirstDiv = document.createElement('div');
    pFirstDiv.className = 'w-[363px] h-[280px] relative mx-auto mt-4';

    const backGround = document.createElement('div');
    backGround.className = 'w-[363px] h-[280px] left-0 top-0 absolute bg-yellow-100 border border-orange-600';
    pFirstDiv.appendChild(backGround);

    const pSecondDiv = document.createElement('div');
    pSecondDiv.className = 'w-[319px] h-[1.60px] left-[22px] top-[189px] absolute bg-gray-500';
    pFirstDiv.appendChild(pSecondDiv);

    const mensagemDiv = document.createElement('div');
    mensagemDiv.className = 'w-[280px] h-[135px] left-[42px] top-[32px] absolute text-center text-orange-600 text-3xl font-bold fontText';
    mensagemDiv.textContent = 'Nenhum Item no Carrinho! :(';
    pFirstDiv.appendChild(mensagemDiv);

    const descricaoDiv = document.createElement('div');
    descricaoDiv.className = 'w-56 left-[70px] top-[213px] absolute text-center text-black text-[15px] font-semibold fontText';
    descricaoDiv.textContent = 'Adicione algo para concluir sua compra.';

    pFirstDiv.appendChild(descricaoDiv);

    carrinhoCard.appendChild(pFirstDiv);
}
