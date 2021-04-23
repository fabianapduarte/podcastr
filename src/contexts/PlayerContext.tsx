import { createContext, ReactNode, useState } from 'react'

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playNext: () => void;
  playPrevious: () => void;
}

type PlayerContextProviderProps = {
  children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData)
// define o formato dos dados salvos pelo contexto

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeList] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeList(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list)
    setCurrentEpisodeList(index)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  function playNext() {
    const nextEpisodeIndex = currentEpisodeIndex + 1

    if (nextEpisodeIndex < episodeList.length) {
      setCurrentEpisodeList(currentEpisodeIndex + 1)
    }
  }

  function playPrevious() {
    const previousEpisodeIndex = currentEpisodeIndex - 1

    if (previousEpisodeIndex > 0) {
      setCurrentEpisodeList(currentEpisodeIndex - 1)
    } 
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        play,
        playList,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}