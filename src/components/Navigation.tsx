
import { Link, useLocation } from 'react-router-dom';
import { Users, CreditCard, Key, UserCheck, FileText, LogOut } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Customers', path: '/', icon: Users },
    { name: 'Payments', path: '/payments', icon: CreditCard },
    { name: 'API Keys', path: '/api-keys', icon: Key },
    { name: 'Team', path: '/team', icon: UserCheck },
    { name: 'Docs', path: '/docs', icon: FileText },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/lovable-uploads/023222f2-e87c-49a5-b8da-accfac2cb68e.png" 
                alt="Stables" 
                className="h-8 w-auto"
              />
            </div>
            <div className="ml-10 flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
