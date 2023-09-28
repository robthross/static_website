import React from 'react'

import LogoDER from '../../assets/imgs/DER.png'
import LogoHouer from '../../assets/imgs/HouerLight.png'
import LogoDark from '../../assets/imgs/LogoDark.png'
import LogoLight from '../../assets/imgs/LogoLight.png'

/**
 *
 O componente em questão é uma imagem de logotipo. Ele é definido como uma função chamada "Logo" que recebe uma propriedade opcional chamada "dark" do tipo booleano por meio de uma interface "ILogo".
  O propósito da propriedade "dark" é permitir que o logotipo tenha uma versão escura ou clara, dependendo das necessidades do projeto.
 */
function Logo({ dark, logoName }: { dark?: boolean; logoName?: string }) {
  let logoImage
  let description

  if (logoName === 'Houer') {
    logoImage = LogoHouer
    description = 'Houer'
  } else if (logoName === 'DER') {
    logoImage = LogoDER
    description = 'DER'
  } else {
    logoImage = dark ? LogoDark : LogoLight
    description = 'TAB - Gestão de dados e conhecimentos integrados'
  }

  return <img src={logoImage} alt={description} />
}

export default Logo
