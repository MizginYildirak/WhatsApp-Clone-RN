import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false);

const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
        const newMode = !prevMode
        document.body.classList.toggle("dark-mode", newMode) //second parameter means if newmode is true then dark-mode class is added.
        return newMode
    })
}

  return (
   <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
    {children}
   </ThemeContext.Provider>
  )
}

export const useTheme = () => {
    return useContext(ThemeContext)
}

const styles = StyleSheet.create({})