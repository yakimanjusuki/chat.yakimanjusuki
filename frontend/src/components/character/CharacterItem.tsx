import type { CharacterItemProps, DeleteCharacterType, SelectCharacterType } from './CharacterType'

export const CharacterItem = (props: CharacterItemProps) => {
  const { character, index, key, dispatch } = props
  const deleteCharacter: DeleteCharacterType = {
    type: 'DELETE_CHARACTER',
    id: character.id
  }
  const selectCharacter: SelectCharacterType = {
    type: 'SELECT_CHARACTER',
    id: character.id,
    selected: true
  }
  return (
    <>
      <li className={character.selected ? 'selected' : ''}>
        <div key={key}>
          <input
            id={`${index}`}
            type="radio"
            value={character.name}
            onChange={() => dispatch(selectCharacter)}
            checked={character.selected}
          />
          <label htmlFor={`${index}`}>
            <img src={character.img} alt={character.name} />
            <span>{character.name}</span>
          </label>
          {character.selected || (
            <button className="delete" onClick={() => dispatch(deleteCharacter)}>
              <span>▲</span>削除
            </button>
          )}
        </div>
      </li>
    </>
  )
}
