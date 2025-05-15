import { GetServerSideProps } from 'next'
import {
  fetchProjectsWithServices,
  RailwayProjectsWithServicesData,
} from '@/lib/gql/fetch-services'
import WorkspaceList from '@/components/WorkspaceList'

type Props = {
  data: RailwayProjectsWithServicesData
}

export default function Containers({ data }: Props) {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-8">🚀 Railway Containers</h1>
      <WorkspaceList data={data} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchProjectsWithServices()
  return { props: { data } }
}
