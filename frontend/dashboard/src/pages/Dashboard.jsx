import { useLocation, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MapView from '../components/MapView';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const data = location.state?.data;

  // Redirect to home if no data
  if (!data) {
    return <Navigate to="/" replace />;
  }

  const {
    entities = {},
    risk_analysis = {},
    risk_index = 0,
    geo = [],
    clusters = [],
    city_summary = {},
    story = {}
  } = data;

  const { dashboard = {}, narrative = {} } = story;
  const narrativeSections = narrative.sections || {};

  // Get risk level color
  const getRiskColor = (score) => {
    if (score >= 70) return '#ef4444'; // Red
    if (score >= 40) return '#f59e0b'; // Orange
    return '#10b981'; // Green
  };

  const getRiskLevel = (score) => {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="dashboard-page">
      <Header showBackButton={true} />

      <main className="dashboard-content">
        <div className="dashboard-header">
          <h2>{dashboard.title || 'Geospatial Risk Intelligence Report'}</h2>
          <div className="risk-badge" style={{ backgroundColor: getRiskColor(risk_index) }}>
            {getRiskLevel(risk_index)} Risk - Score: {risk_index.toFixed(1)}
          </div>
        </div>

        {/* Event Summary Section */}
        {narrativeSections['Event Summary'] && (
          <section className="dashboard-card">
            <h3>📋 Event Summary</h3>
            <p className="section-content">{narrativeSections['Event Summary']}</p>
          </section>
        )}

        {/* Map Section */}
        <section className="dashboard-card">
          <h3>🗺️ Geographic Visualization</h3>
          <MapView geoPoints={geo} clusters={clusters} summary={city_summary} />
          <div className="location-tags">
            {entities.locations?.map((loc, idx) => (
              <span key={idx} className="location-tag">{loc}</span>
            ))}
          </div>
        </section>

        {/* Risk Interpretation */}
        {dashboard.risk_interpretation && (
          <section className="dashboard-card risk-card">
            <h3>⚠️ Risk Interpretation</h3>
            <div className="risk-details">
              <div className="risk-severity">
                <span className="label">Severity Level:</span>
                <span 
                  className="value severity-badge"
                  style={{ backgroundColor: getRiskColor(risk_index) }}
                >
                  {dashboard.risk_interpretation.severity_level}
                </span>
              </div>
              <p className="risk-explanation">{dashboard.risk_interpretation.explanation}</p>
              
              {dashboard.risk_interpretation.factors && (
                <div className="risk-factors">
                  <strong>Contributing Factors:</strong>
                  <div className="factors-list">
                    {dashboard.risk_interpretation.factors.map((factor, idx) => (
                      <span key={idx} className="factor-tag">{factor}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Spatial Insights */}
        {narrativeSections['Spatial Pattern Insight'] && (
          <section className="dashboard-card">
            <h3>📊 Spatial Pattern Insights</h3>
            <p className="section-content">{narrativeSections['Spatial Pattern Insight']}</p>
          </section>
        )}

        {dashboard.spatial_insights && dashboard.spatial_insights.length > 0 && (
          <section className="dashboard-card">
            <h3>🔍 Key Spatial Insights</h3>
            <ul className="insights-list">
              {dashboard.spatial_insights.map((insight, idx) => (
                <li key={idx}>{insight}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Predicted Impact Zones */}
        {dashboard.predicted_impact_zones && dashboard.predicted_impact_zones.length > 0 && (
          <section className="dashboard-card impact-zones-card">
            <h3>🎯 Predicted Impact Zones</h3>
            <div className="impact-zones">
              {dashboard.predicted_impact_zones.map((zone, idx) => (
                <div key={idx} className="impact-zone">
                  <h4>{zone.name}</h4>
                  <p>{zone.reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Actions */}
        {dashboard.recommended_actions && dashboard.recommended_actions.length > 0 && (
          <section className="dashboard-card actions-card">
            <h3>✅ Recommended Actions</h3>
            <div className="actions-list">
              {dashboard.recommended_actions.map((action, idx) => (
                <div key={idx} className="action-item">
                  <span className="action-number">{idx + 1}</span>
                  <span className="action-text">{action}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Analysis Data */}
        <section className="dashboard-card data-card">
          <h3>📈 Analysis Metadata</h3>
          <div className="metadata-grid">
            <div className="metadata-item">
              <span className="meta-label">Locations Detected:</span>
              <span className="meta-value">{entities.locations?.length || 0}</span>
            </div>
            <div className="metadata-item">
              <span className="meta-label">Risks Identified:</span>
              <span className="meta-value">{risk_analysis.risks?.length || 0}</span>
            </div>
            <div className="metadata-item">
              <span className="meta-label">Confidence Level:</span>
              <span className="meta-value">{((risk_analysis.confidence || 0) * 100).toFixed(0)}%</span>
            </div>
            <div className="metadata-item">
              <span className="meta-label">Clusters Found:</span>
              <span className="meta-value">{clusters.length || 0}</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
