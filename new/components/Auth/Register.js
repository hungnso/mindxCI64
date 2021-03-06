import { setScreen } from "../../public/app.js";
import { InputGroup } from "./InputGroup.js";
import { Login } from "./Login.js";
import { LoginGoogle } from "./LoginGoogle.js";

class Register {
  $container;
  $title;
  $desctitle;
  $btnGroupGoogle;
  $divideror;
  $inputGroupEmail;
  $inputGroupFullName;
  $inputGroupPassword;
  $inputGroupConfirmPassWord;

  $form;
  $feedbackmessage;

  $btnSubmit;

  $singuplink;
  $contentspan;
  $linkhrepSingup;

  constructor() {
    this.$container = document.createElement("div");
    this.$container.classList.add("container");

    this.$title = document.createElement("h1");
    this.$title.innerHTML = "Welcome to Quizizz";
    this.$title.classList.add("title");

    this.$desctitle = document.createElement("p");
    this.$desctitle.innerHTML = "Please use your school or work email address";
    this.$desctitle.classList.add("desctitle");

    this.$btnGroupGoogle = new LoginGoogle(
      "https://cf.quizizz.com/img/logos/google-logo-1.png",
      "Continue with Google"
    );

    this.$divideror = document.createElement("span");
    this.$divideror.classList.add("divideror");
    this.$divideror.innerHTML = "-- or --";

    this.$inputGroupEmail = new InputGroup("Email", "email", "email");
    this.$inputGroupFullName = new InputGroup("FullName", "text", "fullname");

    this.$inputGroupPassword = new InputGroup(
      "Password",
      "password",
      "password"
    );
    this.$inputGroupConfirmPassWord = new InputGroup(
      "ConfirmPassword",
      "password",
      "password"
    );

    this.$form = document.createElement("form");
    this.$form.addEventListener("submit", this.handelSubmit);

    this.$feedbackmessage = document.createElement("div");
    this.$feedbackmessage.classList.add("feedbackmessage");

    this.$btnSubmit = document.createElement("button");
    this.$btnSubmit.type = "submit";
    this.$btnSubmit.innerHTML = "Register";
    this.$btnSubmit.classList.add("btn-submit");

    this.$singuplink = document.createElement("div");
    this.$singuplink.classList.add("signup-link");
    this.$contentspan = document.createElement("span");
    this.$contentspan.innerHTML = "Do you have account?";

    this.$linkhrepSingup = document.createElement("span");
    this.$linkhrepSingup.innerHTML = "Login";
    this.$linkhrepSingup.classList.add("linkSignup");

    this.$linkhrepSingup.addEventListener("click", this.moveToLogin);
  }
  moveToLogin = () => {
    const login = new Login();
    setScreen(login);
  };
  handelSubmit = (e) => {
    e.preventDefault();

    const email = this.$inputGroupEmail.getInputValue();
    const fullName = this.$inputGroupFullName.getInputValue();
    const password = this.$inputGroupPassword.getInputValue();
    const confirmPassword = this.$inputGroupConfirmPassWord.getInputValue();

    this.$inputGroupPassword.setError(null);
    this.$inputGroupConfirmPassWord.setError(null);

    if (!email) {
      this.$inputGroupEmail.setError("B???n ch??a nh???p email");
    } else {
      this.$inputGroupEmail.setError(null);
    }
    if (!fullName) {
      this.$inputGroupFullName.setError("B???n ch??a nh???p t??n");
    } else {
      this.$inputGroupFullName.setError(null);
    }
    if (!password) {
      this.$inputGroupPassword.setError("M???t kh???u qu?? ng???n");
    }
    if (password != confirmPassword) {
      this.$inputGroupConfirmPassWord.setError("M???t kh???u kh??ng tr??ng kh???p");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification();
        firebase.auth().currentUser.updateProfile({
          displayName: fullName,
        });
        this.$feedbackmessage.innerHTML = "????ng k?? th??nh c??ng";
        window.location.href = "./login.html";
        // this.$inputGroupEmail.setInputValue("");
      })
      .catch((error) => {
        this.$feedbackmessage.innerHTML = error.toString();
      });
  };

  render() {
    this.$container.appendChild(this.$title);
    this.$container.appendChild(this.$desctitle);
    this.$container.appendChild(this.$btnGroupGoogle.render());

    this.$container.appendChild(this.$divideror);
    this.$form.appendChild(this.$inputGroupEmail.render());
    this.$form.appendChild(this.$inputGroupFullName.render());
    this.$form.appendChild(this.$inputGroupPassword.render());
    this.$form.appendChild(this.$inputGroupConfirmPassWord.render());
    this.$form.appendChild(this.$btnSubmit);
    this.$container.appendChild(this.$form);

    this.$container.appendChild(this.$feedbackmessage);

    this.$singuplink.appendChild(this.$contentspan);
    this.$singuplink.appendChild(this.$linkhrepSingup);

    this.$container.appendChild(this.$singuplink);

    return this.$container;
  }
}
export { Register };
