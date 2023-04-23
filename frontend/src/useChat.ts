import { useCallback, useState } from 'react'
import axios from 'axios'
import type { CharacterType } from './AppType'

export const useChat = (
  characters: CharacterType[],
  setCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inputText, setInputText] = useState('')
  const addMessage = useCallback(
    (speakerId: number, text: string, tCharacters: CharacterType[] = characters): CharacterType[] => {
      return tCharacters.map((character) => {
        return character.selected
          ? { ...character, messages: [...character.messages, { speakerId: speakerId, text: text }] }
          : { ...character }
      })
    },
    [characters]
  )

  const chatSubmit = useCallback(
    (e: any) => {
      e.preventDefault()
      if (!inputText.trim()) return
      if (isSubmitting) return
      setIsSubmitting(true)
      const tCharacters = addMessage(1, inputText)
      setCharacters(tCharacters)
      const [character] = characters.filter((character) => character.selected)
      axios
        .post('https://chat.yakimanjusuki.love/api/chat', { text: inputText, role: character.role })
        .then((response) => {
          setCharacters(addMessage(0, response.data.text, tCharacters))
        })
        .catch((e) => {
          console.log(e)
          setCharacters(addMessage(0, 'データが取得できません。', tCharacters))
        })
        .finally(() => {
          setIsSubmitting(false)
        })
      setInputText('')
    },
    [addMessage, inputText, isSubmitting, setInputText, setCharacters, characters]
  )

  return { inputText, setInputText, chatSubmit, isSubmitting }
}
