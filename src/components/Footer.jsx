import React, { useEffect } from 'react'
import '../styles/Footer.css'

function Footer() {

  return (
    <div className='footer'>
       <p>&copy; 2025 FilMe. Todos los derechos reservados.</p>
        <ul className="linksFooter">
          <li><a href="#">Términos y condiciones</a></li>
          <li><a href="#">Política de privacidad</a></li>
          <li><a href="#">Contáctanos</a></li>
        </ul>
    </div>
  )
}

export default Footer