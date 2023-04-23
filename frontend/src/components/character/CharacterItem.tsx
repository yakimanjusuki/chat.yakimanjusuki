import { CharacterItemProps } from '../../AppType'

export const CharacterItem = (props: CharacterItemProps) => {
  const { character, index, selecteCharacter, deleteCharacter, key } = props
  return (
    <>
      <li className={character.selected ? 'selected' : ''}>
        <div key={key}>
          <input
          id={`${index}`}
          type="radio"
          value={character.name}
          onChange={selecteCharacter}
          checked={character.selected}
        />
        <label htmlFor={`${index}`}>
          <img src={character.img} alt={character.name} />
          <span>{character.name}</span>
        </label>
        {character.selected || (
          <button className="delete" onClick={() => deleteCharacter(character.id)}>
            <span>▲</span>削除
          </button>
        )}
        </div>
      </li>
    </>
  )
}
