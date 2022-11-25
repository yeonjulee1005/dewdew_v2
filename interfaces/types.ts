
/** Global Interfaces */

export interface Label<L, V> {
  label: L,
  value: V
}

export interface SnsLogo {
  title: string,
  route: string,
  url: string
}

export interface Images {
  index?: number,
  title: string,
  url: string
}

export interface MassImages {
  title: string,
  url: string
}

export interface listTexts {
  index: number,
  title: string,
  desc: string
}

export interface Texts {
  index: number,
  text: string
}

export interface SalesStatsData {
  [key: string]: number|string,
  salesDate: string,
  planName: string,
  totalCount: number,
  totalAmount: number
}

/** Interfaces */
export interface Footer {
  id: string,
  copyright: string,
  designed: string
}

export interface IntroData {
  mainTitle: string,
  mainText: Texts[],
  subText: string,
  scrollDown: string
}

export interface ResumeData {
  title: string,
  educate: string,
  career: listTexts[]
}

export interface SkillsData {
  title: Texts[],
  firstDesc: Texts[],
  secondDesc: Texts[],
  thirdDesc: Texts[]
}

export interface ReferenceData {
  title: string,
  desc: string,
  background: string
}

export interface ReferenceImage {
  alt: string,
  index: number,
  title: string,
  desc: string,
  url: string,
  image: string,
  detailsImage: string,
}

export interface EmailSend {
  key: string,
  template: string,
  title: string
}

export interface Kakao {
  title: string,
  desc: string,
  url: string
}

export interface ContactData {
  id: string,
  title: string
  email: EmailSend,
  kakaoTalk: Kakao
}

export interface Main {
  id: string,
  intro: IntroData,
  resume: ResumeData,
  skills: SkillsData
}

export interface Information {
  author: string,
  createdAt: Date
}

export interface Pages {
  id: string,
  info: Information,
  menu: Images[]
}

export interface CoreData {
  footer: Footer[],
  main: Main[],
  pages: Pages[],
}

/** Archives Page */
export interface ArchivesData {
  year: string,
  url: string,
  route: string
}
