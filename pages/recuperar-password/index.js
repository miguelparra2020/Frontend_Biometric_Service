import React, { useState, useEffect } from 'react';
import  LoginLayout from '../../components/layouts/LoginLayout';
import Link from 'next/link';
import styles from '@/styles/login.module.css';
import { useRouter } from 'next/router';

import { getUsuario, updateUsuario } from '@/db/db';

import { Toaster, toast } from 'sonner';

const RecuperarPage = () => {
const [username, setUsername] = useState('');
const [id_usuario, setIDUsuario] = useState('');
const [preguntaSeguridad, setPreguntaSeguridad] = useState('');
const [respuesta_seguridad, setRespuestaSeguridad] = useState('');
const [respuesta_usuario, setRespuestaUsuario] = useState('');
const [dataUsuario, setDataUsuario] =useState(0);
const [password, setPassword] = useState('');  
const [confirm_password, setConfirmPassword] = useState(''); 
const router = useRouter();
  
  useEffect(() => {
    function alertaIngreso() {
      toast.message('Bienvenido', {
        description: 'Por favor ingresar con sus credenciales asignadas'
      });
    }
    
    alertaIngreso();
  }, []);

  async function handleLogin () {
    try {
        const data = await getUsuario(username);
        if(data.detail == 'Usuario no encontrado'){
            setDataUsuario(0);
            toast.error("Usuario", {
                description: "No encontrado"
            });
        }else{
            setDataUsuario(data);
            setPreguntaSeguridad(data.pregunta_seguridad);
            setRespuestaSeguridad(data.respuesta_seguridad);
            setIDUsuario(data.id);
            toast.success("Usuario", {
                description: "Correcto, por favor sigue el proceso"
            });
            
        }
    } catch (error) {
        // Manejar otros errores, como errores de red o en la función getUsuario
        toast.error("Hubo un problema al intentar iniciar sesión.", {
            description: error.message // Puedes mostrar el mensaje de error aquí
        });
    }
}

const objetoUsuario = {
    "username": username,
    "password": password
}

async function handleActualizar () {
    if(password === confirm_password){
        try {
            await updateUsuario(id_usuario, objetoUsuario);
            toast.loading("Actualizando ", {
            description: "contraseña"
            });
            setTimeout(() => {
                toast.success("Actualización ", {
                    description: "Exitosa, inicia sesión"
                });
            }, 3000);
            setTimeout(() => {
                router.push(`/login`);
            }, 5000);
        } catch (error) {
            toast.error("Error ", {
                description: error
            });
        }
        
    }else{
        toast.error("Contraseñas ", {
            description: "No coinciden, por favor validar!"
        });
    }
}

  return (
    <LoginLayout>
      {/* className={styles.} */}
      <main className={styles.main} >
        <div className={styles.tarjeta}>
          <div className={styles.contenido_tarjeta}>
            <h1 className={styles.h1}>Reestablecer usuario</h1>
            <h2 className={styles.h2}>Servicio QR</h2>
            <h3 className={styles.h3}>Documento de identidad:</h3>
            <input
              type="text"
              placeholder="Usuario"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            
                        
            <button 
            className={styles.button} 
            onClick={handleLogin}
            >Validar</button>

            {dataUsuario != 0 ? (<> 
            
                <h3 className={styles.h3}>Pregunta de seguridad:</h3>
                <h3 className={styles.h3}>{preguntaSeguridad}</h3>
                <input
                    type="text"
                    placeholder="Responder:"
                    className={styles.input}
                    value={respuesta_usuario}
                    onChange={(e) => setRespuestaUsuario(e.target.value)}
                    />
            </>):(<></>)} 

            {
                respuesta_seguridad === respuesta_usuario && dataUsuario != 0 ? (<>
                    <h3 className={styles.h3}>Nueva contraseña:</h3>
                    <input
                    type="password"
                    placeholder="Nueva contraseña:"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <h3 className={styles.h3}>Confirmar contraseña:</h3>
                    <input
                    type="password"
                    placeholder="Confirmar contraseña:"
                    className={styles.input}
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}                  
                    />
                    <button 
            className={styles.button} 
            onClick={handleActualizar}
            >Actualizar contraseña</button>
                 </>):(<>
                   
                 </>)
            }  
            
          </div>
        </div>
      </main>
      <Toaster/>
    </LoginLayout>
  );
};

export default RecuperarPage;