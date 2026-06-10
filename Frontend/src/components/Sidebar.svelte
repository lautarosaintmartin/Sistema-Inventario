<script lang="ts">
    import { ROUTES } from "@core/utils/router";
    import { appStore } from "@core/utils/store.svelte";
    
    let { activePage } = $props();


</script>

<aside class = "bg-gray-200 dark:bg-slate-800  w-40 flex flex-col gap-2 p-2 transition-colors duration-300">
    <div class = "p-2">
        <h1 class = "text-center font-bold uppercase dark:text-white">Mi Inventario</h1>
    </div>

    {#each ROUTES.filter(x => !x.public) as route}
        <a href = {route.path} class="text-black text-shadow-md py-1 px-2 bg-gray-300 rounded-md transition hover:scale-95">{route.name} </a>
    {/each}

    <div class = "p-2 flex justify-center">
        <button onclick={() => appStore.toggleDarkMode()} class = "bg-slate-900 dark:bg-slate-200 text-white px-4 ý-2 rounded-md transition-colors duration-300 hover:scale-95"> 
            {appStore.isDarkMode ? '☀️' : '🌙'}
        </button>

    </div>
</aside>