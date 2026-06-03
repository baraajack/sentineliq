import { fetchAssets } from "../../lib/api";
import { Badge, EmptyState, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

export default async function AssetsPage() {
  const assets = await fetchAssets();

  return (
    <main className="page-stack">
      <PageHeader
        title="Asset Inventory"
        description="Track business-critical hosts, network identities, and ownership context used during alert triage."
        meta={[`${assets.length} assets`, "Coverage view"]}
      />

      <Panel
        title="Managed Assets"
        description="Infrastructure and endpoint records available to detection workflows."
      >
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Hostname</th>
                <th>IP Address</th>
                <th>Type</th>
                <th>Criticality</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {assets.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState>No assets found.</EmptyState>
                  </td>
                </tr>
              ) : (
                assets.map((asset: any) => (
                  <tr key={asset.id}>
                    <td className="cell-title">{asset.hostname}</td>
                    <td className="mono">{asset.ip_address}</td>
                    <td>{asset.asset_type}</td>
                    <td>
                      <Badge tone={normalizeBadgeTone(asset.criticality)}>
                        {asset.criticality}
                      </Badge>
                    </td>
                    <td>{asset.owner}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </main>
  );
}
