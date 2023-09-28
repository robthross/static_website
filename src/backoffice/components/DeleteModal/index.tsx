import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import Button from '../../../common/components/Button'
import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { CloseButton, ContainerButtons, ContainerModal, Modal } from './styles'

function DeleteModal({
  isVisible,
  setIsVisible
}: {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
  if (isVisible)
    return (
      <ContainerModal>
        <Modal>
          <CloseButton onClick={() => setIsVisible(false)}>
            <AiOutlineClose />
          </CloseButton>
          <Text
            text="Tem certeza que deseja deletar este usuário?"
            size={theme.font.sizes.s16}
            color={theme.colors.pure.pure100}
            weight={theme.font.w600}
          />
          <ContainerButtons>
            <Button
              text="Cancelar"
              onClick={() => setIsVisible(false)}
              background={theme.colors.gray.grayCard}
              color={theme.colors.pure.pure}
            />
            <Button
              text="Confirmar"
              onClick={() => {
                setIsVisible(false)
              }}
              background={theme.colors.blueWarmVivid.blueWarmVivid80}
              color={theme.colors.pure.pure}
            />
          </ContainerButtons>
        </Modal>
      </ContainerModal>
    )
}

export default DeleteModal
