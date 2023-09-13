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
