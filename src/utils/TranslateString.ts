import { useTranslation } from 'react-i18next'

export const useTranslateString = () => {
	const { t } = useTranslation()

	const TranslateString = (text: string) => {
		return `${t(text)}`
	}

	return TranslateString
}
