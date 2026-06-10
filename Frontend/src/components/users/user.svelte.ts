import { http } from '@core/http'

interface User
{
    id: number;
    fullname: string;
    email: string;
}

class UserModel
{
    user = $state <User | null>(null)
    users = $state <User[]>([])
    deleteDialog = $state(false)
    editDialog = $state(false)
    createDialog = $state(false)
    messageError = $state({ fullname: '', email: '', password: '' })

    async getUsers()
    {
        this.users = await http.get(`${import.meta.env.PUBLIC_API_URL}/users`);
    }

    async deleteUser(id: number)
    {
        await http.delete(`${import.meta.env.PUBLIC_API_URL}/users/${id}`);
        this.getUsers();
        this.deleteDialog = false;
    }

    async editUser(id: number, e: Event)
    {
        try{
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)

            await http.patch(`${import.meta.env.PUBLIC_API_URL}/users/${id}`, data);
            this.getUsers();
            this.editDialog = false;
        }catch(error: any){
            this.messageError = error
        }
    }

    async createUser(e: Event){
        try{
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            const data = Object.fromEntries(formData)
            
            await http.post<User>(`${import.meta.env.PUBLIC_API_URL}/users`, data)
            this.getUsers()
            this.createDialog = false
        }catch(error: any){
            this.messageError = error
        }
    }

    showCreateModal(){
        this.user = null
        this.createDialog = true
        this.messageError = { fullname: '', email: '', password: '' }
    }

    showEditModal(user:User)
    {
        this.user = user
        this.editDialog = true
    }

    showDeleteModal(user:User){
        this.user = user;
        this.deleteDialog = true;
    }
}

export const userModel = new UserModel()