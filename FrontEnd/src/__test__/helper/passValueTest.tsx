import mockValue from "@/__mocks__/mockValues";
import { ErroType } from "@/app/_constructor/_Types";
const user = {
        id: 0,
        UserName: 'teste',
        Password: 'password',
        Email: 'email@email.com',
        Token: 'token',
        myTasks: ['1', '3', '5'],
        createdAt: new Date()
}
let Ftasks = [{
        id: '1',
        Nome: "Planejar reunião da equipe",
        Descricao: "Preparar agenda e slides para a reunião semanal.",
        Status: "Pendente",
        Priority: "Alta",
        createdAt: new Date("2025-07-01T09:00:00Z"),
    }, {
        id: '3',
        Nome: "Revisar código do módulo de relatórios",
        Descricao: "Verificar bugs e otimizações de performance.",
        Status: "Revisão",
        Priority: "Média",
        createdAt: new Date("2025-07-02T11:00:00Z"),
    }, {
        id: '5',
        Nome: "Corrigir bug de exibição no mobile",
        Descricao: "Ajustar layout da página de perfil em dispositivos móveis.",
        Status: "Em Progresso",
        Priority: "Alta",
        createdAt: new Date("2025-07-03T08:30:00Z"),
    },]

export const passValue = {
    ...mockValue,
    user,
    Ftasks,
    deleteTask: async function (idTask: string) {
        const errors: ErroType[] = [];
        if (user && Ftasks) {

            const newTasks = Ftasks.filter((task) => task.id !== idTask)
            const newTasksUser = user.myTasks.filter((taskID) => taskID !== idTask)
            Ftasks = newTasks
            user.myTasks = newTasksUser

            return null
        } else {
            errors.push({ erroId: Date.now(), message: user ? "Task não encontrada" : "Usuario não logado" })
            return errors
        }
    }

}