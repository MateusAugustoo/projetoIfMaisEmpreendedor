const btn = document.getElementById('btnAddCart')

function btnCarrinho(){
        const button = document.createElement('button');
        button.id = 'btnBackground';
        button.classList.add('w-52', 'h-11', 'bg-orange-600', 'rounded-2xl', 'shadow', 'flex', 'text-white', 'font-bold', 'text-xs', 'fontText', 'justify-center', 'items-center', 'gap-2');
        button.onclick = productCheckdCart;

        const img = document.createElement('img');
        img.src = '../../iconsFood/carrinho.svg';
        img.id = 'btnCartIcon';

        const span = document.createElement('span');
        span.id = 'btnText';
        span.innerHTML = 'Adicionar ao carrinho';

        button.appendChild(img);
        button.appendChild(span);

        btn.appendChild(button);
}
btnCarrinho();

const btnBackground = document.getElementById("btnBackground");
const btnText = document.getElementById("btnText");
const btnCartIcon = document.getElementById("btnCartIcon");

function productCheckdCart() {
  if (adicionarAoCarrinho() == false) {
    return;
  }
  btnStyleAdiconadoAoCarrinho();
}

function adicionarAoCarrinho() {
  const urlParams = new URLSearchParams(window.location.search);
  const lancheId = urlParams.get("lancheId");
  const nomeDoLanche = document.getElementById("nomeDoLanche").textContent;
  const quantidadeLanche = parseInt(
    document.getElementById("quantidadeLanche").textContent
  );
  const precoLancheElement = document.getElementById("precoLanche").textContent;
  const precoLanche = parseFloat(
    precoLancheElement.replace("R$ ", "").replace(",", ".")
  );
  const tamanhoLancheElement = document.querySelector(
    'input[name="tamanhoComida"]:checked'
  );
  const tamanhoLanche = tamanhoLancheElement ? tamanhoLancheElement.value : "";

  const lanche = {
    id: lancheId,
    nome: nomeDoLanche,
    quantidade: quantidadeLanche,
    preco: precoLanche,
    tamanho: tamanhoLanche,
  };
  if (quantidadeLanche === 0) {
    alert("Selecione a quantidade do lanche");
    return false;
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const index = carrinho.findIndex((item) => item.id === lancheId);
  if (index !== -1) {
    carrinho[index].quantidade += quantidadeLanche;
  } else {
    carrinho.push(lanche);
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function btnStyleAdiconadoAoCarrinho() {
  btnBackground.classList.remove("bg-orange-600", "text-white");
  btnBackground.classList.add("bg-white", "border", "border-orange-600");

  btnText.textContent = "Adicionado ao carrinho";
  btnCartIcon.src = '../../images/check_product_cart.svg';

}