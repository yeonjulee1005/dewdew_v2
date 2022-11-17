import { ElMessage, ElNotification } from 'element-plus'

export const useAlarm = () => {
  const notify = (title:string, type:any, message:string, showClose:boolean, duration:number, offset:number) => {
    ElNotification({
      title,
      message,
      showClose,
      type,
      duration,
      offset
    })
  }

  const message = (type:any, message:string, showClose:boolean, duration:number) => {
    ElMessage({
      type,
      message,
      showClose,
      duration
    })
  }

  const returnErrorMessage = (messageData:any, extraText:string) => {
    if (!messageData.data) { return }
    if (messageData.data.statusCode >= 300) {
      notify('', 'warning', messageData.data.message.concat(': ', String(messageData.data.statusCode)), true, 3000, 0)
      return
    }
    const errorMessage = messageData.data.error.message
    switch (messageData) {
      case true :
        notify('', 'warning', extraText, true, 3000, 0)
        break
      default :
        notify('', 'warning', errorMessage, true, 3000, 0)
    }
  }
  return {
    notify,
    message,
    returnErrorMessage
  }
}
