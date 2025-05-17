import ServiceCard from './ServiceCard'
import { Project } from '@/lib/gql/fetch-services'

type Props = {
  project: Project

  onChange: () => void
}

export default function ProjectCard({ project, onChange }: Props) {
  return (
    <div className="bg-white border border-gray-200 shadow rounded-lg p-4 space-y-3">
      <h3 className="text-lg font-semibold">📁 {project.name}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project.services.edges.map(({ node }) => (
          <ServiceCard
            key={node.id}
            service={node}
            environment={project.environments.edges[0].node}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}
