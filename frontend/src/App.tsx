import { useState } from 'react'
import './App.scss'
import { useCharacter } from './hooks/useCharacter'
import { Talk } from './components/talk/Talk'
import { Character } from './components/character/Character'

import type {
  CharacterProps,
  CharacterListPropsType,
  CharacterMakingPropsType,
  GetSelectedCharacterType
} from './components/character/CharacterType'
import type { TalkPropsType } from './components/talk/TalkType'

export const getSelectedCharacter: GetSelectedCharacterType = (characters) => {
  return characters.filter((character) => character.selected)[0]
}

function App() {
  const { characters, characterSubmit, manualModes, dispatch } = useCharacter()

  const [chatMode, setChatMode] = useState(false)
  const characterProps: CharacterProps = { chatMode, setChatMode }
  const characterListProps: CharacterListPropsType = { characters, dispatch }
  const characterMaking: CharacterMakingPropsType = { characterSubmit, manualModes }
  const selectedCharacter = getSelectedCharacter(characters)
  const talkProps: TalkPropsType = { characters, dispatch, chatMode, setChatMode, selectedCharacter }

  return (
    <>
      <div className="wrap-content" style={{ backgroundImage: `url(${selectedCharacter.img})` }}>
        <div className="content">
          <Character
            characterProps={characterProps}
            characterListProps={characterListProps}
            characterMakingProps={characterMaking}
          />
          <Talk {...talkProps} />
        </div>
      </div>
    </>
  )
}

export default App
