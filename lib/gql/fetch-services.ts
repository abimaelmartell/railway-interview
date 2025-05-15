import { gql } from "graphql-request";
import railwayApi from "./client";

const QUERY = gql`
  query {
    me {
      workspaces {
        name
        id
        team {
          projects {
            edges {
              cursor
              node {
                id
                name
                services {
                  edges {
                    node {
                      id
                      name
                      icon
                      repoTriggers {
                        edges {
                          node {
                            provider
                          }
                        }
                      }
                      deployments {
                        edges {
                          node {
                            id
                            status
                            createdAt
                            meta
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type RailwayServiceStatus =
  | "SUCCESS"
  | "FAILED"
  | "REMOVED"
  | "RUNNING"
  | string;

export type Deployment = {
  id: string;
  status: RailwayServiceStatus;
  createdAt: string;
};

export type DeploymentEdge = {
  node: Deployment;
};

export type Service = {
  id: string;
  name: string;
  icon: string | null;
  deployments: {
    edges: DeploymentEdge[];
  };
  repoTriggers: {
    edges: RepoTriggerEdge[];
  };
};

export type ServiceEdge = {
  node: Service;
};

export type Project = {
  id: string;
  name: string;
  services: {
    edges: ServiceEdge[];
  };
};

export type ProjectEdge = {
  cursor: string;
  node: Project;
};

export type Workspace = {
  id: string;
  name: string;
  team: {
    projects: {
      edges: ProjectEdge[];
    };
  };
};

export type RepoTrigger = {
  provider: string;
};

export type RepoTriggerEdge = {
  node: RepoTrigger;
};

export type RailwayProjectsWithServicesData = {
  me: {
    workspaces: Workspace[];
  };
};

export const fetchProjectsWithServices = async () => {
  const data = await railwayApi.request<RailwayProjectsWithServicesData>(QUERY);

  return data;
};
