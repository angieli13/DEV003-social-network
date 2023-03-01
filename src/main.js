// Manejo del DOM, se crean las funciones
import { Welcome } from './components/welcome.js';
import { Login } from './components/login.js';
import { RegisterComponent } from './components/register.js';
import { Wall } from './components/wall.js';
import { Profile } from './components/profile.js';


const root = document.getElementById('root');
// Nuestras rutas
const routes = {
  '/': Welcome,
  '/login': Login,
  '/register': RegisterComponent,
  '/wall': Wall,
  '/profile': Profile,
};

const onNavigate = (pathname) => { // es el "/" de cada ruta, nombre de la ruta
  window.history.pushState( // queda registrado el historial en el navegador
    {},
    pathname,
    window.location.origin + pathname, // agrega cada pathname en el navegador
  );
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  // root.removeChild(root.firstChild);
  // const persona = document.getElementById('root');
  // root = root.parentNode.removeChild(persona);
  // const elementos = routes[pathname](onNavigate);
  // const elementoss = document.getElementById('menus');
  // if (routes[pathname] == "Wall"){
  // persona.parentNode.removeChild(persona); // borra la vista al pasar a otra
  // }
  // header.appendChild(elementos.header); // muestra la nueva vista
  // root.appendChild(elementos.root); // muestra la nueva vista
  // footer.appendChild(elementos.footer); // muestra la nueva vista
  root.appendChild(routes[pathname](onNavigate)); // muestra la nueva vista
};

const component = routes[window.location.pathname]; // muestra el html dinámico
root.appendChild(component(onNavigate));
