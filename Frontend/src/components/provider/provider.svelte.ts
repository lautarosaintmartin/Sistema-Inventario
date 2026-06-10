import { http } from '@core/http'

interface Provider {
    id: number
    name: string
    email: string
    phone: string
}

class ProviderModel {
    provider = $state<Provider | null>(null)
    providers = $state<Provider[]>([])
    createDialog = $state(false)
    editDialog = $state(false)
    deleteDialog = $state(false)
    messageError = $state({ name: '', email: '', phone: '' })


    async getProvider() {
        this.providers = await http.get(`${import.meta.env.PUBLIC_API_URL}/providers`)
    }

    async deleteProvider(id: number) {
        await http.delete(`${import.meta.env.PUBLIC_API_URL}/providers/${id}`)
        this.getProvider()
        this.deleteDialog = false
    }

    async editProvider(id: number, e: Event) {
        try {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            await http.patch(`${import.meta.env.PUBLIC_API_URL}/providers/${id}`, data)
            this.getProvider()
            this.editDialog = false

        } catch (error: any) {
            this.messageError = error
        }
    }

    async createProvider(e: Event){
        try{
            this.messageError = { name: '', email: '', phone: '' }

            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            await http.post<Provider>(`${import.meta.env.PUBLIC_API_URL}/providers`, data)
            this.getProvider()
            this.createDialog = false

        }catch(error: any){
            this.messageError = error
        }
    }

    showCreateModal(){
        this.provider = null
        this.createDialog = true
        this.messageError = {name: '', email: '', phone: ''}
    }

    showEditModal(provider: Provider){
        this.provider = provider
        this.editDialog = true
    }

    showDeleteModal(provider: Provider){
        this.provider = provider
        this.deleteDialog = true
    }
}

export const providerModel = new ProviderModel() 