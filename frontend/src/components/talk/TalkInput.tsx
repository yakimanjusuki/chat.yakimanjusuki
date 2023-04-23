import type { TalkInputProps } from '../../AppType'

export const TalkInput = (props: TalkInputProps) => {
  const { isSubmitting, selectedCharacter, chatSubmit, inputText, setInputText } = props
  return (
    <>
      <span className="loder">{isSubmitting && `${selectedCharacter.name}が入力中･･･`}</span>
      <form id="input_form" className="talk_input" onSubmit={chatSubmit}>
        <input
          value={inputText}
          placeholder="話したい内容を入力！(30文字以内)"
          onChange={(e) => setInputText(e.target.value)}
          maxLength={30}
        />
        <button>送信</button>
      </form>
    </>
  )
}
