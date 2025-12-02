import { createContext, useContext, useState, useEffect } from "react"

import enTranslations from "../locales/en.json"
import ptTranslations from "../locales/pt.json"
import esTranslations from "../locales/es.json"
import frTranslations from "../locales/fr.json"

const translations = {
  en: enTranslations,
  pt: ptTranslations,
  es: esTranslations,
  fr: frTranslations,
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Tenta obter idioma do localStorage
    const saved = localStorage.getItem("koz-language")
    if (saved) return saved

    // Detecta idioma do browser
    const browserLang = navigator.language.split("-")[0]
    if (["en", "pt", "es", "fr"].includes(browserLang)) {
      return browserLang
    }

    // Padrão:
    return "en"
  })

  useEffect(() => {
    localStorage.setItem("koz-language", language)
    document.documentElement.lang = language
  }, [language])

  const t = (key) => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
