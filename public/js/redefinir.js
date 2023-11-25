firebase.initializeApp(window.firebaseConfig);

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
