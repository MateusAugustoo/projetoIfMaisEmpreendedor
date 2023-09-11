const firebaseConfig = {
  apiKey: "AIzaSyCJ0T4FEr8WLbUR77C0dfDdl-rNSbewusA",
  authDomain: "projetoifmaisempreendedo-d1233.firebaseapp.com",
  projectId: "projetoifmaisempreendedo-d1233",
  storageBucket: "projetoifmaisempreendedo-d1233.appspot.com",
  messagingSenderId: "22411014163",
  appId: "1:22411014163:web:20024d6f5baefb74310fe6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const logout = document.getElementById("logout");
logout.onclick = () => {
  auth
    .signOut()
    .then((result) => {
    console.log(result)
    alert('Logout realizado com sucesso!')
    window.location.href = "../pagesLoginCadastro/login.html";
    })
    .catch((error) => {
      console.log(error);
    });
};
