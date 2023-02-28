// aqui exportaras las funciones que necesites

// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, updateProfile, signOut,
} from 'firebase/auth';

import {
  getFirestore, collection, addDoc, getDocs, onSnapshot,
  deleteDoc, doc, query, orderBy, serverTimestamp, getDoc, updateDoc, setDoc,
  arrayUnion, arrayRemove,
} from 'firebase/firestore';

import {
  getDownloadURL, getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';

// Enlazamos visual con firebase

const firebaseConfig = {
  apiKey: 'AIzaSyAXa8j4Ybc510kv68WeHddFaKFWOXkqhsM',
  authDomain: 'likeplants-bc662.firebaseapp.com',
  projectId: 'likeplants-bc662',
  storageBucket: 'likeplants-bc662.appspot.com',
  messagingSenderId: '1094663123741',
  appId: '1:1094663123741:web:439a81d9b80773221527f4',
  measurementId: 'G-LX9KPQYCP0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Crear nueva cuenta pasando la dirección de correo electrónico y la contraseña del nuevo usuario
export const auth = getAuth(app); // constante para poder autenticar usuarios

export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

// login con boton google
const provider = new GoogleAuthProvider(); // instancia del objeto de proveedor de Google
export const loginWithGoogle = () => signInWithPopup(auth, provider);

const db = getFirestore(app); // conexion a la base de datos

export const crearDocumentoUsuario = (usuario, nombre, foto) => setDoc(doc(db, 'users', usuario.uid), {
  id: usuario.uid,
  nombre,
  email: usuario.email,
  photoURL: foto,
});

const colRef = collection(db, 'posts');

// arreglo de id de usuario para likes
export const likes = [];

export const savePost = (usuario, text) => {
  // la funcion addDoc agrega documento a la colleccion de Firebase que llamamos posts
  addDoc(colRef, {
    idu: usuario.uid,
    nombre: usuario.displayName ? usuario.displayName : usuario.email,
    post: text,
    likes,
    createdAt: serverTimestamp(),
  });
};

// Busca dentro de la colección post y los ordena por fecha de publicación de forma descendente
const queryInstruction = query(colRef, orderBy('createdAt', 'desc'));

// la funcion getDocs es para obtener documentos
export const getPosts = () => {
  getDocs(doc(db, 'posts'));
};

// Función para mostrar todos los posts
export const onGetPosts = (callback) => {
  onSnapshot(queryInstruction, callback);
};

// doc busca 1 documento, de la coleccion posts y me elimina el id usando la funcion deleteDoc
export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

// Trae la información de un post
export const getPost = (id) => getDoc(doc(db, 'posts', id));

// Trae la información de usuario
export const getUser = (id) => getDoc(doc(db, 'users', id));

// export const getUserInfo = (userID) => getDoc(doc(db, 'users', userID));

// Función para actualizar la informacion del post
export const updatePost = (id, newInfo) => updateDoc(doc(db, 'posts', id), newInfo);

// Editar foto
export const storage = getStorage(app);

export const saveFiles = (file, filename) => new Promise((resolve) => {
  const storageref = ref(storage, `/files/${filename}`);
  const upload = uploadBytesResumable(storageref, file);
  upload.on('state_changed', () => { }, () => { }, () => {
    getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
      // aqui tienen que hacer update dopc de la base de usuarios
      updateProfile(auth.currentUser, { photoURL: downloadURL });
      console.log('File available at', downloadURL);
      resolve(downloadURL);
      console.log(auth.currentUser);
    });
  });
});

export const toLike = (id, idu) => updateDoc(doc(db, 'posts', id), {
  likes: arrayUnion(idu),
});

export const toDislike = (id, idu) => updateDoc(doc(db, 'posts', id), {
  likes: arrayRemove(idu),
});

// cerrar sesion
export const logOut = () => signOut(auth);
