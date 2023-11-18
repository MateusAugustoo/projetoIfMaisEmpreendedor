const btnBackground = document.getElementById('btnBackground');
const btnText = document.getElementById('btnText');


function productCheckdCart() {
    adicionarAoCarrinho();
    btnStyleAdiconadoAoCarrinho();
}

function adicionarAoCarrinho() {
    const urlParams = new URLSearchParams(window.location.search);
    const lancheId = urlParams.get('lancheId');
    const nomeDoLanche = document.getElementById('nomeDoLanche').textContent;
    const quantidadeLanche = parseInt(document.getElementById('quantidadeLanche').textContent);
    const precoLancheElement = document.getElementById('precoLanche').textContent
    const precoLanche = parseFloat(precoLancheElement.replace('R$ ', '').replace(',', '.'));
    const tamanhoLancheElement = document.querySelector('input[name="tamanhoComida"]:checked');
    const tamanhoLanche = tamanhoLancheElement ? tamanhoLancheElement.value : '';

    const lanche = {
        id: lancheId,
        nome: nomeDoLanche,
        quantidade: quantidadeLanche,
        preco: precoLanche,
        tamanho: tamanhoLanche
    };

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const index = carrinho.findIndex(item => item.id === lancheId);
    if (index !== -1) {
        carrinho[index].quantidade += quantidadeLanche;
    } else {
        carrinho.push(lanche);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function btnStyleAdiconadoAoCarrinho() {
    
}