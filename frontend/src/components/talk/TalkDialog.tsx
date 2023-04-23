import { TalkDialogProps } from '../../AppType'

const userImg = '/human.png'

export const TalkDialog = (props: TalkDialogProps) => {
  const { character } = props
  return (
    <>
      <ul className="talk_message">
        {character.messages.map((message, ind) => (
          <li
            className={`talk_fukidashi talk_fukidashi-${message.speakerId === 0 ? 'left' : 'right'}`}
            key={`${message}${ind}`}
          >
            <div className="talk_icon">
              <img
                src={message.speakerId === 0 ? character.img : userImg}
                alt={message.speakerId === 0 ? 'gptchat' : 'user'}
              />
              <span>{message.speakerId === 0 ? character.name : 'あなた'}</span>
            </div>
            <div className="talk_text">
              <p>{message.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
