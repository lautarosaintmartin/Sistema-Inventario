import { setTheme } from "./setup";

class AppStore {
    isDarkMode = $state(false);
    isSideBarOpen = $state(true);

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('color-theme', this.isDarkMode ? 'dark' : 'light');
        window.document.documentElement.classList.toggle('dark', this.isDarkMode);
    }
}

export const appStore = new AppStore()