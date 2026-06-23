<script lang="ts">
    import { onMount } from "svelte";
    import { categoryModel } from "@components/category/category.svelte"
    import Create from "./create.svelte";
    import Edit from "./edit.svelte";
    import Delete from "./delete.svelte";
    import Pagination from "@components/common/Pagination.svelte";

   onMount(async () => {
        await categoryModel.getCategory() 
    });

</script>

<Delete {categoryModel} />
<Edit { categoryModel }/>
<Create {categoryModel} />

<div class = "w-full flex justify-end mb-4">
    <button 
        class = "bg-gray-800 text-xl text-white rounded-md px-2 py-1 border border-white"
        onclick={(e) => categoryModel.showCreateModal()}
    >
        ➕
    </button>
</div>

<table class="flex-1 w-full bg-slate-400 dark:bg-gray-900 dark:text-white">
    <thead>
         <tr class="">
            <th class="bg-gray-800 text-white text-left px-2">Nombre</th>
            <th class="bg-gray-800 text-white px-2 flex justify-end">Acciones</th>
        </tr>
    </thead>

    <tbody>
        {#each categoryModel.categories as category}
             <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                <td class="px-2 py-1 capitalize">{category.name}</td>
                <td>
                    <div class="flex justify-end gap-2">
                        <button
                            onclick={() => ((categoryModel.showEditModal(category)))}
                            aria-label="Editar"
                            class="bg-gray-800 text-white px-3 py-2 rounded-md my-1"
                        >
                            🖋️
                        </button>
                        <button
                            onclick={() => ((categoryModel.showDeleteModal(category)))}
                            aria-label="Eliminar"
                            class="bg-red-600 text-white px-3 py-2 rounded-md my-1"
                        >
                            🗑
                        </button>
                    </div>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<Pagination model={categoryModel} />