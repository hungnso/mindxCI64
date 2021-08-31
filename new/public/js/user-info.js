const userInfo = document.querySelector(".user-info");

console.log(userInfo);

firebase.auth().onAuthStateChanged((user) => {
  const img = user.photoURL;
  if (user) {
    userInfo.innerHTML = `
    <div class="user-img">
    <img src=${img} alt="">
    </div>
<div class="user-details">
    <div class="name">${user.displayName}</div>
    <button class="logout-btn">Log out</button>
</div>
   `;
    // ...
    //   } else if (!user) {
    //     userInfo.innerHTML = `
    //    <!-- <div class="user-img">
    //    <img src="https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="">
    // </div>
    // <div class="user-details">
    //    <div class="name">Have an account?</div>
    //    <button class="login-btn">Log in now</button>
    // </div>
  }
  const btnLogout = document.querySelector(".logout-btn");
  console.log(btnLogout);

  btnLogout.addEventListener("click", handleLogout);

  function handleLogout() {
    firebase.auth().signOut();
    window.location.href = "./homepage.html";
  }
});
