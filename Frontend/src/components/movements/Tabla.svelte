<script lang="ts">
    import { onMount } from "svelte";
    import Delete from "@components/movements/Delete.svelte";
    import Edit from "@components/movements/Edit.svelte";
    import { movementModel } from "./movement.svelte";
    import Create from "@components/movements/Create.svelte";
    import { userModel } from "@components/users/user.svelte";
    import { categoryModel } from "@components/category/category.svelte";

    onMount(async () => {
        await movementModel.getMovements()
        await userModel.getUsers()
        await categoryModel.getCategory()
    });
</script>

<Delete { movementModel } />
<Edit { movementModel } />
<Create {movementModel} />

<div class = "w-full flex justify-end mb-4">
    <button 
        class = "bg-gray-800 text-xl text-white rounded-md px-2 py-1 border border-white"
        onclick={(e) => movementModel.showCreateModal()}
    >
        ➕
    </button>
</div>

<table class="flex-1 w-full bg-slate-400 dark:bg-gray-900 dark:text-white">
    <thead>
        <tr>
            <th class="bg-gray-800 text-white text-left px-2">ID</th>
            <th class="bg-gray-800 text-white text-left px-2">Tipo</th>
            <th class="bg-gray-800 text-white text-left px-2">Fecha</th>
            <th class="bg-gray-800 text-white text-left px-2">Cantidad</th>
            <th class="bg-gray-800 text-white text-left px-2">Precio Unitario</th>
            <th class="bg-gray-800 text-white text-left px-2">Producto</th>
            <th class="bg-gray-800 text-white text-left px-2">Usuario</th>
            <th class="bg-gray-800 text-white px-2">Acciones</th>
        </tr>
    </thead>
    <tbody>
        {#each movementModel.movements as movement}
            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                <td class="px-2 py-1">#{movement.id}</td>
                <td class="px-2 py-1">{movement.type}</td>
                <td class="px-2 py-1">{movementModel.formatDate(movement.date)}</td>
                <td class="px-2 py-1">{movement.amount}</td>
                <td class="px-2 py-1">{movement.priceUnit}</td>
                <td class="px-2 py-1">{movement.product?.name ?? 'Producto eliminado'}</td>
                <td class="px-2 py-1">{movement.user?.fullname ?? 'Usuario eliminado'}</td>
                <td>
                    <div class="flex justify-center gap-2">
                        <button
                            onclick={() => movementModel.showEditModal(movement)}
                            aria-label="Editar"
                            class="bg-gray-800 text-white px-3 py-2 rounded-md my-1"
                        >
                            🖋️
                        </button>
                        <button
                            onclick={() => movementModel.showDeleteModal(movement)}
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