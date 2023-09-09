import React, { useState, useEffect } from 'react';
import  LoginLayout from '../../components/layouts/LoginLayout';
import Link from 'next/link';
import styles from '@/styles/login.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Toaster, toast } from 'sonner';

const LoginPage = () => {
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  
  const router = useRouter();
  
  useEffect(() => {
    function alertaIngreso() {
      toast.message('Bienvenido', {
        description: 'Por favor ingresar con sus credenciales asignadas'
      });
    }
    
    alertaIngreso();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://miguelpaez9612.pythonanywhere.com/api/token/', {
        username: username,
        password: password,
      });

      const accessToken = response.data.access;
      console.log('Token de acceso:', accessToken);

      // const response2 = await axios.get(`https://miguelpaez9612.pythonanywhere.com/users/${username}/`);

      // console.log(response2.data.id);
      // setId(response2.data.id);
      // console.log(response2.data.username);
      // setUsername(response2.data.username);
      // console.log(response2.data.email);
      // setEmail(response2.data.email);
      // console.log(response2.data.first_name);
      // setFirstName(response2.data.first_name);
      // console.log(response2.data.last_name);
      // setLastName(response2.data.last_name);
      // console.log(response2.data.ficha);
      // setFicha(response2.data.ficha);
      // console.log(response2.data.tipo_usuario);
      // setTipoUsuario(response2.data.tipo_usuario);



      
      localStorage.setItem('username', username);
      localStorage.setItem('access_token', accessToken);
      
      toast.loading('Validando credenciales', {
        description: ''
      });
      
      setTimeout(() => {
        toast.success('Acceso concedido', {
          description: ''
        });
      }, 2000);

      

      setTimeout(() => {
        router.push('/home');
      }, 3000); // 5000 milisegundos (5 segundos)

      // Aquí puedes guardar el token en el almacenamiento local o en una cookie
    } catch (error) {
      localStorage.setItem('access_token', 'sin-acceso');
      localStorage.setItem('id', '');
      localStorage.setItem('username', '');
      localStorage.setItem('email', '');
      localStorage.setItem('first_name', '');
      localStorage.setItem('last_name', '');
      localStorage.setItem('ficha', '');
      localStorage.setItem('tipo_usuario', '');
      toast.error('Usuario invalido', {
        description: 'Por favor revisa sus credenciales'
      });
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <LoginLayout>
      {/* className={styles.} */}
      <main className={styles.main} >
        <div className={styles.tarjeta}>
          <div className={styles.contenido_tarjeta}>
            <h1 className={styles.h1}>Iniciar sesión</h1>
            <h2 className={styles.h2}>Servicio QR</h2>
            <h3 className={styles.h3}>Documento de identidad:</h3>
            <input
              type="text"
              placeholder="Usuario"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h3 className={styles.h3}>Contraseña:</h3>
            <input
              type="password"
              placeholder="Contraseña"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h4 className={styles.h4}>
              <Link href="/recuperar-password" className={styles.a}>¿Has olvidado la contraseña?</Link>
            </h4>
            
            <button 
            className={styles.button} 
            onClick={handleLogin}
            >Ingresar</button>
            
          </div>
        </div>
      </main>
      <Toaster/>
    </LoginLayout>
  );
};

export default LoginPage;