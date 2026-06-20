import { http } from '@core/http'
import type { ResponseData, Pagination } from "@core/interfaces/response"
import { handleErrorToast } from '@core/utils/toast'

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
    pagination = $state<Pagination | null>(null)
    query = $state<Pick<Pagination, 'page' | 'limit'>>({
        page: 1,
        limit: 5,
    })

    async getCategory() {
        const res: any = await http.get(`${import.meta.env.PUBLIC_API_URL}/categories?page=${this.query.page}&limit=${this.query.limit}`);

        this.categories = res.data
        this.pagination = res.pagination
    }

    async createCategory(e: Event) {
        try {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            console.log(data)
            await http.post<Category>(`${import.meta.env.PUBLIC_API_URL}/categories`, data)
            this.getCategory()
            this.createDialog = false

        } catch (error) {
            handleErrorToast(error)
        }
    }

    async deleteCategory(id: number) {
        if (!this.category) return
        try {
            await http.delete(`${import.meta.env.PUBLIC_API_URL}/categories/${id}`)

            await this.getCategory()
            this.deleteDialog = false
        } catch (error) {
            handleErrorToast(error)
        }
    }

    async editCategory(id: number, e: Event) {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            if (!this.category) return
            await http.patch(`${import.meta.env.PUBLIC_API_URL}/categories/${id}`, data)

            this.getCategory();
            this.editDialog = false;
        } catch (error) {
            handleErrorToast(error)
        }
    }

    async nextPage(){
        if (!this.pagination ) return
        this.query.page++
        await this.getCategory()
    }

    async previousPage(){
        if (this.query.page <= 1) return
        this.query.page--
        await this.getCategory()
    }



    showCreateModal() {
        this.category = null
        this.createDialog = true
    }

    showDeleteModal(category: Category) {
        this.category = category
        this.deleteDialog = true
    }

    showEditModal(cateogry: Category) {
        this.category = cateogry
        this.editDialog = true
    }
}

export const categoryModel = new CategoryModel();