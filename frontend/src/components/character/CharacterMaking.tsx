import type { CharacterMakingProps } from '../../AppType'

export const CharacterMaking = (props: CharacterMakingProps) => {
  const { characterSubmit, inputCharacter, setInputCharacter, manualModes } = props
  return (
    <>
      <div className="make">
        <form className="character_input" onSubmit={characterSubmit}>
          <input
            value={inputCharacter}
            placeholder="『かわいい猫』等を入力。(10文字以内)"
            onChange={(e) => setInputCharacter(e.target.value)}
            maxLength={10}
          />
          <button>作成</button>
        </form>
        <div className="manual">
          <div className="manual_icon">
            <img src="/human.png" alt="/human.png" />
            <span>説明する人</span>
          </div>
          <div className="manual_fukidashi">
            <p className="manual_point">
              {manualModes
                .filter((manual) => manual.selected)
                .map((manual) => {
                  return (
                    <span key={manual.id} className={manual.mode}>
                      {manual.text}
                    </span>
                  )
                })}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
