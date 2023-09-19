const firebaseConfig = {
  apiKey: "AIzaSyAAMYwMahCex-tSp-g7eEW5uENub_EmvMU",
  authDomain: "ifmaisempreendedorangica-4cab5.firebaseapp.com",
  projectId: "ifmaisempreendedorangica-4cab5",
  storageBucket: "ifmaisempreendedorangica-4cab5.appspot.com",
  messagingSenderId: "971295144283",
  appId: "1:971295144283:web:35965497f0a0fe43b6427e",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const form = document.querySelector("form#formRedefinir");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("input[name='email']").value;
  if (email.empty) {
    alert("Erro, informe um email.");
  } else {
    auth
      .sendPasswordResetEmail(email)
      .then((_) => {
        alert("Email enviado com sucesso.");
        window.location.href = "../pagesLoginCadastro/login.html";
      })
      .catch((error) => {
        alert("Erro, email não cadastrado.");
        form.reset();
      });
  }
});
