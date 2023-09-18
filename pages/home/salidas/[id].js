import React from "react";
import MainLayout from '../../../components/layouts/MainLayout';
import '../../../styles/pages/ingresos.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSalida, updateSalida, deleteSalida } from '../../../db/db';


function SalidasIdPage() {
  //----------------Variables---------------------------------
    const [access_token, setAccess] = useState('');
    const router = useRouter();
    const { id } = router.query;
    const [salida, setSalida] = useState(null); 
    const [username, setUsername] = useState(''); 
    const [fecha_salida, setFechaSalida] = useState(''); 
    const [hora_salida, setHoraSalida] = useState(''); 
    const [zona, setZona] = useState(''); 
    
  //----------------Variables---------------------------------

  //----Función useEffect asyncrona para obtener la data de fichas-------
    useEffect(() => {
  //----Función para detectar al usuario si puede acceder---------
       if (typeof window !== 'undefined') {
        const storedUsuario = localStorage.getItem('access_token');
        setAccess(storedUsuario);
        }
      if (access_token == 'sin-acceso'){
          router.push('/');
      }
  //----Función para detectar al usuario si puede acceder---------
        async function fetchSalida() {
          const data = await getSalida(id);
          setSalida(data);
          setUsername(data.username);
          setFechaSalida(data.fecha_salida);
          setHoraSalida(data.hora_salida);
          setZona(data.zona);
        }
    
        fetchSalida();
        
      },[access_token,id,router]);
    //----Función useEffect asyncrona para obtener la data de fichas-------
    
      const handleUpdate = async () => {
        const updatedSalida = {
            username,
            fecha_salida,
            hora_salida,
            zona,
        };
    
        try {
            await updateSalida(id, updatedSalida);
          } catch (error) {
            console.error('Error al actualizar salida:', error);
          }       
          alert("Modificación de salida exitosa!");
      };

    
      const handleDelete = async () => {
        try {
            await deleteSalida(id);
          } catch (error) {
            console.error('Error al actualizar salida:', error);
          }   
        
        alert("Ha eliminado la salida correctamente!"); 
      };
    

    return(
        <MainLayout>
          <div className='container_botton_volver'>
            <h3><Link href="/home" className="volver_link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg> &nbsp;Volver</Link></h3>
        </div>
            <div className="titulo-ingresos">
                <h1>Editar saldia</h1>
            </div>
            <form  className="container">
            <label>
                username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="inputs-ingresos" required/>
            </label>
            <label>
                fecha_ingreso:
                <input type="date" value={fecha_salida} onChange={e => setFechaSalida(e.target.value)} className="inputs-ingresos" required/>
            </label>
            <label>
                hora_ingreso:
                <input type="time"  value={hora_salida} onChange={e => setHoraSalida(e.target.value)} className="inputs-ingresos" required/>
            </label>
            <label>
                zona:
                <input type="text" value={zona} onChange={e => setZona(e.target.value)} className="inputs-ingresos" required/>
            </label>
            
            <button onClick={handleUpdate} >Guardar cambios</button> 
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleDelete}>Eliminar</button> 
            </form> 
        </MainLayout>
    )

}

export default SalidasIdPage;