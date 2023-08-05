export const useUi = () => {
  const roundUnitCount = <T extends number>(unit:T, digit:T) => {
    const result = Math.round((unit * digit)) / digit
    return result
  }

  const absCount = (count:number) => {
    return Math.abs(count)
  }

  const diffRatio = <T extends number>(current:T, past:T) => {
    return (current - past) * 100 / past
  }

  const comma = (val:number) => {
    return String(val).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  }

  const uncomma = (val:number) => {
    return String(val).replace(/[^\d]+/g, '')
  }

  const checkHyperLink = (link:string) => {
    const regLink = /(mailto:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|(((?:https?)|(?:ftp)):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm
    let returnValue = false

    !regLink.test(link)
      ? returnValue = false
      : returnValue = true
    return returnValue
  }

  const checkYoutubeLink = (link:string) => {
    const regLink = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&#38;);v=))([a-zA-Z0-9\-_]{11})?(?:(?:\?|&|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?/g
    let returnValue = false

    !regLink.test(link)
      ? returnValue = false
      : returnValue = true
    return returnValue
  }

  const checkEmail = (val:string) => {
    const regEmail = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
    if (!regEmail.test(val)) {
      return false
    } else {
      return true
    }
  }

  const nameMasking = (strName:string) => {
    if (!strName) {
      return
    }
    if (strName.length > 2) {
      const originName = strName.split('')
      originName.forEach((_name, index) => {
        if (index === 0 || index === originName.length - 1) { return }
        originName[index] = '*'
      })
      const joinName = originName.join()
      return joinName.replace(/,/g, '')
    } else {
      const pattern = /.$/
      return strName.replace(pattern, '*')
    }
  }

  const emailMasking = (email:string) => {
    if (!email) {
      return
    }
    const strLength = email.toString().split('@')[0].length - 3
    const id = email.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*')
    const mail = email.split('@')[1]
    if (!email) { return null }
    return id.concat('@', mail)
  }

  const mobileMasking = (phone:string) => {
    const strLength = phone?.length
    if (!strLength) {
      return 0
    }
    const splitPhone = phone.split('-')
    let result = ''
    switch (strLength) {
      case 0 :
        result = ''
        break
      case 11 :
        result = phone.substr(0, 3).concat('****', phone.substr(7))
        break
      case 13 :
        result = splitPhone[0].concat('-****-', splitPhone[2])
        break
    }
    return result
  }

  const copyClipBoard = (val:any) => {
    const text = document.createElement('textarea')
    document.body.appendChild(text)
    text.value = val
    text.select()
    document.execCommand('copy')
    document.body.removeChild(text)
  }

  const getCurrentDate = (year:string, month:string, count:number) => {
    return new Date(parseInt(year), parseInt(month) - 1, count)
  }

  const getLastDate = <T extends string>(year:T, month:T) => {
    return new Date(parseInt(year), parseInt(month) + 1, 0)
  }

  const dateFormat = (date:any, param:boolean, afterMonth:number, afterDay:number) => {
    let addMonth = 0
    let addDay = 0
    if (afterMonth) {
      addMonth = afterMonth
    }
    if (afterDay) {
      addDay = afterDay
    }
    let res = ''
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1 + addMonth)).slice(-2)
    const day = ('0' + (date.getDate() + addDay)).slice(-2)
    if (!param) {
      res = String(year).concat('-', month, '-', day)
      return res
    }
    res = String(year).concat(month, day)
    return res
  }

  const dateMonthFormat = (date:any) => {
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    return String(year).concat('-', month)
  }

  const calculateDay = (startDate:any, endDate:any) => {
    return (endDate.getTime() - startDate.getTime()) / (3600 * 1000 * 24)
  }

  return {
    roundUnitCount,
    absCount,
    diffRatio,
    comma,
    uncomma,
    checkHyperLink,
    checkYoutubeLink,
    checkEmail,
    nameMasking,
    emailMasking,
    mobileMasking,
    copyClipBoard,
    getCurrentDate,
    getLastDate,
    dateFormat,
    dateMonthFormat,
    calculateDay
  }
}
