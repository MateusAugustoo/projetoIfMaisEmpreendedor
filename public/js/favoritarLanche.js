function authUserFavoritos() {
    const params = new URLSearchParams(window.location.search);
    const lancheId = params.get('lancheId');
    const collectionName = params.get('collectionName');

    const favoritarButton = document.getElementById('favoritar');
    const pathElement = favoritarButton.querySelectorAll('path');

    auth.onAuthStateChanged((user) => {
        if (user) {
            favoritarButton.addEventListener('click', () => {
                const userId = user.uid;
                adicionarLancheAoFavorito(userId, lancheId, collectionName)
                    .then(() => {
                        pathElement.forEach(pathElement => {
                            pathElement.setAttribute('fill', 'red');
                        });
                        alert('Lanche adicionado aos favoritos!');
                    })
                    .catch((erro) => {
                        alert('Erro ao adicionar lanche aos favoritos!' + erro);
                    });
            });
        }
    });
}; authUserFavoritos();

function adicionarLancheAoFavorito(userId, lancheId, collectionName) {
    const favoritosRef = db.collection('Favoritos').doc(userId);

    return favoritosRef.get()
        .then((doc) => {
            if (doc.exists) {
                const favoritosData = doc.data();

                if (!favoritosData.lanches.includes(lancheId)) {
                    favoritosData.lanches.push(lancheId);
                }

                return favoritosRef.update({
                    lanches: favoritosData.lanches
                });
            } else {
                const novosFavoritos = {
                    lanches: [lancheId]
                };

                return favoritosRef.set(novosFavoritos);
            }
        });
}