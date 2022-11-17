import { useDark, useToggle } from '@vueuse/core'

export const toggleDark = useToggle(useDark())
export const isDarkTrigger = useDark({
  onChanged (dark:boolean) {
    return dark
  }
})
