// ** Third Party Import
import { useTranslation } from 'react-i18next'


const TranslateString = (text: string) => {
	// ** Hook
	const { t } = useTranslation()

	return `${t(text)}`
}

export default TranslateString
