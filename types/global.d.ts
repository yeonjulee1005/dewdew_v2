
/** Global Interfaces */

interface Label<L, V> {
  label: L,
  value: V
}

interface SnsLogo {
  title: string,
  route: string,
  url: string
}

interface Route {
  index: number,
  title: string,
  route: string
}

interface Colors {
  color: string,
  percentage: number
}

interface Images {
  index?: number,
  icon?: string,
  title: string,
  url: string
}

interface MassImages {
  title: string,
  url: string
}

interface listTexts {
  index: number,
  title: string,
  desc: string
}

interface Texts {
  index: number,
  text: string
}

interface IndexSignature {
  [key: string]: string
}

/** Interfaces */
interface Footer {
  id: string,
  copyright: string,
  designed: string
}

interface IntroData {
  mainTitle: string,
  mainText: Texts[],
  subText: string,
  scrollDown: string
}

interface ResumeData {
  title: string,
  educate: string,
  career: listTexts[]
}

interface SkillsData {
  title: Texts[],
  firstDesc: Texts[],
  secondDesc: Texts[],
  thirdDesc: Texts[]
}

interface ReferenceData {
  title: string,
  desc: string,
  background: string
}

interface ReferenceImage {
  alt: string,
  index: number,
  title: string,
  desc: string,
  url: string,
  image: string,
  detailsImage: string,
}

interface EmailSend {
  key: string,
  template: string,
  title: string
}

interface Kakao {
  title: string,
  desc: string,
  url: string
}

interface ContactData {
  id: string,
  title: string
  email: EmailSend,
  kakaoTalk: Kakao
}

interface Main {
  id: string,
  intro: IntroData,
  resume: ResumeData,
  skills: SkillsData
}

interface Information {
  author: string,
  createdAt: Date
}

interface Pages {
  id: string,
  info: Information,
  menu: Images[]
}

interface CoreData {
  footer: Footer[],
  main: Main[],
  pages: Pages[],
}

/** Archives Page */
interface ArchivesData {
  title?: string,
  year: string,
  url: string,
  route: string
}

/** Blog Page */

interface TimeStamp {
  seconds: number,
  nanoseconds: number
}

interface Comment {
  index: number,
  name: string,
  message: string,
  password: string,
  createdAt: TimeStamp
}

interface BlogList {
  id?: string,
  index: number,
  title: string,
  rawArticle: string,
  desc: string,
  like: number,
  timeAgo: any,
  createdAt: Date,
  comment: Comment[]
}

interface BlogData {
  id: string,
  createdAt: TimeStamp,
  index: number,
  title: string,
  rawArticle: string,
  desc: string,
  like: number,
  comment: Comment[]
}

interface CreateArticle {
  index: number,
  title: string,
  rawArticle: string,
  desc: string,
  like: number,
  comment: Comment[]
}

interface CommentList {
  index: number,
  name: string,
  message: string,
  password: string,
  timeAgo?: any,
  createdDate?: Date,
  createdAt: TimeStamp
}

interface CreateComment {
  name: string,
  message: string,
  password: string
}
