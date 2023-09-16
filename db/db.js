
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
    throw new Error('Error al eliminar un ingreso');
  }
}

//----------------------------Modelo---Salidas-------------------------------

//Función para obtener todas las salidas, de la base de datos es un READ - lectura

export async function getSalida(id) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/salidas/${id}/`);
  const data = await response.json();
  return data;
}

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


//del CRUD - fichas
//Updated 😮‍💨
//Función para obtener actualizar todos los datos de una ficha de la base de datos es un Updated 
export async function updateSalida(id, updatedSalida) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/salidas/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedSalida),
  });

  const data = await response.json();
  return data;
} 

//del CRUD - fichas
//Delete ❌
//Función para eliminar una ficha según el ID
export async function deleteSalida(id) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/salidas/${id}/`, {
    method: 'DELETE',
  });

  if (response.ok) {
    return { success: true };
  } else {
    throw new Error('Error al eliminar una salida');
  }
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
  // Crea un nuevo objeto FormData
  const formData = new FormData();

  // Agrega todos los campos y la imagen al FormData
  for (const key in usuarioData) {
    formData.append(key, usuarioData[key]);
  }

  try {
    const response = await fetch('https://miguelpaez9612.pythonanywhere.com/register/', {
      method: 'POST',
      body: formData,  // Envía el FormData en lugar de usuarioData
    });

    const data = await response.json();
    return data;
  } catch (error) {
    // Maneja cualquier error de la solicitud aquí
    console.error('Error al crear usuario:', error);
    throw error;
  }
}





//----------------------------Modelo---Usuarios-------------------------------
export async function getUsuarios() {
  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/users/');
  const data = await response.json();
  return data;
}


//----------------------------Modelo---Excusas-------------------------------


//Función para obtener todas las excusas de la base de datos es un READ - lectura
export async function getExcusas() {
  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/excusas/');
  const data = await response.json();
  return data;
}

//del CRUD - excusas
//Created 🆕
//Función para crear una excusa

export async function CreateExcusa(excusaData) {
  const response = await fetch('https://miguelpaez9612.pythonanywhere.com/excusas/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(excusaData),
  });

  const data = await response.json();
  return data;
}

//del CRUD - Excusa
//Read 👀
//Función para obtener una excusa especifica
export async function getExcusa(id) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/excusas/${id}/`);
  const data = await response.json();
  return data;
}

//del CRUD - excusa
//Updated 😮‍💨
//Función para  actualizar todos los datos de una excusa de la base de datos es un Updated 
export async function updateExcusa(id, updatedExcusa) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/excusas/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedExcusa),
  });

  const data = await response.json();
  return data;
} 

//del CRUD - excusas
//Delete ❌
//Función para eliminar una excusa según el ID
export async function deleteExcusa(id) {
  const response = await fetch(`https://miguelpaez9612.pythonanywhere.com/excusas/${id}/`, {
    method: 'DELETE',
  });

  if (response.ok) {
    return { success: true };
  } else {
    throw new Error('Error al eliminar una excusa');
  }
}
