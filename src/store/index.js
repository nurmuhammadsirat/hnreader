import create from 'zustand'

export const [useStore] = create(set => ({
  url: '',
  setUrl: url =>
    set(state => ({
      ...state,
      url
    }))
}));
