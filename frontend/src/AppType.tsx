export type CharacterType = {
  id: string
  name: string
  img: string
  role: string
  selected: boolean
  messages: Message[]
}

export type CharacterProps = {
  chatMode: boolean
  setChatMode: React.Dispatch<React.SetStateAction<boolean>>
}

export type CharacterListProps = {
  characters: CharacterType[]
  selecteCharacter: (e: any) => void
  deleteCharacter: (id: string) => void
}

export type CharacterMakingProps = {
  characterSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  inputCharacter: string
  setInputCharacter: React.Dispatch<React.SetStateAction<string>>
  manualModes: ManualModeType[]
}

export type CharacterPropsType = {
  characterProps: CharacterProps
  characterListProps: CharacterListProps
  characterMakingProps: CharacterMakingProps
}

export type CharacterItemProps = {
  character: CharacterType
  index: number
  selecteCharacter: (e: any) => void
  deleteCharacter: (id: string) => void
  key: string
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

export type TalkDialogProps = {
  character: CharacterType
}

export type TalkInputProps = {
  isSubmitting: boolean
  selectedCharacter: CharacterType
  chatSubmit: (e: any) => void
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
}

export type TalkProps = {
  chatMode: boolean
  setChatMode: React.Dispatch<React.SetStateAction<boolean>>
  selectedCharacter: CharacterType
}

export type TalkPropsType = {
  talkProps: TalkProps
  talkDialogProps: TalkDialogProps
  talkInputProps: TalkInputProps
}

export type ButtonProps = {
  deleteCharacter: (id: string) => void
  character: CharacterType
}

export type InputProps = {
  index: number
  character: CharacterType
  selecteCharacter: (e: React.MouseEvent<HTMLInputElement>) => void
}