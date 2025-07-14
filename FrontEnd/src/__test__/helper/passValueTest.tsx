import mockValue from "@/__mocks__/mockValues";

export const passValue = {
    ...mockValue,
    user: {
        ID: 0,
        UserName: 'teste',
        Password: 'password',
        Email: 'email@email.com',
        Token: 'token',
        my_tasks: [1, 3, 5],
        created_at: new Date()
    },
    Ftasks: [{
        ID: 1,
        Nome: "Planejar reunião da equipe",
        Descricao: "Preparar agenda e slides para a reunião semanal.",
        Status: "Pendente",
        Priority: "Alta",
        created_at: new Date("2025-07-01T09:00:00Z"),
    }, {
        ID: 3,
        Nome: "Revisar código do módulo de relatórios",
        Descricao: "Verificar bugs e otimizações de performance.",
        Status: "Revisão",
        Priority: "Média",
        created_at: new Date("2025-07-02T11:00:00Z"),
    }, {
        ID: 5,
        Nome: "Corrigir bug de exibição no mobile",
        Descricao: "Ajustar layout da página de perfil em dispositivos móveis.",
        Status: "Em Progresso",
        Priority: "Alta",
        created_at: new Date("2025-07-03T08:30:00Z"),
    },]
}