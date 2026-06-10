<script lang="ts">
    import { productModel } from "../product/product.svelte";
    import { userModel } from "../users/user.svelte";
    import { MovementType } from "./movement.svelte";

    let { movementModel } = $props();
    let id = $props.id();
    let now = new Date();

</script>

{#if movementModel.createDialog}
    <div
        class="w-full h-full text-black fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="bg-white p-4 rounded-md w-auto">
            <form onsubmit={(e) => movementModel.createMovements(e)}>
                <h2 class="text-lg font-bold">Crear Movimiento</h2>

                <div class="grid grid-cols-2 gap-4">
                    <div class="p-2 flex flex-col">
                        <label for="type">Tipo de Movimiento</label>
                        <select
                            class="border border-gray-400 rounded-md p-2"
                            name="type"
                            id={`type-${id}`}
                        >
                            <option value="">Seleccionar Tipo</option>
                            {#each Object.entries(MovementType) as [key, value]}
                                <option value={key}>{value}</option>
                            {/each}
                        </select>

                        {#if movementModel.messageError?.type}
                            <p class="text-red-600">
                                {movementModel.messageError.type}
                            </p>
                        {/if}
                    </div>

                    <div class="p-2 flex flex-col">
                        <label for="date">Fecha</label>
                        <input
                            class="border border-gray-400 rounded-md p-2"
                            type="date"
                            name="date"
                            id={`date`}
                            value={movementModel.formatDateInput(
                                now.toISOString(),
                            )}
                        />

                        {#if movementModel.messageError?.date}
                            <p class="text-red-600">
                                {movementModel.messageError.date}
                            </p>
                        {/if}
                    </div>

                    <div class="p-2 flex flex-col">
                        <label for="amount">Cantidad</label>
                        <input
                            class="border border-gray-400 rounded-md p-2"
                            type="number"
                            name="amount"
                            min="1"
                            id={`amount`}
                        />

                        {#if movementModel.messageError?.amount}
                            <p class="text-red-600">
                                {movementModel.messageError.amount}
                            </p>
                        {/if}
                    </div>

                    <div class="p-2 flex flex-col">
                        <label for="priceUnit">Precio Unitario</label>
                        <input
                            class="border border-gray-400 rounded-md p-2"
                            type="number"
                            name="priceUnit"
                            min="0"
                            step="0.01"
                            id={`priceUnit-${id}`}
                        />

                        {#if movementModel.messageError?.priceUnit}
                            <p class="text-red-600">
                                {movementModel.messageError.priceUnit}
                            </p>
                        {/if}
                    </div>

                    <div class="p-2 flex flex-col">
                        <label for="productId">Producto</label>
                        <select
                            class="border border-gray-400 rounded-md p-2"
                            name="productId"
                            id={`productId-${id}`}
                        >
                            <option value="">Seleccioná un producto</option>
                            {#each productModel.products as product}
                                <option value={product.id}
                                    >{product.name}</option
                                >
                            {/each}
                        </select>
                    </div>

                    <div class="p-2 flex flex-col">
                        <label for="userId">Usuario</label>
                        <select
                            class="border border-gray-400 rounded-md p-2"
                            name="userId"
                            id={`userId-${id}`}
                        >
                            <option value="">Seleccioná un usuario</option>
                            {#each userModel.users as user}
                                <option value={user.id}>{user.fullname}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="p-2 flex justify-end gap-2 mt-3">
                    <button
                        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
                        onclick={() => (movementModel.createDialog = false)}
                    >
                        Cancelar
                    </button>
                    <button
                        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                        type="submit"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
