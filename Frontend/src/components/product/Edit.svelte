<script lang="ts">
    import { categoryModel } from "@components/category/category.svelte";

    let { productModel } = $props();
</script>

{#if productModel.editDialog}
    <div
        class="w-full h-full text-black fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="w-96 bg-white p-4 rounded-md">
            <form
                onsubmit={(e) =>
                    productModel.editProduct(productModel.product!.id, e)}
            >
                <h2 class="text-lg font-bold">Editar Producto</h2>

                <div class="p-2 flex flex-col">
                    <label for="name">Nombre de Producto</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="text"
                        name="name"
                        id={`name`}
                        value={productModel.product?.name}
                    />

                    {#if productModel.messageError?.name}
                        <p class="text-red-600 text-sm mt-1">
                            {productModel.messageError.name}
                        </p>
                    {/if}
                </div>

                <div class="p-2 flex flex-col">
                    <label for="stock">Stock</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="number"
                        name="stock"
                        id="stock"
                        value={productModel.product?.stock}
                    />

                    {#if productModel.messageError?.stock}
                        <p class="text-red-600 text-sm mt-1">
                            {productModel.messageError.stock}
                        </p>
                    {/if}
                </div>

                <div class="p-2 flex flex-col">
                    <label for="precioUnitario">Precio Unitario</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="number"
                        name="precioUnitario"
                        id="precioUnitario"
                        value={productModel.product?.precioUnitario}
                    />

                    {#if productModel.messageError?.precioUnitario}
                        <p class="text-red-600 text-sm mt-1">
                            {productModel.messageError.precioUnitario}
                        </p>
                    {/if}
                </div>

                   <div class="p-2 flex flex-col">
                    <label for="name">Nombre de Categoria</label>
                       <select 
                        name="id_categoria" 
                        id="id_categoria"
                        value={productModel?.product?.categoria?.id}
                        >
                            {#each  categoryModel.categories as category}
                                <option 
                                value= {category.id}
                                >
                                    {category.name}
                                </option>
                            {/each}
                    </select>

                    {#if productModel.messageError?.categoria}
                        <p class="text-red-600 text-sm mt-1">{productModel.messageError.categoria}</p>
                    {/if}
                    
                </div>

                <div class="p-2 flex justify-end gap-2 mt-3">
                    <button
                        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
                        onclick={() => (productModel.editDialog = false)}
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
