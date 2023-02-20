import {
  sharePost, onGetPosts, getPosts, deletePost, getPost, updatePost,
} from '../lib/firebase.js';
import { ModalEliminar, modalEditar } from './modal.js';

export const Wall = (onNavigate) => {
  // :::.. creación de elementos..::://

  // const elementoswall = document.getElementById('elementoswall');
  const elementoswall = document.createElement('div');

  // menu
  const containerHeader = document.createElement('section');
  const iconMenu = document.createElement('img');
  const nombreSocialNetwork = document.createElement('p');
  const search = document.createElement('input');
  const iconNotificaciones = document.createElement('img');
  const menuDisplayed = document.createElement('div');

  // publicaciones del usuario
  const containerPublicaciones = document.createElement('section');
  const fotoPerfil = document.createElement('img');
  const postUsuario = document.createElement('textarea');
  const messageError = document.createElement('p');
  const publicarButton = document.createElement('button');
  const errorPostVacio = document.createElement('p');

  // publicaciones de toda la comunidad plants lovers
  const containerTodasLasPublicaciones = document.createElement('section');

  // ::.. añadiendo clase..:://
  elementoswall.className = 'containerwall';
  containerHeader.className = 'containerHeader';
  iconMenu.className = 'icon-menu';
  iconMenu.src = 'https://i.postimg.cc/gJGfXyD1/menu-icon-8.png';
  nombreSocialNetwork.textContent = 'Like Plants';
  nombreSocialNetwork.className = 'LikePlants';
  search.className = 'search';
  search.placeholder = '\u{1F50D} Search';
  iconNotificaciones.className = 'icon-notificaciones';
  iconNotificaciones.src = '\\imagenes\\planta.png';
  menuDisplayed.className = 'menu-desplegable';
  menuDisplayed.id = 'menu-desplegable-id';

  containerPublicaciones.className = 'containerPublicaciones';
  fotoPerfil.src = '\\imagenes\\fotoperfil.jfif';
  fotoPerfil.className = 'fotoPerfil';
  postUsuario.placeholder = 'Comparte con la comunidad PlantsLovers';
  postUsuario.className = 'postUsuario';
  messageError.className = 'alerta';
  publicarButton.className = 'publicarButton';
  publicarButton.textContent = 'Publicar';
  postUsuario.id = 'postUsuario';
  errorPostVacio.className = 'alerta';
  errorPostVacio.id = 'errorPostVacio';

  // Para editar
  let id = '';

  containerTodasLasPublicaciones.className = 'containerTodasPublicaciones';

  // añadiendo hijos
  elementoswall.append(
    containerHeader,
    menuDisplayed,
    containerPublicaciones,
    containerTodasLasPublicaciones,
  );

  containerHeader.append(iconMenu, nombreSocialNetwork, search, iconNotificaciones);

  containerPublicaciones.append(fotoPerfil, postUsuario, messageError, publicarButton);

  // Menú hambuguesa
  iconMenu.addEventListener('click', () => {
    menuDisplayed.style.display = 'flex';
    const options = `<nav class='menu-nav'>
    <li><a class='option' id='option1'>Mi Perfil</a></li>
    <li><a class='option' id='option2'>Mis grupos</a></li>
    <li><a class='option' id='option3'>Cerrar Sesión</a></li>
    <img src='https://i.postimg.cc/mg8dpxNp/icon-close.png' alt='close' class='close-button' id='close-button'>
    </nav>`;
    menuDisplayed.innerHTML = options;
    /* Al dar click a el icono cerrar */
    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', () => {
      menuDisplayed.style.display = 'none';
    });
  });

  // Publicar cada uno de los post que hay en la base de datos
  // querySnapshot es para traer los datos que existe en este momento
  onGetPosts((callback) => {
    while (containerTodasLasPublicaciones.firstChild) {
      containerTodasLasPublicaciones.removeChild(containerTodasLasPublicaciones.firstChild);
    }

    callback.forEach((doc) => {
      console.log({ doc });
      const post = doc.data();
      const containerCadaPost = document.createElement('div');
      containerCadaPost.className = 'containerCadaPost';
      containerCadaPost.innerHTML += `
                  <p>${post.post}</p>
                  <div class= 'contenedorIconos'> 
                  <button class='class-like' >${'\u{1F49A}'}</button>
                  <button class='btn-delete' id= '${doc.id}'>${'🗑️'}</button>
                  <button class='class-edit' id= '${doc.id}'>${'🖍️'}</button>
                  </div>`;

      containerTodasLasPublicaciones.appendChild(containerCadaPost);
    });

    // boton eliminar post
    const btnsDelete = containerTodasLasPublicaciones.querySelectorAll('.btn-delete');

    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target }) => {
        const modal = ModalEliminar();
        console.log('modal: ', modal.querySelector('#btn-confirm-delete'));

        // Abre el modal
        modal.style.display = 'flex';

        const confirmDeleteBtn = modal.querySelector('#btn-confirm-delete');

        confirmDeleteBtn.addEventListener('click', () => {
          deletePost(target.id);

          // Cierra el modal
          modal.style.display = 'none';
        });

        // Se agrega listener para cancelar
        const cancelBtn = modal.querySelector('#btn-cancel-delete');
        cancelBtn.addEventListener('click', () => {
          modal.style.display = 'none';
        });
        containerTodasLasPublicaciones.append(modal);
      });
    });

    // boton editar post
    const btnEdit = containerTodasLasPublicaciones.querySelectorAll('.class-edit');

    btnEdit.forEach((btn) => {
      btn.addEventListener('click', async ({ target }) => {
        const modal = modalEditar();

        // Abre el modal
        modal.style.display = 'flex';

        const doc = await getPost(target.id);
        const post = doc.data();

        modal.querySelector('#newPost').value = post.post;

        const confirmEditBtn = modal.querySelector('#btn-confirm-edit');

        // Para actulizar el post
        confirmEditBtn.addEventListener('click', () => {
          const postNuevo = modal.querySelector('#newPost');
          id = target.id;
          updatePost(id, { post: postNuevo.value });
        });

        // Se agrega listener para cancelar
        const cancelEditBtn = modal.querySelector('#btn-cancel-edit');
        cancelEditBtn.addEventListener('click', () => {
          modal.style.display = 'none';
        });

        containerTodasLasPublicaciones.append(modal);
      });
    });
  });

  // Guarda post en la base de datos
  publicarButton.addEventListener('click', (e) => {
    e.preventDefault();

    const post = document.getElementById('postUsuario');
    console.log('post: ', post);

    if (post.value === '') {
      messageError.innerHTML = 'Escribe algo';
    } else {
      sharePost(post.value);
      document.getElementById('postUsuario').value = '';
    }
  });

  return elementoswall;
};
