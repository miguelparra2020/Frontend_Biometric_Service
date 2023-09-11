
//----------------------------Modelo---Fichas-------------------------------

//Función para obtener todas las fichas de la base de datos es un READ - lectura
export async function getFichas() {
    const response = await fetch('https://miguelpaez9612.pythonanywhere.com/fichas/');
    const data = await response.json();
    return data;
}

//del CRUD - fichas
//Created 🆕
//Función para crear una fichas

export async function CreateFicha(fichaData) {
  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/fichas/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fichaData),
  });

  const data = await response.json();
  return data;
}

//del CRUD - fichas
//Read 👀
//Función para obtener todos los datos de lectura de una ficha especifica
export async function getFicha(id) {
    const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/fichas/${id}/`);
    const data = await response.json();
    return data;
}

//del CRUD - fichas
//Updated 😮‍💨
//Función para obtener actualizar todos los datos de una ficha de la base de datos es un Updated 
export async function updateFicha(id, updatedFicha) {
    const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/fichas/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFicha),
    });
  
    const data = await response.json();
    return data;
} 

//del CRUD - fichas
//Delete ❌
//Función para eliminar una ficha según el ID
export async function deleteFicha(id) {
    const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/fichas/${id}/`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Error al eliminar una ficha');
    }
}


//----------------------------Modelo---Ingresos-------------------------------

//Función para obtener todas los ingresos, de la base de datos es un READ - lectura
export async function getIngresos() {
  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/ingresos/');
  const data = await response.json();
  return data;
}

//Función para obtener todas los ingresos, de la base de datos es un READ - lectura
export async function getIngreso(id) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/ingresos/${id}/`);
  const data = await response.json();
  return data;
}

//del CRUD - Ingresos
//Created 🆕
//Función para crear un registro de ingreso

export async function CreateIngreso(ingresoData) {
  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/ingresos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingresoData),
  });

  const data = await response.json();
  return data;
}

//del CRUD - fichas
//Updated 😮‍💨
//Función para obtener actualizar todos los datos de una ficha de la base de datos es un Updated 
export async function updateIngreso(id, updatedIngreso) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/ingresos/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedIngreso),
  });

  const data = await response.json();
  return data;
} 

//del CRUD - fichas
//Delete ❌
//Función para eliminar una ficha según el ID
export async function deleteIngreso(id) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/ingresos/${id}/`, {
    method: 'DELETE',
  });

  if (response.ok) {
    return { success: true };
  } else {
    throw new Error('Error al eliminar una ficha');
  }
}

//----------------------------Modelo---Salidas-------------------------------

//Función para obtener todas las salidas, de la base de datos es un READ - lectura
export async function getSalidas() {
  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/salidas/');
  const data = await response.json();
  return data;
}

//del CRUD - Salida
//Created 🆕
//Función para crear un registro de una salida

export async function CreateSalida(salidaData) {
  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/salidas/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(salidaData),
  });

  const data = await response.json();
  return data;
}


//----------------------------Modelo---Usuario-------------------------------

export async function getUsuario(username) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/users/${username}/`);
  const data = await response.json();
  return data;
}

//del CRUD - usuario
//Created 🆕
//Función para crear un usuario

export async function CreateUsuario(usuarioData) {
  const formData = new FormData();

  // Agrega los campos de usuario al FormData
  formData.append('username', usuarioData.username);
  formData.append('email', usuarioData.email);
  formData.append('first_name', usuarioData.first_name);
  formData.append('last_name', usuarioData.last_name);
  formData.append('ficha', usuarioData.ficha);
  formData.append('tipo_usuario', usuarioData.tipo_usuario);
  formData.append('password', usuarioData.password);

  // Agrega la imagen de perfil al FormData
  if (usuarioData.imagen_perfil) {
    formData.append('imagen_perfil', usuarioData.imagen_perfil);
  }

  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/register/', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  return data;
}



//----------------------------Modelo---Usuarios-------------------------------
export async function getUsuarios() {
  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/users/');
  const data = await response.json();
  return data;
}
