import React, { Dispatch, SetStateAction } from 'react'
import { IoIosClose } from 'react-icons/io'

import { ButtonClose, ContentModal, StyledModal } from './styles'

function Modal({
  children,
  closeFunction,
  transparent
}: {
  children: React.ReactNode
  closeFunction: Dispatch<SetStateAction<'' | 'image' | 'comments' | 'risks'>>
  transparent?: boolean
}) {
  return (
    <StyledModal data-testid="modal">
      <ContentModal transparent={transparent}>
        <ButtonClose
          onClick={() => closeFunction('')}
          transparent={transparent}
          data-testid="close-modal-button"
        >
          <IoIosClose />
        </ButtonClose>
        {children}
      </ContentModal>
    </StyledModal>
  )
}

export default Modal
