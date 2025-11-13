import { FastifyPluginAsync } from 'fastify'
import { prompt } from '../../modules/ai/ai.controller'

const PromptRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post('/', prompt)
}

export default PromptRoute
