
import { Plus, Check } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      inviteSent: 'Feb 3, 2025',
      member: 'shirley@stables.money',
      accepted: true,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Feb 3, 2025',
      member: 'karen@stables.money',
      accepted: true,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Feb 3, 2025',
      member: 'rosie@stables.money',
      accepted: true,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Feb 3, 2025',
      member: 'elsa@stables.money',
      accepted: true,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Nov 23, 2024',
      member: 'daniel@stables.money',
      accepted: true,
      apiKeyAccess: true,
      inviteAccess: true
    },
    {
      inviteSent: 'Sep 30, 2024',
      member: 'charlene@stables.money',
      accepted: true,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Sep 19, 2024',
      member: 'chris@stables.money',
      accepted: true,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Sep 19, 2024',
      member: 'mark@stables.money',
      accepted: true,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Sep 19, 2024',
      member: 'stefan@stables.money',
      accepted: true,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Sep 19, 2024',
      member: 'tony@stables.money',
      accepted: false,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Sep 19, 2024',
      member: 'james@stables.money',
      accepted: true,
      apiKeyAccess: false,
      inviteAccess: false
    },
    {
      inviteSent: 'Sep 18, 2024',
      member: 'bernardo@stables.money',
      accepted: true,
      apiKeyAccess: true,
      inviteAccess: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600 text-sm mt-1">Manage who has access to your Bridge tooling.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200">
          Invite member
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invite Sent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Accepted</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">API Key Access</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Invite Access</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teamMembers.map((member, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.inviteSent}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.member}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {member.accepted && (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {member.apiKeyAccess && (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {member.inviteAccess && (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Team;
