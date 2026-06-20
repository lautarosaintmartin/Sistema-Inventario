import { http } from '@core/http'
import { handleErrorToast } from '@core/utils/toast'

export enum MovementType {
    IN = 'IN',
    OUT = 'OUT'
}

interface Movement
{
    id: number
    type: MovementType
    date: string
    amount: number
    priceUnit: number
    product: { id: number, name: string }
    user: { id: number, fullname: string }
}

class MovementModel
{
    movement = $state <Movement | null>(null)
    movements = $state <Movement[]>([])
    deleteDialog = $state(false)
    editDialog = $state(false)
    createDialog = $state(false)

    async getMovements()
    {
        this.movements = await http.get(`${import.meta.env.PUBLIC_API_URL}/movements`);
    }

    async deleteMovements(id: number)
    {
        await http.delete(`${import.meta.env.PUBLIC_API_URL}/movements/${id}`);
        this.getMovements();
        this.deleteDialog = false;
    }

    async editMovement(id: number, e: Event)
    {
        try{
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            await http.patch(`${import.meta.env.PUBLIC_API_URL}/movements/${id}`, data);
            this.getMovements();
            this.editDialog = false;
        }catch(error){
            handleErrorToast(error)
        }
    }

    async createMovements(e: Event){
        try{
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            //   // Convertir fecha a ISO8601
            // if (data.date) {
            // data.date = new Date(data.date as string + 'T00:00:00.000Z').toISOString()
            // }
            
            await http.post<Movement>(`${import.meta.env.PUBLIC_API_URL}/movements`, data)
            this.getMovements()
            this.createDialog = false
        }catch(error){
            handleErrorToast(error)
        }
    }

    showCreateModal(){
        this.movement = null
        this.createDialog = true
    }

    showEditModal(movement: Movement)
    {
        this.movement = movement
        this.editDialog = true
    }

    showDeleteModal(movement: Movement){
        this.movement = movement;
        this.deleteDialog = true;
    }

    formatDate(date:string){
        const dateObj = new Date(date)
        return new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(dateObj)
    }

    formatDateInput(date: string){
        const dateObj = new Date(date)
        return new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(dateObj)
    }
}

export const movementModel = new MovementModel()