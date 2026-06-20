import { http } from '@core/http'
import type { Category } from '@components/category/category.svelte'
import { handleErrorToast } from '@core/utils/toast'

interface Product {
    id: number
    name: string
    stock: number
    precioUnitario: number
    categoria: Category
}

class ProductModel {

    product = $state<Product | null>(null) //usamos para guardar lo que selecciona un usuario
    products = $state<Product[]>([]) //contiene 
    deleteDialog = $state(false)
    editDialog = $state(false)
    createDialog = $state(false)

    async getProduct() {
        this.products = await http.get(`${import.meta.env.PUBLIC_API_URL}/products`)
    }

    async createProduct(e: Event) {
        try {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            await http.post<Product>(`${import.meta.env.PUBLIC_API_URL}/products`, data)
            this.getProduct()
            this.createDialog = false

        } catch (error) {
            handleErrorToast(error)
        }
    }

    async deleteProduct(id: number) {
        if (!this.product) return
        try {
            await http.delete(`${import.meta.env.PUBLIC_API_URL}/products/${id}`)

            await this.getProduct()
            this.deleteDialog = false
        } catch (error) {
            handleErrorToast(error)
        }
    }

    async editProduct(id: number, e: Event) {
        try {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            await http.patch(`${import.meta.env.PUBLIC_API_URL}/products/${id}`, data)

            this.getProduct();
            this.editDialog = false;
        } catch (error) {
            handleErrorToast(error)
        }
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS"
        } as const).format(price)
    }

    showCreateModal() {
        this.product = null
        this.createDialog = true
    }

    showDeleteModal(product: Product) {
        this.product = product
        this.deleteDialog = true
    }

    showEditModal(product: Product) {
        this.product = product
        this.editDialog = true
    }
}

export const productModel = new ProductModel();