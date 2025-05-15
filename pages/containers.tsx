import { GetServerSideProps } from "next";
import Image from "next/image";
import { fetchProjectsWithServices, RailwayProjectsWithServicesData, RailwayServiceStatus } from "@/lib/gql/fetch-services";

type Props = {
  data: RailwayProjectsWithServicesData
}

const mapStatus = (status: RailwayServiceStatus) => {
  switch (status) {
    case "SUCCESS":
      return "🟢  Running"
  }
}

export default function Containers({ data }: Props) {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto bg-[var(--background)] text-[var(--foreground)]">
      <h1 className="text-3xl font-bold mb-8">🚀 Railway Containers</h1>

      {data.me.workspaces.map((workspace) => (
        <div key={workspace.id} className="space-y-4">
          <h2 className="text-xl font-semibold">{workspace.name}</h2>

          {workspace.team.projects.edges.map((project) => (
            <div
              key={project.node.id}
              className="bg-white border border-gray-200 shadow rounded-lg p-4 space-y-3"
            >
              <h3 className="text-lg font-semibold">📁 {project.node.name}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.node.services.edges.map((service) => (
                  <div
                    key={service.node.id}
                    className="border border-gray-200 rounded p-4 bg-gray-50 space-y-3 shadow"
                  >
                    <div className="flex items-center gap-2 justify-between">
                      <h4 className="text-md font-medium">{service.node.name}</h4>

                      <Image
                        src={service.node.icon ?? "https://devicons.railway.com/i/github-dark.svg"}
                        alt={service.node.name}
                        width={80}
                        height={80}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {service.node.deployments.edges.map((deployment) => {
                        const isRunning = deployment.node.status === "SUCCESS";

                        return (
                          <div
                            key={deployment.node.id}
                            className="flex items-center justify-between px-3 py-2 bg-green-50 border border-green-200 rounded"
                          >
                            <span className="text-sm font-medium text-green-800">
                              {mapStatus(deployment.node.status)}
                            </span>

                            <button
                              className={`text-xs font-medium px-3 py-1 rounded transition ${isRunning
                                ? "bg-red-100 text-red-800 hover:bg-red-200"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                }`}
                              onClick={() =>
                                confirm(
                                  `Are you sure you want to ${isRunning ? "spin down" : "spin up"} service ${service.node.name}?`
                                )
                              }
                            >
                              {isRunning ? "Spin Down" : "Spin Up"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchProjectsWithServices()

  return {
    props: {
      data
    },
  }
}
