<script lang="ts">
    let { categoryModel } = $props()
    let id = $props.id();
</script>

{#if categoryModel.deleteDialog}
    <dialog
        open={categoryModel.deleteDialog}
        class="w-full h-full fixed top-0 lext-0 flex items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="bg-white p-4 rounded-md w-120">
            <div class="p-4 flex justify-center">
                <h2 class="text-lg font-bold">
                    Desea eliminar la categoria {categoryModel.category.name}
                </h2>
            </div>

            <div class="p-2 flex justify-end gap-2 mt-3">
                <button
                    class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
                    onclick={() => (categoryModel.deleteDialog = false)}
                >
                    Cancelar
                </button>
                <button
                    class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                    onclick={() => (categoryModel.deleteCategory(categoryModel.category.id))}
                >
                    Eliminar
                </button>
            </div>
        </div>
    </dialog>
{/if}