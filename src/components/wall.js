import {
  savePost, onGetPosts, deletePost, getPost, updatePost, getUser, toLike, toDislike, logOut,
} from '../lib/firebase.js';
import { ModalEliminar, modalEditar } from './modal.js';

export const Wall = (onNavigate) => {
  // ejecutar

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
  const contenedorBoton = document.createElement('div');
  const publicarButton = document.createElement('button');

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
  iconNotificaciones.src = 'https://i.postimg.cc/wjKz2JSD/planta.png';
  menuDisplayed.className = 'menu-desplegable';
  menuDisplayed.id = 'menu-desplegable-id';

  containerPublicaciones.className = 'containerPublicaciones';

  const usuario = JSON.parse(localStorage.getItem('user'));
  // const usuario2 = JSON.parse(localStorage.getItem('user2'));
  fotoPerfil.src = usuario ? usuario.photoURL : 'https://i.postimg.cc/fy6ZRsgH/profile.jpg';
  const currentUser = usuario.uid;
  console.log('current: ', currentUser);

  fotoPerfil.className = 'fotoPerfil';
  postUsuario.placeholder = 'Comparte con la comunidad PlantsLovers';
  postUsuario.className = 'postUsuario';
  messageError.className = 'alerta';
  contenedorBoton.className = 'contenedorBoton';
  publicarButton.className = 'publicarButton';
  publicarButton.textContent = 'Publicar';
  postUsuario.id = 'postUsuario';

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
  contenedorBoton.append(publicarButton);

  containerPublicaciones.append(fotoPerfil, postUsuario, messageError, contenedorBoton);

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
        localStorage.removeItem('user');
        alert('Cierre de sesión exitoso');
        onNavigate('/');
      })
        .catch(() => {
          alert('Algo paso');
        });
    });
  });

  // Publicar cada uno de los post que hay en la base de datos
  // querySnapshot es para traer los datos que existe en este momento
  onGetPosts((resultado) => {
    while (containerTodasLasPublicaciones.firstChild) {
      containerTodasLasPublicaciones.removeChild(containerTodasLasPublicaciones.firstChild);
    }

    resultado.forEach((doc) => {
      // console.log({ doc });
      const post = doc.data();
      //  console.log('post: ', post);
      let counterLikes = '';
      // const counterLikes = post.likes.length;
      const idOwnerPost = post.idu;
      // console.log('idOwner: ', idOwnerPost);

      if (post.likes.length > 0) {
        // counterLikes = post.likes.length;
        counterLikes = `${post.likes.length}`;
      }

      console.log('counterLikes: ', counterLikes);
      const containerCadaPost = document.createElement('div');
      containerCadaPost.className = 'containerCadaPost';

      if (currentUser === idOwnerPost) {
        if (counterLikes > 0) {
          containerCadaPost.innerHTML += `
                  <p class= 'class-name'>${post.nombre}</p><br>
                  <p class= 'class-post'>${post.post}</p> 
                  <div class= 'contenedorIconos'>  
                  <button class='class-like class-like-mayor' id= '${doc.id}'>${'\u{1F49A}'}</button>
                  <p class='counterLikes' id='counterLikes'>${counterLikes} me gusta</p>
                  <button class='btn-delete' id= '${doc.id}'>${'🗑️'} </button>
                  <button class='class-edit' id= '${doc.id}'>${'🖍️'}</button>
                  </div>`;
        } else {
          containerCadaPost.innerHTML += `
                  <p class= 'class-name'>${post.nombre}</p><br>
                  <p class= 'class-post'>${post.post}</p> 
                  <div class= 'contenedorIconos'>  
                  <button class='class-like' id= '${doc.id}'>${'\u{1F49A}'}</button>
                  <p class='counterLikes' id='counterLikes'>${counterLikes} me gusta</p>
                  <button class='btn-delete' id= '${doc.id}'>${'🗑️'} </button>
                  <button class='class-edit' id= '${doc.id}'>${'🖍️'}</button>
                  </div>`;
        }
      } else if (counterLikes > 0) {
        containerCadaPost.innerHTML += `
            <p class= 'class-name'>${post.nombre}</p><br>
            <p class= 'class-post'>${post.post}</p> 
            <div class= 'contenedorIconos'>  
            <button class='class-like class-like-mayor' id= '${doc.id}'>${'\u{1F49A}'}</button>
            <p class='counterLikes' id='counterLikes'>${counterLikes} me gusta</p>
            </div>`;
      } else {
        containerCadaPost.innerHTML += `
            <p class= 'class-name'>${post.nombre}</p><br>
            <p class= 'class-post'>${post.post}</p> 
            <div class= 'contenedorIconos'>  
            <button class='class-like' id= '${doc.id}'>${'\u{1F49A}'}</button>
            <p class='counterLikes' id='counterLikes'>${counterLikes} me gusta</p>
            </div>`;
      }
      containerTodasLasPublicaciones.appendChild(containerCadaPost);
    });

    // boton eliminar post
    const btnsDelete = containerTodasLasPublicaciones.querySelectorAll('.btn-delete');

    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target }) => {
        const modal = ModalEliminar();

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

    // boton para dar like
    const btnLike = containerTodasLasPublicaciones.querySelectorAll('.class-like');

    btnLike.forEach((btn) => {
      btn.addEventListener('click', async ({ target }) => {
        const doc = await getPost(target.id);
        console.log('doc: ', doc);
        const post = doc.data();
        console.log('current: ', currentUser);
        id = target.id;
        if (post.likes.includes(currentUser)) {
          toDislike(id, currentUser);
        } else {
          toLike(id, currentUser);
        }
      });
    });
  });

  // resolver promesa de función obtener datos del usuario
  // getUserInfo(userID).then((respuesta) => {
  //   fotoPerfil.src = respuesta.photoURL;
  // });

  // Guarda post en la base de datos
  publicarButton.addEventListener('click', (e) => {
    e.preventDefault();

    const post = document.getElementById('postUsuario');
    // console.log('post: ', post);

    if (post.value === '') {
      messageError.innerHTML = 'Escribe algo';
    } else {
      savePost(usuario, post.value);
      console.log('usuario: ', usuario);
      document.getElementById('postUsuario').value = '';
    }
  });

  return elementoswall;
};
