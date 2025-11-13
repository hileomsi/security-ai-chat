import { InvestigationItem } from './investigation-item'

interface RecentInvestigationsProps {
  investigations?: string[]
  onInvestigationClick?: (title: string) => void
}

const defaultInvestigations = [
  'API Credential Stuffing',
  'S3 Bucket Misconfiguration',
  'Suspicious IAM Activity',
  'DDoS Attack Analysis',
  'Data Exfiltration Alert',
]

export function RecentInvestigations({ 
  investigations = defaultInvestigations,
  onInvestigationClick 
}: RecentInvestigationsProps) {
  return (
    <div className="px-4 mb-4">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-3">
        Recent Investigations
      </h2>
      <div className="space-y-1">
        {investigations.map((title) => (
          <InvestigationItem
            key={title}
            title={title}
            onClick={() => onInvestigationClick?.(title)}
          />
        ))}
      </div>
    </div>
  )
}

