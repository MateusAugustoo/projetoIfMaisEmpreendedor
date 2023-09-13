const firebaseConfig = {
  apiKey: "AIzaSyB_4mFz4i20ABV2MP9J5fN13cpafVhFIvI",
  authDomain: "ifmaisempreendedor-e50d0.firebaseapp.com",
  projectId: "ifmaisempreendedor-e50d0",
  storageBucket: "ifmaisempreendedor-e50d0.appspot.com",
  messagingSenderId: "62134980077",
  appId: "1:62134980077:web:1dab28b6b12daaa24bebe4"
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
