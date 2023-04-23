import type { CharacterListProps } from '../../AppType'
import { CharacterItem } from './CharacterItem'

export const CharacterList = (props: CharacterListProps) => {
  const { characters, selecteCharacter, deleteCharacter } = props
  return (
    <ul className="character_list">
      {characters.map((character, index) => {
        return (
          <CharacterItem
            character={character}
            index={index}
            selecteCharacter={selecteCharacter}
            deleteCharacter={deleteCharacter}
            key={character.id}
          />
        )
      })}
    </ul>
  )
}
