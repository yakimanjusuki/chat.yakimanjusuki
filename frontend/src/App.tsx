import { useState } from 'react'
import './App.scss'
import { useChat } from './useChat'
import { useCharacter } from './useCharacter'
import { Talk } from './components/talk/Talk'
import { Character } from './components/character/Character'

import type {
  TalkProps,
  TalkDialogProps,
  TalkInputProps,
  CharacterProps,
  CharacterListProps,
  CharacterMakingProps
} from './AppType'

function App() {
  const {
    inputCharacter,
    setInputCharacter,
    characters,
    characterSubmit,
    setCharacters,
    selecteCharacter,
    manualModes,
    deleteCharacter
  } = useCharacter()

  const { 
    inputText, 
    setInputText, 
    chatSubmit, 
    isSubmitting
  } = useChat(characters, setCharacters)

  const [chatMode, setChatMode] = useState(false)
  const [selectedCharacter] = characters.filter((character) => character.selected)

  const talkProps: TalkProps = { chatMode, setChatMode, selectedCharacter }
  const talkDialogProps: TalkDialogProps = { character: selectedCharacter }
  const talkInputProps: TalkInputProps = { isSubmitting, selectedCharacter, chatSubmit, inputText, setInputText }
  const characterProps: CharacterProps = { chatMode, setChatMode }
  const characterListProps: CharacterListProps = { characters, selecteCharacter, deleteCharacter }
  const characterMaking: CharacterMakingProps = { characterSubmit, inputCharacter, setInputCharacter, manualModes }

  return (
    <>
      <div className="wrap-content" style={{ backgroundImage: `url(${selectedCharacter.img})` }}>
        <div className="content">
          <Character
            characterProps={characterProps}
            characterListProps={characterListProps}
            characterMakingProps={characterMaking}
          />
          <Talk talkProps={talkProps} talkDialogProps={talkDialogProps} talkInputProps={talkInputProps} />
        </div>
      </div>
    </>
  )
}

export default App
