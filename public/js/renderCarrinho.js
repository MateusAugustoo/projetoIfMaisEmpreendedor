const carrinhoCard = document.getElementById("carrinho-card");

const taxaEntrega = 0;

function renderCarrinho() {
  if (localStorage.getItem("carrinho") !== "[]") {
    layoutCarrinho();
    renderProdutosCarrinho();
  } else {
    carrinhoVazio();
  }
}
renderCarrinho();

function layoutCarrinho() {
  const containerCarrinho = document.createElement("div");
  containerCarrinho.className =
    "bg-yellow-100 h-auto w-[100%] border border-orange-600 mt-4";

  const tableCarrinho = document.createElement("table");
  tableCarrinho.className = "w-[100%]";

  const theadCarrinho = document.createElement("thead");

  const trCarrinho = document.createElement("tr");
  trCarrinho.className = "flex justify-around mt-10";

  const thCarrinhoDesc = document.createElement("th");
  thCarrinhoDesc.className =
    "text-zinc-600 text-xs font-extrabold uppercase tracking-wide";
  thCarrinhoDesc.textContent = "Descrição";

  const thCarrinhoQtd = document.createElement("th");
  thCarrinhoQtd.className =
    "text-zinc-600 text-xs font-extrabold uppercase tracking-wide";
  thCarrinhoQtd.textContent = "Quantidade";

  const thCarrinhoPreco = document.createElement("th");
  thCarrinhoPreco.className =
    "text-zinc-600 text-xs font-extrabold uppercase tracking-wide";
  thCarrinhoPreco.textContent = "valor";

  trCarrinho.appendChild(thCarrinhoDesc);
  trCarrinho.appendChild(thCarrinhoQtd);
  trCarrinho.appendChild(thCarrinhoPreco);
  theadCarrinho.appendChild(trCarrinho);
  tableCarrinho.appendChild(theadCarrinho);

  const tbodyCarrinho = document.createElement("tbody");
  tbodyCarrinho.id = "section-lanches";
  tableCarrinho.appendChild(tbodyCarrinho);
  containerCarrinho.appendChild(tableCarrinho);

  const dividerCarrinho = document.createElement("div");
  dividerCarrinho.className = "w-11/12 mx-auto h-[1.60px] bg-gray-500";
  containerCarrinho.appendChild(dividerCarrinho);

  const containerSubTotalDiv = document.createElement("div");
  const containerSubTotal = document.createElement("div");
  containerSubTotal.className =
    "w-11/12 mx-auto flex justify-between mt-4 pb-4 divide-gray-500";

  const pSubTotal = document.createElement("p");
  pSubTotal.className = "text-zinc-600 text-xs font-semibold tracking-wide";
  pSubTotal.textContent = "Subtotal";

  const pSubTotalValor = document.createElement("p");
  pSubTotalValor.id = "p-subtotal";
  pSubTotalValor.className = "text-gray-800 text-xs font-bold";

  containerSubTotal.appendChild(pSubTotal);
  containerSubTotal.appendChild(pSubTotalValor);
  containerSubTotalDiv.appendChild(containerSubTotal);

  const containerTaxaDiv = document.createElement("div");
  const containerTaxa = document.createElement("div");
  containerTaxa.className = "w-11/12 mx-auto flex justify-between pb-4";

  const pTaxa = document.createElement("p");
  pTaxa.className = "text-zinc-600 text-xs font-semibold tracking-wide";
  pTaxa.textContent = "Taxa de entrega";

  const pTaxaValor = document.createElement("p");
  pTaxaValor.id = "p-taxa";
  pTaxaValor.className = "text-gray-800 text-xs font-bold";

  containerTaxa.appendChild(pTaxa);
  containerTaxa.appendChild(pTaxaValor);
  containerTaxaDiv.appendChild(containerTaxa);

  containerSubTotalDiv.appendChild(containerTaxaDiv);
  containerCarrinho.appendChild(containerSubTotalDiv);

  const dividerCarrinho2 = document.createElement("div");
  dividerCarrinho2.className = "w-11/12 mx-auto h-[1.60px] bg-gray-500";
  containerCarrinho.appendChild(dividerCarrinho2);

  const containerTotalDiv = document.createElement("div");
  containerTotalDiv.className =
    "w-11/12 mx-auto flex justify-between mt-4 pb-4 items-center";

  const moeda = document.createElement("span");
  moeda.className = "text-zinc-600 text-xs font-semibold tracking-wide";
  const pTotal = document.createElement("p");
  pTotal.className = "text-gray-800 text-xs font-semibold tracking-wide";
  pTotal.textContent = `Total ${(moeda.textContent = "(R$)")}`;

  const pTotalValor = document.createElement("p");
  pTotalValor.id = "p-total-pagamento";
  pTotalValor.className = "text-right text-orange-600 text-lg font-extrabold";

  containerTotalDiv.appendChild(pTotal);
  containerTotalDiv.appendChild(pTotalValor);

  containerCarrinho.appendChild(containerTotalDiv);

  carrinhoCard.appendChild(containerCarrinho);
}

function renderProdutosCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  const pTaxaEntrega = document.getElementById("p-taxa");
  const pSubTotal = document.getElementById("p-subtotal");
  const pTotalPagemento = document.getElementById("p-total-pagamento");
  const sectionLanches = document.getElementById("section-lanches");

  let subtotal = 0;

  carrinho.forEach((lanches) => {
    const trLanche = document.createElement("tr");
    trLanche.className = "flex justify-between pt-2 pb-3 mx-5";

    const tdSelectLanches = document.createElement("td");
    tdSelectLanches.className = "flex items-center";

    const inputLanche = document.createElement("input");
    inputLanche.onchange = "quantidadeExcluirLanche()";
    inputLanche.id = "input-lanche";
    inputLanche.type = "checkbox";
    inputLanche.className =
      "appearance-none w-5 h-5 bg-white rounded-md border border-orange-600 checked:bg-orange-600 checked:bg-[url('../iconsFood/item_marcado.svg')] bg-center transition duration-200";

    const lableLanche = document.createElement("label");
    lableLanche.className = "text-gray-800 text-xs font-semibold ml-2";
    lableLanche.textContent = `${lanches.nome}  ${lanches.tamanho}`;

    tdSelectLanches.appendChild(inputLanche);
    tdSelectLanches.appendChild(lableLanche);
    trLanche.appendChild(tdSelectLanches);

    const tdquantidadeLanche = document.createElement("td");
    tdquantidadeLanche.className = "text-gray-800 text-xs font-semibold";
    tdquantidadeLanche.textContent = lanches.quantidade;

    trLanche.appendChild(tdquantidadeLanche);

    const tdprecoLanche = document.createElement("td");
    tdprecoLanche.className = "text-gray-800 text-xs font-semibold";

    const calc = lanches.preco * lanches.quantidade;
    tdprecoLanche.textContent = `R$ ${calc}`;
    trLanche.appendChild(tdprecoLanche);

    subtotal += lanches.preco * lanches.quantidade;

    sectionLanches.appendChild(trLanche);
  });

  pTaxaEntrega.textContent = `R$ ${taxaEntrega}`;

  pSubTotal.textContent = `R$ ${subtotal.toFixed(2)}`;

  let total = subtotal + taxaEntrega;
  pTotalPagemento.textContent = `R$ ${total.toFixed(2)}`;
}

function excluirLanche() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const novosItens = [];

  checkboxes.forEach((checkbox, index) => {
    if (!checkbox.checked) {
      novosItens.push(carrinho[index]);
    }
  });

  localStorage.setItem("carrinho", JSON.stringify(novosItens));

  renderProdutosCarrinho();

  window.location.reload();
}

function carrinhoVazio() {
  const pFirstDiv = document.createElement("div");
  pFirstDiv.className = "w-[363px] h-[280px] relative mx-auto mt-4";

  const backGround = document.createElement("div");
  backGround.className =
    "w-[363px] h-[280px] left-0 top-0 absolute bg-yellow-100 border border-orange-600";
  pFirstDiv.appendChild(backGround);

  const pSecondDiv = document.createElement("div");
  pSecondDiv.className =
    "w-[319px] h-[1.60px] left-[22px] top-[189px] absolute bg-gray-500";
  pFirstDiv.appendChild(pSecondDiv);

  const mensagemDiv = document.createElement("div");
  mensagemDiv.className =
    "w-[280px] h-[135px] left-[42px] top-[32px] absolute text-center text-orange-600 text-3xl font-bold fontText";
  mensagemDiv.textContent = "Nenhum Item no Carrinho! :(";
  pFirstDiv.appendChild(mensagemDiv);

  const descricaoDiv = document.createElement("div");
  descricaoDiv.className =
    "w-56 left-[70px] top-[213px] absolute text-center text-black text-[15px] font-semibold fontText";
  descricaoDiv.textContent = "Adicione algo para concluir sua compra.";

  pFirstDiv.appendChild(descricaoDiv);

  carrinhoCard.appendChild(pFirstDiv);
}

function finalizarCompra() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho"));
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let msgPadrao = encodeURIComponent(`Olá, gostaria de fazer um pedido`);
  let pedidos = "";
  let total = 0;
  let itemSelecionado = false;

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      itemSelecionado = true;
      let produto = carrinho[i];
      let {
        nome: produtoName,
        preco: produtoValor,
        quantidade: produtoQuantidade,
      } = produto;
      pedidos += `Nome: ${produtoName} - Qtd: ${produtoQuantidade}\n`;
      total += produtoValor * produtoQuantidade;
    }
  }

  if (itemSelecionado) {
    total = encodeURIComponent(`Total: R$ ${total.toFixed(2)}`);
    pedidos = encodeURIComponent(pedidos);
    let linkWhats = `https://wa.me/5586999407146?text=${msgPadrao}%0A${pedidos}%0A${total}`;
    excluirLanche()
    window.open(linkWhats);
  } else {
    alert("Selecione pelo menos um item para concluir sua compra.");
  }
}
