<script lang="ts">
    import { onMount } from "svelte";
    import { productModel } from "@components/product/product.svelte"
    import Create from "@components/product/Create.svelte"
    import Edit from "@components/product/Edit.svelte";
    import Delete from "@components/product/Delete.svelte";

   onMount(async () => {
        await productModel.getProduct()
    });

</script>

<Delete { productModel } />
<Edit { productModel } />
<Create { productModel } />

<div class = "w-full flex justify-end mb-4">
    <button 
        class = "bg-gray-800 text-xl text-white rounded-md px-2 py-1 border border-white"
        onclick={(e) => productModel.showCreateModal()}
    >
        ➕
    </button>
</div>

<table class="flex-1 w-full bg-slate-400 dark:bg-gray-900 dark:text-white">
    <thead>
         <tr class="">
            <th class="bg-gray-800 text-white text-left px-2">Nombre</th>
            <th class="bg-gray-800 text-white text-left px-2">Stock</th>
            <th class="bg-gray-800 text-white px-2">Categoria</th>
            <th class="bg-gray-800 text-white px-2">Precio Unitario</th>
            <th class="bg-gray-800 text-white px-2">Acciones</th>
        </tr>
    </thead>

    <tbody>
        {#each productModel.products as product}
             <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                <td class="px-2 py-1 capitalize">{product.name}</td>
                <td class="px-2 py-1">{product.stock}</td>
                <td class="px-2 py-1">{product.categoria?.name}</td>
                <td class="px-2 py-1">{productModel.formatPrice(product.precioUnitario)}</td>
                <td>
                    <div class="flex justify-center gap-2">
                        <button
                            onclick={() => ((productModel.showEditModal(product)))}
                            aria-label="Editar"
                            class="bg-gray-800 text-white px-3 py-2 rounded-md my-1"
                        >
                            🖋️
                        </button>
                        <button
                            onclick={() => ((productModel.showDeleteModal(product)))}
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