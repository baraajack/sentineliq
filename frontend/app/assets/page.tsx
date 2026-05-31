import { fetchAssets } from "../../lib/api";

export default async function AssetsPage() {
  const assets = await fetchAssets();

  return (
    <div>
      <h1>Assets</h1>

      <table style={{ width: "100%", marginTop: "24px", background: "white" }}>
        <thead>
          <tr>
            <th align="left">Hostname</th>
            <th align="left">IP Address</th>
            <th align="left">Type</th>
            <th align="left">Criticality</th>
            <th align="left">Owner</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset: any) => (
            <tr key={asset.id}>
              <td>{asset.hostname}</td>
              <td>{asset.ip_address}</td>
              <td>{asset.asset_type}</td>
              <td>{asset.criticality}</td>
              <td>{asset.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}