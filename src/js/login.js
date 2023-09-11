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
