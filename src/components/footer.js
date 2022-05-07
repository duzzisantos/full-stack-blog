import React from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div className='footer'>
        <ul className='footer-items'>
            <li>&copy; Blockhead 2022</li>
            <li><Link to="/dashboard/rules" className='link'>Rules</Link></li>
            <li><Link to="/dashboard/privacy" className='link'>Privacy</Link></li>
        </ul>
    </div>
  )
}

export default Footer