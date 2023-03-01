import { GoogleAuthProvider } from 'firebase/auth';

import
{
  login,
  loginWithGoogle, crearDocumentoUsuario,
} from '../lib/firebase';

export const Login = (onNavigate) => {
  const main = document.createElement('main');
  main.setAttribute('class', 'contenedor');

  const imageLogo = document.createElement('img');
  imageLogo.src = 'https://i.postimg.cc/yYS4cYYJ/logo.png';
  imageLogo.setAttribute('class', 'imagen');

  const formulario = document.createElement('form');
  formulario.setAttribute('class', 'login');

  const email = document.createElement('input');
  email.placeholder = 'Email';
  email.setAttribute('class', 'box');
  email.type = 'text';
  email.required = 'true';
  email.autocomplete = 'email';

  const password = document.createElement('input');
  password.placeholder = 'contraseña';
  password.setAttribute('class', 'box');
  password.type = 'password';
  password.required = 'true';
  password.autocomplete = 'current-password';

  const errorMessage = document.createElement('p');
  errorMessage.setAttribute('class', 'alerta');
  errorMessage.id = 'errorMessage';

  const loginButton = document.createElement('button');
  loginButton.textContent = 'Iniciar Sesión';
  loginButton.setAttribute('class', 'start');
  loginButton.type = 'submit';

  const forgotPassword = document.createElement('p');
  forgotPassword.textContent = 'Olvidé mi contraseña';
  forgotPassword.setAttribute('class', 'preguntaPassword');

  const GoogleButton = document.createElement('button');
  GoogleButton.innerHTML = '<i class="fa-brands fa-google"></i>  Inicia sesión con Google';
  GoogleButton.setAttribute('class', 'google');
  GoogleButton.id = 'googleLogin';

  const registerButton = document.createElement('button');
  registerButton.textContent = 'Registrate';
  registerButton.setAttribute('class', 'start');
  registerButton.type = 'submit';

  formulario.append(
    email,
    password,
    errorMessage,
    loginButton,
    forgotPassword,
    GoogleButton,
    registerButton,
  );
  main.append(imageLogo, formulario);

  registerButton.addEventListener('click', () => {
    onNavigate('/register');
  });

  // const botonGoogle = document.querySelector('#googleLogin');
  GoogleButton.addEventListener('click', (e) => {
    e.preventDefault();

    const userGoogle = loginWithGoogle();
    userGoogle.then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log('token: ', token);

      const user = result.user;
      console.log('user: ', user);
      localStorage.setItem('user', JSON.stringify(user));

      crearDocumentoUsuario(user, user.displayName, user.photoURL);

      // IdP data available using getAdditionalUserInfo(result)
      onNavigate('/wall');
    });
  });

  loginButton.addEventListener('click', (e) => {
    e.preventDefault(); // No recargue la página
    const userLogin = login(email.value, password.value);
    userLogin.then((userCredential) => {
      // Login
      const user = userCredential.user;
      // eslint-disable-next-line no-console
      console.log('user: ', user);
      // eslint-disable-next-line no-alert
      localStorage.setItem('user2', JSON.stringify(user));
      onNavigate('/wall');
    })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          errorMessage.innerHTML = 'Contraseña incorrecta';
        }
        if (errorCode === 'auth/invalid-email') {
          errorMessage.innerHTML = 'Ingresa un correo electrónico válido';
        }
        if (errorCode === 'auth/internal-error') {
          errorMessage.innerHTML = 'Ingresa la contraseña';
        }

        if (errorCode === 'auth/user-not-found') {
          errorMessage.innerHTML = 'El correo electrónico ingresado no ha sido registrado';
        }
        console.log('errorCode: ', errorCode);
        const errorMessage1 = error.message;
        console.log('errorMessage: ', errorMessage1);
        // eslint-disable-next-line no-alert
      });
  });

  return main;
}; // ok
