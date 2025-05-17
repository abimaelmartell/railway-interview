import { GetServerSideProps } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  fetchProjectsWithServices,
  RailwayProjectsWithServicesData,
} from '@/lib/gql/fetch-services'

import WorkspaceList from '@/components/WorkspaceList'
import LoadingIcon from '@/components/LoadingIcon'

type Props = {
  data: RailwayProjectsWithServicesData
}

const deployment_pending_statuses = ['BUILDING', 'DEPLOYING', 'INITIALIZING']

export default function Containers({ data }: Props) {
  const router = useRouter()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const deploymentPending = data.me.workspaces.some((w) =>
    w.team.projects.edges.some((p) =>
      p.node.services.edges.some((s) =>
        s.node.deployments.edges.some((d) => deployment_pending_statuses.includes(d.node.status)),
      ),
    ),
  )

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    router.replace(router.asPath).finally(() => setIsRefreshing(false))
  }, [router])

  useEffect(() => {
    if (deploymentPending) {
      setTimeout(() => {
        handleRefresh()
      }, 500)
    }
  }, [deploymentPending, handleRefresh])


  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">🚀 Railway Containers</h1>

        {isRefreshing && (
          <span className="text-sm text-gray-500 animate-pulse">
            <LoadingIcon />
          </span>
        )}
      </div>
      <WorkspaceList data={data} onChange={handleRefresh} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchProjectsWithServices()
  return { props: { data } }
}
