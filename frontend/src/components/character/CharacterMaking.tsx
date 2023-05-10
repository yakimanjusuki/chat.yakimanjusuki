import { useState } from 'react'
import type { CharacterMakingPropsType } from './CharacterType'

export const CharacterMaking = (props: CharacterMakingPropsType) => {
  const { characterSubmit, manualModes } = props
  const [inputCharacter, setInputCharacter] = useState('')
  return (
    <>
      <div className="make">
        <form className="character_input" onSubmit={(e) => characterSubmit(e, inputCharacter, setInputCharacter)}>
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
