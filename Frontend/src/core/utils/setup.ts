import { appStore } from "./store.svelte";

export function setTheme(document: any){
    if(
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ){
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark')
        appStore.isDarkMode = true
    }else{
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light')
        appStore.isDarkMode = false
    }
}

export function getTheme(){
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}