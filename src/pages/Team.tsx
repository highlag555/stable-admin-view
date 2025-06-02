import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Team = () => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { toast } = useToast();

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

  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTeamMembers = teamMembers.slice(startIndex, endIndex);

  const handleInvite = () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Check if email already exists
    const emailExists = teamMembers.some(member => member.member === email);
    if (emailExists) {
      toast({
        title: "Error",
        description: "This email address has already been invited",
        variant: "destructive"
      });
      return;
    }

    console.log('Inviting member:', email);
    
    toast({
      title: "Invitation sent",
      description: `Invitation has been sent to ${email}`,
    });

    setEmail('');
    setIsInviteOpen(false);
  };

  const handleCancel = () => {
    setEmail('');
    setIsInviteOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="text-gray-600 text-sm mt-1">Manage who has access to your Bridge tooling.</p>
        </div>
        
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-md transition-colors duration-200" style={{ backgroundColor: '#4941EC' }}>
              Invite member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Invite member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="xxxxxx@xxxx.xxx"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleInvite}
                className="px-6 text-white"
                style={{ backgroundColor: '#4941EC' }}
              >
                Invite
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
            {currentTeamMembers.map((member, index) => (
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

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Team;
