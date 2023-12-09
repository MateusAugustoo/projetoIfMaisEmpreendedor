firebase.initializeApp(window.firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
auth.onAuthStateChanged(async function (user) {
  if (user) {
    const userId = user.uid;
    const favoritoRef = db.collection("Favoritos").doc(userId);

    try {
      const doc = await favoritoRef.get();
      if (doc.exists) {
        const favoritosData = doc.data();
        const favoritos = favoritosData.lanches;

        renderizarFavoritos(favoritos);
      }
    } catch (error) {
      console.error(error);
    }
  }
});

async function renderizarFavoritos(favoritos) {
  const sectionFavorita = document.getElementById("sectionFavoritos");
  const tiposLanche = ["Pizza", "Hamburguer", "Doces"];

  for (const lancheId of favoritos) {
    const promises = tiposLanche.map(tipo => db.collection(tipo).doc(lancheId).get());
    try {
      const docs = await Promise.all(promises);
      docs.forEach((doc, index) => {
        if (doc.exists) {
          const tipo = tiposLanche[index];
          const lancheElement = criarElement(doc);

          lancheElement.addEventListener("click", () => {
            window.location.href = `../pagesProdutos/${tipo.toLowerCase()}/detalhes${tipo}.html?lancheId=${lancheId}`;
          });

          sectionFavorita.appendChild(lancheElement);
        }
      });
    } catch (error) {
      console.error(`Erro ao buscar lanche com ID ${lancheId}: `, error);
    }
  }
}

function criarElement(doc) {
  const lancheData = doc.data();

  const LancheElement = document.createElement("div");
  LancheElement.className = "w-[333px] h-[142px] relative mx-8 mt-5 mx-auto";

  const LancheBackground = document.createElement("div");
  LancheBackground.className =
    "w-[333px] h-[142px] left-0 top-0 absolute bg-white rounded-[20px] shadow";
  LancheElement.appendChild(LancheBackground);

  const LancheCircle = document.createElement("div");
  LancheCircle.className =
    "w-[142.86px] h-[142px] flex justify-center items-center left-[190.14px] top-0 absolute bg-orange-600 rounded-[20px]";

  const LancheImg = document.createElement("img");
  LancheImg.className =
    "flex justify-center items-center relative w-36 mx-auto mt-5";
  LancheImg.src = lancheData.imgPath;

  LancheCircle.appendChild(LancheImg);

  LancheElement.appendChild(LancheCircle);

  const LanchePrice = document.createElement("div");
  LanchePrice.className =
    "w-[90.47px] left-[14.08px] top-[108px] absolute text-center";
  LancheElement.appendChild(LanchePrice);

  const LancheFlavor = document.createElement("div");
  LancheFlavor.className =
    "w-auto left-[22.13px] top-[15px] absolute text-orange-600 text-xl font-semibold fontText";
  LancheFlavor.textContent = lancheData.nome;
  LancheElement.appendChild(LancheFlavor);

  const LancheIngredients = document.createElement("div");
  LancheIngredients.className =
    "w-[134.81px] left-[22.13px] top-[47px] absolute text-zinc-600 text-[8px] font-bold fontText";
  LancheIngredients.textContent = lancheData.ingredientes;
  LancheElement.appendChild(LancheIngredients);
  return LancheElement;
}
