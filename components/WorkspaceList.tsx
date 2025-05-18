import ProjectCard from './ProjectCard'
import { ProjectsWithServicesData } from '@/lib/gql/types'

type Props = {
  data: ProjectsWithServicesData
}

export default function WorkspaceList({ data }: Props) {
  return (
    <>
      {data.me.workspaces.map((workspace) => (
        <div key={workspace.id} className="space-y-4">
          <h2 className="text-xl font-semibold">{workspace.name}</h2>

          {workspace.team.projects.edges.map(({ node }) => (
            <ProjectCard key={node.id} project={node} />
          ))}
        </div>
      ))}
    </>
  )
}
