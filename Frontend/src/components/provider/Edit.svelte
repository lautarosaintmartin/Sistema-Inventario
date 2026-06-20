<script lang="ts">
    let { providerModel } = $props();
</script>

{#if providerModel.editDialog}
    <div
        class="w-full h-full text-black fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="w-96 bg-white p-4 rounded-md">
            <form onsubmit={(e) => providerModel.editProvider(providerModel.provider.id, e)}>
                <h2 class="text-lg font-bold">Editar Proveedor</h2>

                <div class="p-2 flex flex-col">
                    <label for="name">Nombre de Proveedor</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="text"
                        name="name"
                        id={`name`}
                        value={providerModel.provider.name}
                    />


                </div>

                <div class="p-2 flex flex-col">
                    <label for="email">Correo Electronico</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="email"
                        name="email"
                        id={`email`}
                        value={providerModel.provider.email}
                    />

                </div>

                
                <div class="p-2 flex flex-col">
                    <label for="phone">Numero Telefonico</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="text"
                        name="phone"
                        id={`phone`}
                        value={providerModel.provider.phone}
                    />
                </div>

                <div class="p-2 flex justify-end gap-2 mt-3">
                    <button
                        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
                        onclick={() => (providerModel.editDialog = false)}
                    >
                        Cancelar
                    </button>
                    <button 
                        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                        type = "submit"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
