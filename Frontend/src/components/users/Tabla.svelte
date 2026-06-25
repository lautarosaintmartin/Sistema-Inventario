<script lang="ts">
    import { onMount } from "svelte";
    import Delete from "./delete.svelte";
    import Edit from "./edit.svelte";
    import { userModel } from "./user.svelte";
    import Create from "./create.svelte";
    import Pagination from "@components/common/Pagination.svelte";

    onMount(async () => {
        await userModel.getUsers()
    });
</script>

<Delete { userModel } />
<Edit { userModel } />
<Create {userModel} />

<div class = "w-full flex justify-end mb-4">
    <button 
        class = "bg-gray-800  text-white rounded-md px-2 py-1 border border-white"
        onclick={(e) => userModel.showCreateModal()}
    >
        Agregar Usuario
    </button>
</div>

<table class="flex-1 w-full bg-slate-400 dark:bg-gray-900 dark:text-white">
    <thead>
        <tr class="">
            <th class="bg-gray-800 text-white text-left px-2">Nombre</th>
            <th class="bg-gray-800 text-white text-left px-2">Email</th>
            <th class="bg-gray-800 text-white px-2">Acciones</th>
        </tr>
    </thead>
    <tbody>
        {#each userModel.users as user}
            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                <td class="px-2 py-1 capitalize">{user.fullname}</td>
                <td class="px-2 py-1">{user.email}</td>
                <td>
                    <div class="flex justify-center gap-2">
                        <button
                            onclick={() => ((userModel.showEditModal(user)))}
                            aria-label="Editar"
                            class="bg-gray-800 text-white px-2 py-1 rounded-md my-1"
                        >
                            Editar
                        </button>
                        <button
                            onclick={() => ((userModel.showDeleteModal(user)))}
                            aria-label="Eliminar"
                            class="bg-red-600 text-white px-2 py-1 rounded-md my-1"
                        >
                            Eliminar
                        </button>
                    </div>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<Pagination model={userModel} />