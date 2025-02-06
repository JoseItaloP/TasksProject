import {z} from 'zod'

const environmentSchema = z.object({
    API_URL: z.string(),
})

const {API_URL} = process.env;

const parsedResults = environmentSchema.safeParse({
    API_URL
})

export const environmentVariables = parsedResults.data