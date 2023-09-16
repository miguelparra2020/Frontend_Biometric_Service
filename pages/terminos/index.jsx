import React from 'react';
import  LoginLayout from '../../components/layouts/LoginLayout';

// CSS styles 
import styles from '@/styles/pages/terminos.module.css';


const Terminos = () => {
    return (
      <LoginLayout>
      <div>
        {/* className={styles.} */}
        <main className={styles.main}>
          <article className={styles.article}>
            <h1 className={styles.h1}>Politicas y privacidad</h1>
            <p className={styles.p}>
              Apreciado usuario, el sitio web institucional del Servicio Nacional de Aprendizaje – SENA - tiene como función principal proveer, divulgar y gestionar información sobre los productos, programas, trámites y servicios de la institución. Por medio de su sitio www.sena.edu.co el Servicio Nacional de Aprendizaje SENA  publica los temas y actividades que tienen que ver con su misión, su visión, objetivos y las funciones que corresponden a su objeto social. Al igual que los productos, servicios, programas y en general información relacionada con la gestión que adelanta. El Servicio Nacional de Aprendizaje – SENA - no persigue ningún lucro, ganancia o interés comercial con los contenidos y enlaces que se publican en su sitio web institucional y en los sitios web de los diferentes productos y servicios que son parte de la entidad y a los cuales se accede a través de www.sena.edu.co.
            </p>
          </article>
        </main>
      </div>
      </LoginLayout>
    );
  };
  
  export default Terminos;