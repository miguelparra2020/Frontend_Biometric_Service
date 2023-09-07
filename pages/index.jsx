// pages/index.js
import React, { useEffect } from 'react';
import  LandPageLayout from '../components/layouts/LandPageLayout';
import styles from '@/styles/index.module.css';
// Nota: Siempre importar etiquetas raras
import Image from 'next/image';

import { Toaster, toast } from 'sonner';

const LandPage = () => {
  useEffect(() => {
    // Aquí puedes agregar el código de almacenamiento del token
    const accessToken = 'sin-acceso';
    const id =  '';
    const username = '';
    const email =  '';
    const first_name = '';
    const last_name = '';
    const ficha = '';
    const tipo_usuario = ''; 
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('first_name', first_name);
    localStorage.setItem('last_name', last_name);
    localStorage.setItem('ficha', ficha);
    localStorage.setItem('tipo_usuario', tipo_usuario);


  }, []);
  return (
    <LandPageLayout>
      <main className={styles.main}>
      {/* className={styles.} */}
      <div className={styles.container_nav_back}></div>
        <section className={styles.section}>
          <div className={styles.section__texts}>
            <div className={styles.section__texts_margin}>
              <div className={styles.content_section__title}>
                <h1 className={styles.section__title}>Biometric Service</h1>
              </div>
              <div className={styles.container__p}>
              &quot;Lleve un control exhaustivo de su asistencia mientras inculca el hábito de llegar a tiempo.&quot;
              </div>
            </div>
          </div>
          <div className={styles.section__mockup}>
          <Image className={styles.section__img} src="/img/maqueta.png" alt="Logo Símbolo SENA y Biometric Service Negro" width={1000} height={670}/>
          </div>
        </section>
        <h1 className={styles.h1__info}>Enfocado en aprendices e instructores</h1>

        {/* =================== Sección Tarjetas de información ================ */}
        <section className={styles.sectioncards}>
          {/* Tarjeta 1 */}
          <div className={styles.containerone}>
            <div className={styles.cardone}>
              <h2 className={styles.card__title}>Aprendiz</h2>
              <h3 className={styles.card__subtitle}>Comunicación efectiva</h3>
              <p className={styles.card__description}>Comunica tus inconvenientes fácilmente. Anexa excusas, el instructor  las valida, garantizando que puedas continuar con confianza.</p>
            </div>

            {/* Tarjeta 2 */}
            <div className={`${styles.cardone} ${styles['cardone--blue']}`}>
              <h2 className={styles.card__title}>Aprendiz</h2>
              <h3 className={styles.card__subtitle}>Control de asistencia</h3>
              <p className={styles.card__description}>Verifica tu asistencia al instante desde la plataforma y descárguela en PDF para un seguimiento sin complicaciones.</p>
            </div>
          </div>

          <div className={styles.containerone}>
            <div className={`${styles.cardone} ${styles['cardone--blue']}`}>
                <h2 className={styles.card__title}>Instructor</h2>
                <h3 className={styles.card__subtitle}>Control Estudiantes</h3>
                <p className={styles.card__description}>Mantén un seguimiento organizado de la asistencia diaria de tus estudiantes con facilidad.</p>
            </div>
            <div className={`${styles.cardone} ${styles['cardone--green']}`}>
              <h2 className={styles.card__title}>Instructor</h2>
              <h3 className={styles.card__subtitle}>Gestión Fichas</h3>
              <p className={styles.card__description}>Accede y genera reportes sobre las fichas a tu cargo para un análisis detallado de tu gestión.</p>
            </div>
          </div>

          <div className={styles.containerthree}>
            <div className={styles.cardone}>
              <h2 className={styles.card__title}>Instructor</h2>
              <h3 className={styles.card__subtitle}>Asistencia Instructor</h3>
              <p className={styles.card__description}>Accede a tu registro de asistencia y descárgalo para un seguimiento efectivo de tus clases.</p>
            </div>
          </div>

        </section>
      </main>
      <Toaster position="top-center"  theme='dark' richColors />
    </LandPageLayout>
  );
};

export default LandPage;