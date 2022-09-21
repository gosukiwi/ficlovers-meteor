import { i18n } from "meteor/universe:i18n";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import "/imports/locales/en-us.i18n.yml";

const localeContext = createContext(i18n.getLocale());

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(i18n.getLocale());
  useEffect(() => {
    i18n.onChangeLocale(setLocale);
    return () => {
      i18n.offChangeLocale(setLocale);
    };
  }, [setLocale]);

  return (
    <localeContext.Provider value={locale}>{children}</localeContext.Provider>
  );
}

export function useLocale() {
  return useContext(localeContext);
}

export function useTranslator(prefix = "") {
  const locale = useLocale();
  return useCallback(
    (key, ...args) => i18n.getTranslation(prefix, key, ...args),
    [locale]
  );
}

export const { __ } = i18n;
export default i18n;
