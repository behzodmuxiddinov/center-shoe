import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './lng/ru.json'
import uz from './lng/uz.json'

i18n
.use(initReactI18next)
.init({
    resources : {
        uz : {
            translation : uz
        },
        ru : {
            translation : ru
        }
    },
    lng : "uz",
})

export default i18n