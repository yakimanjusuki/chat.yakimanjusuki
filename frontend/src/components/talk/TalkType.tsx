import type { CharacterType, CharacterActionType } from '../character/CharacterType'

export type TalkDialogPropsType = {
  character: CharacterType
}

export type TalkInputPropsType = {
  isSubmitting: boolean
  selectedCharacter: CharacterType
  chatSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
}

export type TalkPropsType = {
  characters: CharacterType[]
  dispatch: React.Dispatch<CharacterActionType>
  chatMode: boolean
  setChatMode: React.Dispatch<React.SetStateAction<boolean>>
  selectedCharacter: CharacterType
}

export type Message = {
  speakerId: number
  text: string
}

export type ManualModeItemType = 'normal' | 'loader' | 'error' | 'overLimit'

export type ManualModeType = {
  id: string
  mode: ManualModeItemType
  text: string
  selected: boolean
}
