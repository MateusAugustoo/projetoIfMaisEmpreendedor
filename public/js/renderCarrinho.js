
const sectionLanches = document.getElementById('section-lanches');
const pSubTotal = document.getElementById('p-subtotal');
const pTaxaEntrega = document.getElementById('p-taxa');
const pTotalPagemento = document.getElementById('p-total-pagamento');

const taxaEntrega = 0;


function renderCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    
    let subtotal = 0;

    carrinho.forEach((lanches) => {
        const containerLanche = document.createElement('div');
        containerLanche.className = 'flex justify-between px-5 mt-2'

        const nomeLanche = document.createElement('p');
        nomeLanche.className = 'text-gray-800 text-xs font-medium'
        nomeLanche.textContent = `Pizza ${lanches.nome} ${lanches.tamanho}`;
        containerLanche.appendChild(nomeLanche);

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
renderCarrinho();
