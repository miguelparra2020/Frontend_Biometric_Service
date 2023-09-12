import React from "react";
import MainLayout from '../../components/layouts/MainLayout';
import '../../styles/pages/ingresos.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFicha, updateFicha, deleteFicha } from '../../db/db';



function FichaPage() {
  //----------------Variables---------------------------------
    const [access_token, setAccess] = useState('');
    const [tipo_usuario, setTipoUsuario] = useState('');
    const router = useRouter();
    const { id } = router.query;
    const [ficha, setFicha] = useState(null); // Estado para almacenar el producto / State to store the product
    const [numero_ficha, setNumeroFicha] = useState(''); // Estado para el ID del producto / State for the product ID
    const [nombre_ficha, setNombreFicha] = useState(''); // Estado para el nombre del producto / State for the product name
  //----------------Variables---------------------------------

  //----Función useEffect asyncrona para obtener la data de fichas-------
    useEffect(() => {
  //----Función para detectar al usuario si puede acceder---------
       if (typeof window !== 'undefined') {
        const storedUsuario = localStorage.getItem('access_token');
        setAccess(storedUsuario);
        setTipoUsuario(localStorage.getItem('tipo_usuario'));
        }
      if (access_token == 'sin-acceso'){
          router.push('/');
      }
      if (tipo_usuario == 'aprendiz'){
        router.push('/home');
    }
    if (tipo_usuario == 'undefined'){
      router.push('/home');
  }
  //----Función para detectar al usuario si puede acceder---------
        async function fetchFicha() {
          const data = await getFicha(id);
          setFicha(data);
          setNumeroFicha(data.numero_ficha);
          setNombreFicha(data.nombre_ficha);
        }
    
        fetchFicha();
      },[access_token, id,router,tipo_usuario]);
    //----Función useEffect asyncrona para obtener la data de fichas-------
    
      const handleUpdate = async () => {
        const updatedFicha = {
            numero_ficha,
            nombre_ficha,
        };
    
        await updateFicha(id, updatedFicha);
        alert("Ha actualizado la ficha de manera exitosa!"); // Successful update alert
        router.push('/fichas');
      };
    
      const handleDelete = async () => {
        await deleteFicha(id);
        alert("Ha eliminado la ficha de manera exitosa!"); // Successful deletion alert
        router.push('/fichas');
      };
    
      if (!ficha) {
        return <p>Cargando...</p>; // Loading message
      }

    return(
        <MainLayout>
          <div className='container_botton_volver'>
            <h3><Link href="/fichas" className="volver_link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg> &nbsp;Volver</Link></h3>
        </div>
            <div className="titulo-ingresos">
                <h1>Editar ficha</h1>
            </div>
            <form  className="container">
            <label>
                Número de la ficha:
                <input type="text" value={numero_ficha} onChange={e => setNumeroFicha(e.target.value)} className="inputs-ingresos" required/>
            </label>
            <label>
                Nombre de la ficha:
                <textarea value={nombre_ficha} onChange={e => setNombreFicha(e.target.value)} className="inputs-ingresos" required/>
            </label>
            
            <button onClick={handleUpdate}>Guardar cambios</button> 
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleDelete}>Eliminar</button> 
            </form> 
        </MainLayout>
    )

}

export default FichaPage;