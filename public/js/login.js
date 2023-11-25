firebase.initializeApp(window.firebaseConfig);

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
      const user = auth.currentUser;
      const userId = user.uid;
      console.log(userId);
      auth.onAuthStateChanged((user) => {
        if (user) {
          window.location.href = `../screens/home.html?uid=${userId}`;
        }
      })
    })
    .catch(() => {
      alert("Email ou senha incorretos");
    });
});


//Login Via Google


//Login Via Facebook
