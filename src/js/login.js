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
