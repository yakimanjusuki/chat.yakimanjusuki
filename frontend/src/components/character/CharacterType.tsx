import { ADD_CHARACTER, DELETE_CHARACTER, SELECT_CHARACTER, ADD_MESSAGE } from '../../utils/constants'
import { ManualModeType, Message } from '../talk/TalkType'

export type AddCharacterType = {
  type: typeof ADD_CHARACTER
  id: string
  name: string
  img: string
  inputCharacter: string
}

export type DeleteCharacterType = {
  type: typeof DELETE_CHARACTER
  id: string
}

export type SelectCharacterType = {
  type: typeof SELECT_CHARACTER
  id: string
  selected: boolean
}

export type AddMessageType = {
  type: typeof ADD_MESSAGE
  speakerId: number
  text: string
}

export type CharacterActionType = AddCharacterType | DeleteCharacterType | SelectCharacterType | AddMessageType

export type CharacterType = {
  id: string
  name: string
  img: string
  role: string
  selected: boolean
  messages: Message[]
}
export type CharacterItemProps = {
  character: CharacterType
  index: number
  dispatch: React.Dispatch<CharacterActionType>
  key: string
}

export type CharacterProps = {
  chatMode: boolean
  setChatMode: React.Dispatch<React.SetStateAction<boolean>>
}

export type CharacterPropsType = {
  characterProps: CharacterProps
  characterListProps: CharacterListPropsType
  characterMakingProps: CharacterMakingPropsType
}

export type CharacterListPropsType = {
  characters: CharacterType[]
  dispatch: React.Dispatch<CharacterActionType>
}

export type CharacterMakingPropsType = {
  characterSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    inputCharacter: string,
    setInputCharacter: React.Dispatch<React.SetStateAction<string>>
  ) => void
  manualModes: ManualModeType[]
}

export type GetSelectedCharacterType = (characters: CharacterType[]) => CharacterType
