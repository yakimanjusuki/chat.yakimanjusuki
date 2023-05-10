import { useCallback, useState } from 'react'
import axios from 'axios'
import type { CharacterType, CharacterActionType } from '../components/character/CharacterType'

export const useChat = (characters: CharacterType[], dispatch: React.Dispatch<CharacterActionType>) => {
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
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!inputText.trim()) return
      if (isSubmitting) return
      setIsSubmitting(true)
      dispatch({ type: 'ADD_MESSAGE', speakerId: 1, text: inputText })
      const [character] = characters.filter((character) => character.selected)
      axios
        .post('https://chat.yakimanjusuki.love/api/chat', { text: inputText, role: character.role })
        .then((response) => {
          dispatch({ type: 'ADD_MESSAGE', speakerId: 0, text: response.data.text })
        })
        .catch((e) => {
          console.log(e)
          dispatch({ type: 'ADD_MESSAGE', speakerId: 0, text: 'データが取得できません。' })
        })
        .finally(() => {
          setIsSubmitting(false)
        })
      setInputText('')
    },
    [addMessage, inputText, isSubmitting, setInputText, characters]
  )

  return { inputText, setInputText, chatSubmit, isSubmitting }
}
