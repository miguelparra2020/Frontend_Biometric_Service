// components/NavbarLogin.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/components/NavbarMain.module.css';
import '../styles/global.css';


const NavbarMain = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <Link href="/home" className={styles.nav__link}>     
            <div>Img</div>
            <span>Biometric Services</span>
        </Link>
      </div>
      <div >
        <Link href="/excusas" className={styles.nav__link}>     
            <div>Excusas</div>
        </Link>
      </div>
      <div>
        <Link href="/fichas" className={styles.nav__link}>     
            <div>Fichas</div>
        </Link>
      </div>
      <div>
        <Link href="/usuarios" className={styles.nav__link}>     
            <div>Usuarios</div>
        </Link>
      </div>
      <div>
        <Link href="https://miguelpaez9612.pythonanywhere.com/admin/" target='_blank' className={styles.nav__link}>     
            <div>Administración</div>
        </Link>
      </div>
      <div>
        <Link href="/" className={styles.nav__link}>     
            <div>Salir</div>
        </Link>
      </div>
    </nav>
  );
};

export default NavbarMain;