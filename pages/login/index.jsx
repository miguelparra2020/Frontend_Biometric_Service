import React, { useState } from 'react';
import  LoginLayout from '../../components/layouts/LoginLayout';
import Link from 'next/link';
import styles from '@/styles/login.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [ficha, setFicha] = useState('');
  const [tipo_usuario, setTipoUsuario] = useState('');

  
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://miguelpaez9612.pythonanywhere.com/api/token/', {
        username: username,
        password: password,
      });

      const accessToken = response.data.access;
      console.log('Token de acceso:', accessToken);

      const response2 = await axios.get(`https://miguelpaez9612.pythonanywhere.com/users/${username}/`);

      console.log(response2.data.id);
      setId(response2.data.id);
      console.log(response2.data.username);
      setUsername(response2.data.username);
      console.log(response2.data.email);
      setEmail(response2.data.email);
      console.log(response2.data.first_name);
      setFirstName(response2.data.first_name);
      console.log(response2.data.last_name);
      setLastName(response2.data.last_name);
      console.log(response2.data.ficha);
      setFicha(response2.data.ficha);
      console.log(response2.data.tipo_usuario);
      setTipoUsuario(response2.data.tipo_usuario);



      
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('first_name', first_name);
      localStorage.setItem('last_name', last_name);
      localStorage.setItem('ficha', ficha);
      localStorage.setItem('tipo_usuario', tipo_usuario);
    router.push('/home');

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
      alert("Usuario invalido, por favor revisa sus credenciales")
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <LoginLayout>
      {username}
  {id}
  {email}
  {first_name}
  {last_name}
  {ficha}
  {tipo_usuario}
      {/* className={styles.} */}
      <main className={styles.main} >
        <div className={styles.tarjeta}>
          <div className={styles.contenido_tarjeta}>
            <h1 className={styles.h1}>Iniciar sesión</h1>
            <h2 className={styles.h2}>Servicio Biometrico</h2>
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
            
            <button className={styles.button} onClick={handleLogin}>Ingresar</button>
            
          </div>
        </div>
      </main>
    </LoginLayout>
  );
};

export default LoginPage;