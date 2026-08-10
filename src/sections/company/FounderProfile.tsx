import { COFOUNDERS, FOUNDER_PROFILE } from '../../content/siteContent';
import type { CoFounder, FounderProfile } from '../../types/site';

interface FounderProfileProps {
  profile?: FounderProfile;
  cofounders?: readonly CoFounder[];
}

export default function FounderProfileSection({
  profile = FOUNDER_PROFILE,
  cofounders = COFOUNDERS,
}: FounderProfileProps) {
  return (
    <div className="founder-profile" id={profile.id} aria-labelledby="founder-profile-name">
      <div className="founder-profile__identity">
        <span className="founder-profile__monogram" aria-hidden="true">{profile.initials}</span>
        <p>The engineer behind the systems</p>
        <h3 id="founder-profile-name">{profile.name}</h3>
        <strong>{profile.role}</strong>
        <nav className="founder-profile__links" aria-label="Noah Lee profiles">
          {profile.links.map((link) => (
            <a
              aria-label={`${profile.name} on ${link.label}`}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              key={link.label}
            >
              {link.label}<span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="founder-profile__story">
        <p className="founder-profile__lead">{profile.lead}</p>
        <p>{profile.biography}</p>
        <ul aria-label="Noah Lee credentials">
          {profile.credentials.map((credential) => <li key={credential}>{credential}</li>)}
        </ul>
      </div>

      <aside className="cofounder-credit" aria-label="Omega AI LLC co-founders">
        <p>Co-founders</p>
        <ul>
          {cofounders.map((founder) => (
            <li key={founder.name}>
              <span aria-hidden="true">{founder.initials}</span>
              <div><strong>{founder.name}</strong><small>{founder.role}</small></div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
