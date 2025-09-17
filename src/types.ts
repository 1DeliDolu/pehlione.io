export interface FotoEintrag {
  id: string
  src: string
  name: string
  title: string
  description: string
  category: 'foto' | 'garten'
  sub_category: string
}
