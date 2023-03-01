import { storage, saveFiles, logOut } from '../lib/firebase.js';

export const Profile = (onNavigate) => {
  const elementoswall = document.createElement('div');

  // menu
  const containerHeader = document.createElement('section');
  const iconMenu = document.createElement('img');
  const nombreSocialNetwork = document.createElement('p');
  const search = document.createElement('input');
  const iconNotificaciones = document.createElement('img');
  const menuDisplayed = document.createElement('div');

  // ::.. añadiendo clase..:://
  elementoswall.className = 'containerwall';
  containerHeader.className = 'containerHeader';
  iconMenu.className = 'icon-menu';
  iconMenu.src = 'https://i.postimg.cc/gJGfXyD1/menu-icon-8.png';
  nombreSocialNetwork.textContent = 'Like Plants';
  nombreSocialNetwork.className = 'LikePlants';
  nombreSocialNetwork.id = 'nombreSocialNetwork';
  search.className = 'search';
  search.placeholder = '\u{1F50D} Search';
  iconNotificaciones.className = 'icon-notificaciones';
  iconNotificaciones.src = 'https://i.postimg.cc/wjKz2JSD/planta.png';
  menuDisplayed.className = 'menu-desplegable';
  menuDisplayed.id = 'menu-desplegable-id';

  const contenedor = document.createElement('div');
  contenedor.setAttribute('class', 'contenedor');
  contenedor.id = 'viewconteiner';

  const fotoPerfil = document.createElement('img');

  const inputPerfil = document.createElement('input');
  // fotoPerfil.setAttribute('class', 'fotoPerfil');
  inputPerfil.setAttribute('type', 'file');
  inputPerfil.id = 'avatar';
  inputPerfil.setAttribute('accept', 'image/png, image/jpeg');

  // Menú hambuguesa
  iconMenu.addEventListener('click', () => {
    menuDisplayed.style.display = 'flex';
    const options = `<nav class='menu-nav'>
    <li><a class='option' id='option1'>Mi Perfil</a></li>
    <li><a href='https://angiecombita.my.canva.site/likeplantslocalhost' class='option' id='option2'>Guía de plantas</a></li>
    <li><a class='option' id='option3'>Cerrar Sesión</a></li>
    <img src='https://i.postimg.cc/mg8dpxNp/icon-close.png' alt='close' class='close-button' id='close-button'>
    </nav>`;
    menuDisplayed.innerHTML = options;
    /* Al dar click a el icono cerrar */
    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', () => {
      menuDisplayed.style.display = 'none';
    });
    const miPerfil = document.getElementById('option1');
    miPerfil.addEventListener('click', () => onNavigate('/profile'));

    const cerrarSesion = document.getElementById('option3');
    cerrarSesion.addEventListener('click', () => {
      logOut().then(() => {
        // Sign-out successful.
        alert('Cierre de sesión exitoso');
        onNavigate('/login');
      })
        .catch(() => {
          alert('Algo paso');
        });
    });
  });

  inputPerfil.addEventListener('change', () => {
    inputPerfil.files[0], inputPerfil.files[0];
    // const url = await readURL(inputPerfil.files[0]);
    // fotoPerfil.src = url;
    inputPerfil.classList.add('obj');
    inputPerfil.file = inputPerfil.files[0];
    console.log(inputPerfil.files);

    saveFiles(inputPerfil.file, inputPerfil.file.name).then((r) => alert('Guardado correctamente'));
  });

  // Para regresar al muro
  nombreSocialNetwork.addEventListener('click', () => onNavigate('/wall'));

  containerHeader.append(iconMenu, nombreSocialNetwork, search, iconNotificaciones);

  contenedor.append(containerHeader, fotoPerfil, inputPerfil);

  elementoswall.append(menuDisplayed, containerHeader, contenedor);

  return elementoswall;
};
