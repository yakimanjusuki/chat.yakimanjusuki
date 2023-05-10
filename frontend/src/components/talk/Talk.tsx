import { TalkInputPropsType, TalkPropsType } from './TalkType'
import { TalkDialog } from './TalkDialog'
import { TalkInput } from './TalkInput'
import { useChat } from '../../hooks/useChat'

export const Talk = (props: TalkPropsType) => {
  const { characters, dispatch, chatMode, setChatMode, selectedCharacter } = props
  const { inputText, setInputText, chatSubmit, isSubmitting } = useChat(characters, dispatch)
  const talkInputProps: TalkInputPropsType = {
    isSubmitting,
    selectedCharacter,
    chatSubmit,
    inputText,
    setInputText
  }
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
        <TalkDialog character={selectedCharacter} />
        <TalkInput {...talkInputProps} />
      </div>
    </div>
  )
}
