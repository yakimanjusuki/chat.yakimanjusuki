import type { CharacterListPropsType } from './CharacterType'
import { CharacterItem } from './CharacterItem'

export const CharacterList = (props: CharacterListPropsType) => {
  const { characters, dispatch } = props
  return (
    <ul className="character_list">
      {characters.map((character, index) => {
        return <CharacterItem character={character} index={index} dispatch={dispatch} key={character.id} />
      })}
    </ul>
  )
}
