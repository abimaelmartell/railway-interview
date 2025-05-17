
export type RailwayServiceStatus = 'SUCCESS' | 'FAILED' | 'REMOVED' | 'RUNNING' | string

type Nodes<T> = {
  edges: {
    node: T
  }[]
}


export type Environment = {
  id: string
  name: string
}


export type Deployment = {
  id: string
  status: RailwayServiceStatus
  createdAt: string
}

export type Service = {
  id: string
  name: string
  icon: string | null
  deployments: Nodes<Deployment>
}


export type Project = {
  id: string
  name: string
  services: Nodes<Service>
  environments: Nodes<Environment>
}

export type Workspace = {
  id: string
  name: string
  team: {
    projects: Nodes<Project>
  }
}

export type ProjectsWithServicesData = {
  me: {
    workspaces: Workspace[]
  }
}
