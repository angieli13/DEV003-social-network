import { register, crearDocumentoUsuario } from '../lib/firebase.js';

export const RegisterComponent = (onNavigate) => {
  const contenedor = document.createElement('div');
  contenedor.setAttribute('class', 'contenedor');
  contenedor.id = 'viewconteiner';

  const imageLogo = document.createElement('img');
  imageLogo.src = 'https://i.postimg.cc/yYS4cYYJ/logo.png';
  imageLogo.setAttribute('class', 'imagen');
  contenedor.id = 'imagenlogo';

  const formulario = document.createElement('form');
  formulario.setAttribute('class', 'signin');
  contenedor.id = 'form';

  const inputForEmail = document.createElement('input');
  inputForEmail.placeholder = 'Correo electrónico';
  inputForEmail.type = 'Email';
  inputForEmail.required = 'true';
  inputForEmail.setAttribute('class', 'box');
  inputForEmail.autocomplete = 'email';
  inputForEmail.id = 'inputEmail';

  const inputForPassword = document.createElement('input');
  inputForPassword.placeholder = 'Contraseña';
  inputForPassword.type = 'password';
  inputForPassword.required = 'true';
  inputForPassword.setAttribute('class', 'box');
  inputForPassword.autocomplete = 'new-password';
  inputForPassword.id = 'inputPassword';

  const password2 = document.createElement('input');
  password2.placeholder = 'Confirma contraseña';
  password2.type = 'password';
  password2.required = 'true';
  password2.setAttribute('class', 'box');
  password2.autocomplete = 'new-password';
  password2.id = 'confirmPassword';

  const errorMessage = document.createElement('p');
  errorMessage.setAttribute('class', 'alerta');
  errorMessage.id = 'errorMessage';

  const successMessage = document.createElement('p');
  successMessage.id = 'successMessage';

  const registerButton = document.createElement('button');
  registerButton.textContent = 'Registrar';
  registerButton.setAttribute('class', 'start');
  registerButton.type = 'submit';
  registerButton.id = 'registrar';

  const textoPregunta = document.createElement('p');
  textoPregunta.textContent = '¿Ya tienes cuenta?';
  textoPregunta.setAttribute('class', 'pregunta');
  const botonVolverAlogin = document.createElement('button');
  botonVolverAlogin.setAttribute('class', 'start');
  botonVolverAlogin.textContent = 'Inicia Sesión';

  formulario.append(
    inputForEmail,
    inputForPassword,
    password2,
    errorMessage,
    successMessage,
    registerButton,
    textoPregunta,
    botonVolverAlogin,

  );

  contenedor.append(imageLogo, formulario);

  function validatePassword() {
    const passwordValidate = document.getElementById('inputPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (passwordValidate !== confirmPassword) {
      errorMessage.innerHTML = 'Las contraseñas no coinciden';
      document.getElementById('confirmPassword').value = '';
      return false;
    }
    return true;
  }

  registerButton.addEventListener('click', (e) => { // CAMBIOS!!
    e.preventDefault(); // No recargue la página

    // const functionValidateInputs = validateInputs();
    // console.log('functionValidateInputs: ', functionValidateInputs);
    const functionPassword = validatePassword();

    if (functionPassword === true) {
      // Nuestra promesa es el register que nos deveulve un objeto, que es el userCredential
      const authToken = register(inputForEmail.value, inputForPassword.value);
      // console.log('authToken: ', authToken);

      authToken.then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // eslint-disable-next-line no-console
        console.log('user: ', user);
        // eslint-disable-next-line no-alert
        // localStorage.setItem('user', JSON.stringify(user));
        crearDocumentoUsuario(user, user.email, 'https://i.postimg.cc/fy6ZRsgH/profile.jpg');
        alert('Registro exitoso');
        onNavigate('/login');
      })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/weak-password') {
            errorMessage.innerHTML = 'La contraseña debe contener al menos 6 carácteres';
          }
          if (errorCode === 'auth/missing-email') {
            errorMessage.innerHTML = 'Llena todos los campos';
          }
          if (errorCode === 'auth/invalid-email') {
            errorMessage.innerHTML = 'Ingresa un correo electrónico válido';
          }
          if (errorCode === 'auth/internal-error') {
            errorMessage.innerHTML = 'Ingresa una contraseña';
          }
          if (errorCode === 'auth/email-already-in-use') {
            errorMessage.innerHTML = 'El correo electrónico ingresado ya ha sido registrado';
          }
          // console.log('errorCode: ', errorCode);
          const errorMessageFirebase = error.message;
          console.log('errorMessageFirebase: ', errorMessageFirebase);
        });
    }
  });
  botonVolverAlogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  return contenedor;
};
