import { TalkPropsType } from '../../AppType'
import { TalkDialog } from './TalkDialog'
import { TalkInput } from './TalkInput'

export const Talk = ({ talkProps, talkDialogProps, talkInputProps }: TalkPropsType) => {
  const { chatMode, setChatMode, selectedCharacter } = talkProps
  return (
    <div className={`talk_box ${chatMode ? 'box' : 'box close'}`}>
      <h2 className="box_head" onClick={() => chatMode || setChatMode((chatMode) => !chatMode)}>
        {chatMode ? (
          <>『{selectedCharacter.name}』とチャット中</>
        ) : (
          <>
            <span>▲</span>『{selectedCharacter.name}』とチャット開始
          </>
        )}
      </h2>
      <div className="box_body talk">
        <TalkDialog {...talkDialogProps} />
        <TalkInput {...talkInputProps} />
      </div>
    </div>
  )
}
