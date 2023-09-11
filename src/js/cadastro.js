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

const formCadastro = document.getElementById("formCadastro");

formCadastro.addEventListener("submit", function(event){
  event.preventDefault()

  const email = document.querySelector('[name="email"]').value;
  const senha = document.querySelector('[name="senha"]').value;
  const confiSenha = document.querySelector('[name="confimaSenha"]').value;

  if (senha !== confiSenha) {
    alert("As senhas não são iguais")
    return
    
  }

  auth.createUserWithEmailAndPassword(email, senha, confiSenha).then((userCredential) => {
    console.log(userCredential)
    formCadastro.reset()
  }).catch((error) => {
    console.log(error)
  })
})
