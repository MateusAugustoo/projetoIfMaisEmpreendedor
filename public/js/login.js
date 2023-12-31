firebase.initializeApp(window.firebaseConfig);

const auth = firebase.auth();

//Login via Email e Senha
const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector('[name="emailLogin"]').value;
  const senha = document.querySelector('[name="senhaLogin"]').value;

  auth.signInWithEmailAndPassword(email, senha).then(() => {
    const user = auth.currentUser;
    const userId = user.uid;
    const userEmail = user.email;
    
    if (userEmail === 'admin@admin.com') {
      window.location.href = `../dashboard/dashboard.adm.html?uid=${userId}`;
    } else {
      window.location.href = `../screens/home.html?uid=${userId}`;
    }
  }).catch(() => {
    alert("Email ou senha incorretos");
  });
});

//Login Via Google
const googleProvider = new firebase.auth.GoogleAuthProvider();
const btnGoogle = document.getElementById("google");
btnGoogle.addEventListener("click", function (event) {
  auth.signInWithRedirect(googleProvider);
});

auth.getRedirectResult(auth).then((_) => {
  const user = auth.currentUser;
  const userId = user.uid;
  console.log(userId);
  auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.href = `../screens/home.html?uid=${userId}`;
    }
  });
});

//logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "../index.html";
  })
}