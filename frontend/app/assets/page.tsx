import { fetchAssets } from "../../lib/api";
import { Badge, EmptyState, InfoCard, normalizeBadgeTone, PageHeader, Panel } from "../../components/ui";

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
                    <EmptyState>
                      <div>
                        <strong>No assets available yet.</strong>
                        <p>Add inventory records to give alerts host, ownership, and criticality context.</p>
                      </div>
                    </EmptyState>
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

      <div className="overview-grid">
        <InfoCard
          description="Asset criticality helps prioritize alert triage and incident response."
          label="Context"
          title="Business impact"
        />
        <InfoCard
          description="Owner and host data make investigation handoffs clearer for analysts."
          label="SOC"
          title="Ownership mapping"
        />
        <InfoCard
          description="Security events and alerts become more useful when they map to known infrastructure."
          label="Data"
          title="Detection enrichment"
        />
      </div>
    </main>
  );
}
