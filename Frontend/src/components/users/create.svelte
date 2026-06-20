<script lang="ts">
    let { userModel } = $props();
    let id = $props.id();
</script>

{#if userModel.createDialog}
    <div
        class="w-full h-full text-black fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl"
    >
        <div class="w-96 bg-white p-4 rounded-md">
            <form onsubmit={(e) => userModel.createUser(e)}>
                <h2 class="text-lg font-bold">Crear Usuario</h2>

                <div class="p-2 flex flex-col">
                    <label for="fullname">Nombre de Usuario</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="text"
                        name="fullname"
                        id={`fullname-${id}`}
                    />

                </div>

                <div class="p-2 flex flex-col">
                    <label for="email">Correo Electronico</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="text"
                        name="email"
                        id={`email-${id}`}
                    />

                </div>

                  <div class="p-2 flex flex-col">
                    <label for="password">Ingrese la contraseña</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        type="password"
                        name="password"
                        id={`password-${id}`}
                    />

                </div>

                <div class="p-2 flex justify-end gap-2 mt-3">
                    <button
                        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
                        onclick={() => (userModel.createDialog = false)}
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
