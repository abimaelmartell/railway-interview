import ProjectCard from './ProjectCard'
import { RailwayProjectsWithServicesData } from '@/lib/gql/fetch-services'

type Props = {
  data: RailwayProjectsWithServicesData
  onChange: () => void
}

export default function WorkspaceList({ data, onChange }: Props) {
  return (
    <>
      {data.me.workspaces.map((workspace) => (
        <div key={workspace.id} className="space-y-4">
          <h2 className="text-xl font-semibold">{workspace.name}</h2>

          {workspace.team.projects.edges.map(({ node }) => (
            <ProjectCard key={node.id} project={node} onChange={onChange} />
          ))}
        </div>
      ))}
    </>
  )
}
