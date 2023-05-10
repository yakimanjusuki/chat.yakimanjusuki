import { useCallback, useState, useReducer } from 'react'
import axios from 'axios'
import { ADD_CHARACTER, DELETE_CHARACTER, SELECT_CHARACTER, ADD_MESSAGE } from '../utils/constants'
import { v4 as uuidv4 } from 'uuid'
import type { CharacterActionType, CharacterType } from '../components/character/CharacterType'
import type { ManualModeItemType, ManualModeType } from '../components/talk/TalkType'

const defaultCharacter = {
  id: '',
  name: '',
  img: '',
  role: '',
  selected: false,
  messages: [{ speakerId: 0, text: `Hello!` }]
}

const characterList: CharacterType[] = [
  {
    ...defaultCharacter,
    id: uuidv4(),
    name: '普通の人間',
    img: '/logo1.png',
    role: '普通の人間',
    selected: true,
    messages: [{ speakerId: 0, text: `こんにちわ！「普通の人間」です。（ChatGPTを使用しています）` }]
  },
  {
    ...defaultCharacter,
    id: uuidv4(),
    name: '風船ネコ',
    img: '/logo3.png',
    role: '可愛い猫で話の語尾に「ニャー」を付ける。',
    messages: [{ speakerId: 0, text: `こんにちわ！「風船ネコ」です。（ChatGPTを使用しています）` }]
  },
  {
    ...defaultCharacter,
    id: uuidv4(),
    name: '可愛い犬',
    img: '/logo4.png',
    role: '可愛い犬で話の語尾に「ワン」を付ける。',
    messages: [{ speakerId: 0, text: `こんにちわ！「可愛い犬」です。（ChatGPTを使用しています）` }]
  },
  {
    ...defaultCharacter,
    id: uuidv4(),
    name: 'ネギ',
    img: '/logo2.png',
    messages: [{ speakerId: 0, text: `こんにちわ！「ネギ」です。（ChatGPTを使用しています）` }]
  }
]

const manualModeList: ManualModeType[] = [
  {
    id: uuidv4(),
    mode: 'loader',
    text: '現在、キャラクターを作成中･･･',
    selected: false
  },
  {
    id: uuidv4(),
    mode: 'error',
    text: 'システムエラーにより、キャラクターが作成できませんでした。',
    selected: false
  },
  {
    id: uuidv4(),
    mode: 'overLimit',
    text: 'キャラクターの最大数（８キャラクター）に達しました。',
    selected: false
  },
  {
    id: uuidv4(),
    mode: 'normal',
    text: '上の入力欄へ『かわいい猫』『歩くクマ』等のワードを入力で、新たなキャラクターを作成することが出来ます。(最大:8)',
    selected: true
  }
]

const reducer = (characters: CharacterType[], action: CharacterActionType): CharacterType[] => {
  switch (action.type) {
    case ADD_CHARACTER:
      return [
        ...characters,
        {
          ...defaultCharacter,
          name: action.name,
          img: action.img,
          role: `あなたの名前は「${action.name}」」で、役割は「${action.inputCharacter}」です。`,
          messages: [{ speakerId: 0, text: `こんにちわ！「${action.name}」です。（ChatGPTを使用しています）` }]
        }
      ]
    case DELETE_CHARACTER: {
      if (characters.filter((character) => character.id === action.id)[0].selected) return characters
      const tCharacters = characters.filter((character) => character.id !== action.id)
      return tCharacters
    }
    case SELECT_CHARACTER: {
      const newCharacter = [...characters].map((character) => {
        if (character.id === action.id) {
          character.selected = true
          return character
        } else {
          character.selected = false
          return character
        }
      })
      return newCharacter
    }
    case ADD_MESSAGE: {
      const newCharacter = characters.map((character) => {
        const message = {
          speakerId: action.speakerId,
          text: action.text
        }
        return character.selected ? { ...character, messages: [...character.messages, message] } : { ...character }
      })
      return newCharacter
    }
    default:
      return characters
  }
}

export const useCharacter = () => {
  const [manualModes, setManualModes] = useState(manualModeList)
  const [characters, dispatch] = useReducer(reducer, characterList)
  const isLoaderManualMode = useCallback((): boolean => {
    const [manual] = manualModes.filter((manual) => manual.mode === 'loader')
    return manual.selected
  }, [manualModes])

  const setrManualMode = useCallback(
    (mode: ManualModeItemType, selected = true, tManualModes: ManualModeType[] = manualModes) => {
      return tManualModes.map((manual) => {
        if (manual.mode === mode) {
          return { ...manual, selected }
        } else if (manual.mode === 'normal') {
          return { ...manual, selected: !selected }
        } else {
          return { ...manual }
        }
      })
    },
    [manualModes]
  )

  const characterSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      inputCharacter: string,
      setInputCharacter: React.Dispatch<React.SetStateAction<string>>
    ) => {
      e.preventDefault()
      let tManualModes: ManualModeType[] = []
      if (!inputCharacter.trim()) return
      if (isLoaderManualMode()) return
      if (characters.length >= 8) {
        tManualModes = setrManualMode('overLimit')
        setManualModes(tManualModes)
        return
      }
      tManualModes = setrManualMode('loader', true)
      setManualModes(tManualModes)
      axios
        .post('https://chat.yakimanjusuki.love/api/character', { text: inputCharacter })
        .then((response) => {
          dispatch({
            type: 'ADD_CHARACTER',
            name: response.data.name,
            img: response.data.img,
            id: uuidv4(),
            inputCharacter
          })
          tManualModes = setrManualMode('loader', false, tManualModes)
          setManualModes(tManualModes)
        })
        .catch((e) => {
          console.log(e)
          tManualModes = setrManualMode('error', true, tManualModes)
          setManualModes(tManualModes)
          throw new Error(e.messages)
        })
      setInputCharacter('')
    },
    [manualModes, setManualModes, isLoaderManualMode, characters.length, setrManualMode]
  )

  return {
    characterSubmit,
    manualModes,
    characters,
    dispatch
  }
}
