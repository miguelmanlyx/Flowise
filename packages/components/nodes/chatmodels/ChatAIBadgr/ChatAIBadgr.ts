import { ChatOpenAI, ChatOpenAIFields } from '@langchain/openai'
import { BaseCache } from '@langchain/core/caches'
import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'

class ChatAIBadgr_ChatModels implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'AI Badgr (Budget/Utility, OpenAI-compatible)'
        this.name = 'chatAIBadgr'
        this.version = 1.0
        this.type = 'ChatAIBadgr'
        this.icon = 'openai.svg'
        this.category = 'Chat Models'
        this.description = 'AI Badgr - Budget/Utility provider with OpenAI-compatible API'
        this.baseClasses = [this.type, 'BaseChatModel', ...getBaseClasses(ChatOpenAI)]
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['aiBadgrApi'],
            optional: true
        }
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Base URL',
                name: 'baseURL',
                type: 'string',
                default: 'https://aibadgr.com/api/v1',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'string',
                placeholder: 'premium',
                description: 'Tier-based models: basic, normal, premium. Also supports power-user names: phi-3-mini (basic), mistral-7b (normal), llama3-8b-instruct (premium). OpenAI model names are accepted and mapped automatically.'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.9,
                optional: true
            },
            {
                label: 'Streaming',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Tokens',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Top Probability',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Frequency Penalty',
                name: 'frequencyPenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Presence Penalty',
                name: 'presencePenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Timeout',
                name: 'timeout',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const topP = nodeData.inputs?.topP as string
        const frequencyPenalty = nodeData.inputs?.frequencyPenalty as string
        const presencePenalty = nodeData.inputs?.presencePenalty as string
        const timeout = nodeData.inputs?.timeout as string
        const streaming = nodeData.inputs?.streaming as boolean
        const baseURL = nodeData.inputs?.baseURL as string
        const cache = nodeData.inputs?.cache as BaseCache

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const aiBadgrApiKey = getCredentialParam('aiBadgrApiKey', credentialData, nodeData)

        const obj: ChatOpenAIFields = {
            temperature: parseFloat(temperature),
            modelName,
            openAIApiKey: aiBadgrApiKey || 'sk-',
            apiKey: aiBadgrApiKey || 'sk-',
            streaming: streaming ?? true
        }

        if (maxTokens) obj.maxTokens = parseInt(maxTokens, 10)
        if (topP) obj.topP = parseFloat(topP)
        if (frequencyPenalty) obj.frequencyPenalty = parseFloat(frequencyPenalty)
        if (presencePenalty) obj.presencePenalty = parseFloat(presencePenalty)
        if (timeout) obj.timeout = parseInt(timeout, 10)
        if (cache) obj.cache = cache
        if (baseURL) obj.configuration = { baseURL: baseURL }

        const model = new ChatOpenAI(obj)

        return model
    }
}

module.exports = { nodeClass: ChatAIBadgr_ChatModels }
