import { GetServerSideProps } from 'next'

import { fetchProjectsWithServices } from '@/lib/gql/fetch-services'
import { ProjectsWithServicesData } from '@/lib/gql/types'

import WorkspaceList from '@/components/WorkspaceList'

type Props = {
  data: ProjectsWithServicesData
}

export default function Containers({ data }: Props) {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">🚀 Railway Containers</h1>
      </div>

      <WorkspaceList data={data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchProjectsWithServices()
  return { props: { data } }
}
