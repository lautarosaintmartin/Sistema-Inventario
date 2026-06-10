import { http } from '@core/http'

export interface Category {
    id: number
    name: string
}

class CategoryModel {

    category = $state<Category | null>(null) //usamos para guardar lo que selecciona un usuario
    categories = $state<Category[]>([]) //contiene 
    deleteDialog = $state(false)
    editDialog = $state(false)
    createDialog = $state(false)
    messageError = $state({ name: '' })


    async getCategory() {
        this.categories = await http.get(`${import.meta.env.PUBLIC_API_URL}/categories`)
    }

    async createCategory(e: Event) {
       try{
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            console.log(data)
            await http.post<Category>(`${import.meta.env.PUBLIC_API_URL}/categories`, data)
            this.getCategory()
            this.createDialog = false

       }catch(error: any){
            console.log(error)
            this.messageError = error
       }
    }

    async deleteCategory(id: number) {
        if (!this.category) return
        try {
            await http.delete(`${import.meta.env.PUBLIC_API_URL}/categories/${id}`)

            await this.getCategory()
            this.deleteDialog = false
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async editCategory(id: number, e: Event) {
        try{
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            if (!this.category) return
            await http.patch(`${import.meta.env.PUBLIC_API_URL}/categories/${id}`, data)

            this.getCategory();
            this.editDialog = false;
        }catch(error: any){
            this.messageError = error
        }
    }

    showCreateModal() {
        this.category = null
        this.createDialog = true
        this.messageError = { name: '' }
    }

    showDeleteModal(category: Category) {
        this.category = category
        this.deleteDialog = true
    }

    showEditModal(cateogry: Category) {
        this.category = cateogry
        this.editDialog = true
        this.messageError = { name: '' }
    }
}

export const categoryModel = new CategoryModel();