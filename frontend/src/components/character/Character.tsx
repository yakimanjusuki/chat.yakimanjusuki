import { CharacterPropsType } from './CharacterType'
import { CharacterList } from './CharacterList'
import { CharacterMaking } from './CharacterMaking'

export const Character = ({ characterProps, characterListProps, characterMakingProps }: CharacterPropsType) => {
  const { chatMode, setChatMode } = characterProps
  return (
    <>
      <div className={`talk_box ${chatMode ? 'box close' : 'box'}`}>
        <h2 className="box_head" onClick={() => chatMode && setChatMode((chatMode) => !chatMode)}>
          {chatMode ? (
            <>
              <span>▲</span>キャラクターを選び直す
            </>
          ) : (
            <>チャットするキャラクターを選ぶ！！</>
          )}
        </h2>
        <div className="box_body character">
          <CharacterList {...characterListProps} />
          <CharacterMaking {...characterMakingProps} />
        </div>
      </div>
    </>
  )
}
