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
