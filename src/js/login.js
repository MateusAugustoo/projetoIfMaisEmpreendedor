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


//Login via Email e Senha 
const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector('[name="emailLogin"]').value;
  const senha = document.querySelector('[name="senhaLogin"]').value;

  auth
    .signInWithEmailAndPassword(email, senha)
    .then(() => {
      window.location.href = "../screens/home.html";
    })
    .catch(() => {
      alert("Email ou senha incorretos");
    });
});


//Login Via Google
const google = document.getElementById("google");
const provider = new firebase.auth.GoogleAuthProvider();

google.onclick = () => {
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    window.location.href = "../screens/home.html";
  
  }).catch((error) =>{
    console.log(error);
  })
}



//Login Via Facebook
