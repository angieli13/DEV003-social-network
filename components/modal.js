export function ModalEliminar() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'deleteModal';

  const innerModal = document.createElement('div');
  innerModal.className = 'contenedor-Modal';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Confirma si quieres eliminar la publicacion';
  titulo.className = 'tituloModal';

  const btnAceptar = document.createElement('button');
  btnAceptar.textContent = 'Aceptar';
  btnAceptar.className = 'Aceptar';
  btnAceptar.id = 'btn-confirm-delete';

  const btnCancelar = document.createElement('button');
  btnCancelar.textContent = 'Cancelar';
  btnCancelar.className = 'Cancelar';
  btnCancelar.id = 'btn-cancel-delete';

  innerModal.append(titulo, btnAceptar, btnCancelar);
  modal.append(innerModal);
  return modal;
}

export function modalEditar() {
  const modalEdit = document.createElement('div');
  modalEdit.className = 'modal';
  modalEdit.id = 'modalEdit';

  const innerModalEdit = document.createElement('div');
  innerModalEdit.className = 'contenedor-Modal';

  const newPost = document.createElement('input');
  newPost.textContent = 'Escribe';
  newPost.id = 'newPost';
  newPost.className = 'postUsuario';

  const btnAceptar = document.createElement('button');
  btnAceptar.textContent = 'Actualizar';
  btnAceptar.className = 'Aceptar';
  btnAceptar.id = 'btn-confirm-edit';

  const btnCancelar = document.createElement('button');
  btnCancelar.textContent = 'Cancelar';
  btnCancelar.className = 'Cancelar';
  btnCancelar.id = 'btn-cancel-edit';

  innerModalEdit.append(newPost, btnAceptar, btnCancelar);
  modalEdit.append(innerModalEdit);
  return modalEdit;
}
