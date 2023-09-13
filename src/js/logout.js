const firebaseConfig = {
  apiKey: "AIzaSyAAMYwMahCex-tSp-g7eEW5uENub_EmvMU",
  authDomain: "ifmaisempreendedorangica-4cab5.firebaseapp.com",
  projectId: "ifmaisempreendedorangica-4cab5",
  storageBucket: "ifmaisempreendedorangica-4cab5.appspot.com",
  messagingSenderId: "971295144283",
  appId: "1:971295144283:web:35965497f0a0fe43b6427e"
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
