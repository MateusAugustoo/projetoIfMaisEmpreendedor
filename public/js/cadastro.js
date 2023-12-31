firebase.initializeApp(window.firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

  if (!regexEmail.test(email)) {
    alert("Email inválido")
    return
  } else {
    auth.createUserWithEmailAndPassword(email, senha, confiSenha).then((userCredential) => {
      console.log(userCredential)
      formCadastro.reset()
    }).catch((error) => {
      console.log(error)
    })
  }
})