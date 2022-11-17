import { useI18n } from 'vue-i18n'

export const useLocale = () => {
  const { t, locale } = useI18n()
  return { t, locale }
}
