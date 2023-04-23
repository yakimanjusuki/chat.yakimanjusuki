import { useCallback, useState, useReducer } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import type { CharacterType, ManualModeItemType, ManualModeType } from './AppType'

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

export const useCharacter = () => {
  const [inputCharacter, setInputCharacter] = useState('')
  const [characters, setCharacters] = useState<CharacterType[]>(characterList)
  const [manualModes, setManualModes] = useState(manualModeList)

  const addCharacter = useCallback(
    (name: string, img: string) => {
      setCharacters((characters) => [
        ...characters,
        {
          ...defaultCharacter,
          name,
          img,
          role: `あなたの名前は「${name}」」で、役割は「${inputCharacter}」です。`,
          messages: [{ speakerId: 0, text: `こんにちわ！「${name}」です。（ChatGPTを使用しています）` }]
        }
      ])
    },
    [setCharacters, inputCharacter]
  )

  const deleteCharacter = useCallback(
    (id: string) => {
      if (characters.filter((character) => character.id === id)[0].selected) return
      const tCharacters = characters.filter((character) => character.id !== id)
      return setCharacters(tCharacters)
    },
    [characters]
  )

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
    (e: React.FormEvent<HTMLFormElement>) => {
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
          addCharacter(response.data.name, response.data.img)
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
    [addCharacter, inputCharacter, manualModes, setManualModes, isLoaderManualMode, characters.length, setrManualMode]
  )

  const selecteCharacter = (e: any) => {
    const newCharacter = [...characters]
    newCharacter.map((item) => (item.selected = false))
    newCharacter[e.target.id].selected = !newCharacter[e.target.id].selected
    setCharacters(newCharacter)
  }

  return {
    inputCharacter,
    setInputCharacter,
    characters,
    characterSubmit,
    setCharacters,
    selecteCharacter,
    manualModes,
    deleteCharacter
  }
}
