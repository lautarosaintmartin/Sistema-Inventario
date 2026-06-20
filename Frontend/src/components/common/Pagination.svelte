<script lang="ts">
    let { model } = $props();
</script>

<div class="flex justify-between items-center py-4 mt-4">
    <div class="text-sm text-gray-500">
        {model.pagination?.page} de {model.pagination?.totalPages} páginas
    </div>

    <div class="flex items- gap-1">
        <div>
            <button
                class="bg-gray-600 text-white rounded-md px-1 mx-1 hover:bg-gray-700 active:scale-95 active:shadow-none transition-all"
                onclick={() => model.previousPage()}
            >
                🡠
            </button>
        </div>
        <div>
            <button
                class="bg-gray-600 text-white rounded-md px-1 mx-1 hover:bg-gray-700 active:scale-95 active:shadow-none transition-all disabled:opacity-20"
                onclick={() => model.nextPage()}
                disabled={model.pagination?.totalPages ==
                    model.pagination?.page}
            >
                🡢
            </button>
        </div>
    </div>
</div>
