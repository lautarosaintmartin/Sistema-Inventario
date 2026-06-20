<script lang="ts">
    import { categoryModel } from "@components/category/category.svelte";
    import { onMount } from "svelte";
    let { productModel } = $props()

     onMount(async () => {
        await categoryModel.getCategory() 
    });

</script>

{#if productModel.createDialog}
    <div
        class="w-full h-full text-black fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="w-96 bg-white p-4 rounded-md">
            <form onsubmit={(e) => productModel.createProduct(e)}>
                <h2 class="text-lg font-bold">Crear Producto</h2>

                <div class="p-2 flex flex-col">
                    <label for="name">Nombre de Producto</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="text"
                        name="name"
                        id="name"
                    />
                    
                </div>

                <div class="p-2 flex flex-col">
                    <label for="stock">Stock Disponible</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="number"
                        name="stock"
                    />

                </div>

                 <div class="p-2 flex flex-col">
                    <label for="precioUnitario">Precio Unitario</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="number"
                        name="precioUnitario"
                    />
                </div>

                 <div class="p-2 flex flex-col">
                    <label for="categoria">Categoria</label>
                    <select 
                        name="id_categoria" 
                        id="id_categoria"
                        >
                        <option value="">Seleccionar Categoria</option>
                        {#each  categoryModel.categories as category}
                            <option 
                            value= {category.id}
                            >
                                {category.name}
                            </option>
                        {/each}
                    </select>

                </div>

                 <div class="p-2 flex justify-end gap-2 mt-3">
                    <button
                        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
                        onclick={() => (productModel.createDialog = false)}
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
