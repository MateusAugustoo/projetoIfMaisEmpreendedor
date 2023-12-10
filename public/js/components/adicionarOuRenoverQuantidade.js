function addAndRenoverQuantity() {
    const containerBtns = document.querySelectorAll('[id^="containerBtn"]');

    containerBtns.forEach(containerBtn => {
        const container = document.createElement('div');
        container.className = 'w-full h-full bg-white rounded-2xl shadow-lg flex flex-row justify-around items-center relative';

        const btnAddQuantity = document.createElement('button');
        btnAddQuantity.onclick = renoverQuantidadeLanche;
        btnAddQuantity.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="5" fill="none" viewBox="0 0 23 5">
        <path stroke="#606264" stroke-linecap="round" stroke-width="3.396" d="M2.618 2.5h17.877" />
    </svg>`;

        const containerQuantidade = document.createElement('span');
        containerQuantidade.className = 'text-xl font-bold fontTetxt';
        containerQuantidade.id = 'quantidadeLanche';
        containerQuantidade.textContent = 0;

        const btnRemoveQuantity = document.createElement('button');
        btnRemoveQuantity.onclick = adicionarQuantidadeLanche;
        btnRemoveQuantity.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 23 23">
        <path stroke="#D95A11" stroke-linecap="round" stroke-width="4.075"
            d="M2.686 11.5h17.696m-8.849 8.75V2.75" />
        </svg>`;

        container.appendChild(btnAddQuantity);
        container.appendChild(containerQuantidade);
        container.appendChild(btnRemoveQuantity);

        containerBtn.appendChild(container);
    });
}

addAndRenoverQuantity();

let quantidadeLanche = document.getElementById('quantidadeLanche').textContent = 0;

function adicionarQuantidadeLanche() {
    quantidadeLanche += 1;
    document.getElementById('quantidadeLanche').innerHTML = quantidadeLanche;
}

function renoverQuantidadeLanche() {
    if (quantidadeLanche > 0) {
        quantidadeLanche -= 1;
        document.getElementById('quantidadeLanche').innerHTML = quantidadeLanche;
    }
}