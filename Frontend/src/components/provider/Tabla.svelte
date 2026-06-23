<script lang="ts">
    import { onMount } from "svelte";
    import Delete from "@components/provider/Delete.svelte";
    import Edit from "@components/provider/Edit.svelte";
    import { providerModel } from "@components/provider/provider.svelte";
    import Create from "@components/provider/Create.svelte";

    onMount(async () => {
        await providerModel.getProvider()
    });
</script>

<Delete { providerModel } />
<Edit { providerModel } />
<Create {providerModel} />

<div class = "w-full flex justify-end mb-4">
    <button 
        class = "bg-gray-800 text-xl text-white rounded-md px-2 py-1 border border-white"
        onclick={(e) => providerModel.showCreateModal()}
    >
        ➕
    </button>
</div>

<table class="flex-1 w-full bg-slate-400 dark:bg-gray-900 dark:text-white">
    <thead>
        <tr class="">
            <th class="bg-gray-800 text-white text-left px-2">Nombre</th>
            <th class="bg-gray-800 text-white text-left px-2">Email</th>
            <th class="bg-gray-800 text-white text-left px-2">Numero Telefonico</th>
            <th class="bg-gray-800 text-white px-2">Acciones</th>
        </tr>
    </thead>
    <tbody>
        {#each providerModel.providers as provider}
            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                <td class="px-2 py-1 capitalize">{provider.name}</td>
                <td class="px-2 py-1">{provider.email}</td>
                <td class="px-2 py-1">{provider.phone}</td>
                <td>
                    <div class="flex justify-center gap-2">
                        <button
                            onclick={() => ((providerModel.showEditModal(provider)))}
                            aria-label="Editar"
                            class="bg-gray-800 text-white px-3 py-2 rounded-md my-1"
                        >
                            🖋️
                        </button>
                        <button
                            onclick={() => ((providerModel.showDeleteModal(provider)))}
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
