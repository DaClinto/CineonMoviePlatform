import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const themes = {
    burgundy: {
        name: 'Burgundy',
        color: '#5A0E24',
        gradient: 'linear-gradient(135deg, #5A0E24 0%, #2f0511 100%)'
    },
    ocean: {
        name: 'Ocean',
        color: '#1C4D8D',
        gradient: 'linear-gradient(135deg, #1C4D8D 0%, #0c2b54 100%)'
    },
    lavender: {
        name: 'Lavender',
        color: '#43334C',
        gradient: 'linear-gradient(135deg, #43334C 0%, #271a2d 100%)'
    },
    slate: {
        name: 'Slate',
        color: '#313647',
        gradient: 'linear-gradient(135deg, #313647 0%, #1a1e2b 100%)'
    },
    rust: {
        name: 'Rust',
        color: '#703B3B',
        gradient: 'linear-gradient(135deg, #703B3B 0%, #421e1e 100%)'
    }
};

export const ThemeProvider = ({ children }) => {
    // Check local storage or system preference
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('cineon_theme');
            if (savedTheme && themes[savedTheme]) return savedTheme;
        }
        return 'burgundy'; // Default
    });

    useEffect(() => {
        const selectedTheme = themes[theme];

        // Save to local storage
        localStorage.setItem('cineon_theme', theme);

        if (selectedTheme) {
            document.body.style.backgroundColor = selectedTheme.color;
            document.body.style.backgroundImage = selectedTheme.gradient;
            document.body.style.color = '#ffffff'; // All dark themes use white text
        }

    }, [theme]);

    const setThemeColor = (newTheme) => {
        if (themes[newTheme]) {
            setTheme(newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setThemeColor, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

