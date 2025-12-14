import { INodeParams, INodeCredential } from '../src/Interface'

class AIBadgrApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'AI Badgr API'
        this.name = 'aiBadgrApi'
        this.version = 1.0
        this.description = 'AI Badgr API Key'
        this.inputs = [
            {
                label: 'AI Badgr API Key',
                name: 'aiBadgrApiKey',
                type: 'password',
                description: 'API Key from AI Badgr'
            }
        ]
    }
}

module.exports = { credClass: AIBadgrApi }
