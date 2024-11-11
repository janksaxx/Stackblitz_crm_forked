import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { useContactStore } from '../../contacts/stores/contactStore';
import { useCompanyStore } from '../../companies/stores/companyStore';

interface SearchResult {
  id: string;
  name: string;
  type: 'contact' | 'company';
  email?: string;
  company?: string;
}

interface ContactCompanySearchProps {
  type: 'contact' | 'company';
  onSelect: (item: SearchResult) => void;
  onCreateNew: (name: string) => void;
  placeholder: string;
}

export function ContactCompanySearch({ type, onSelect, onCreateNew, placeholder }: ContactCompanySearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const contacts = useContactStore(state => state.contacts);
  const companies = useCompanyStore(state => state.companies);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    let searchResults: SearchResult[] = [];

    if (type === 'contact') {
      searchResults = contacts
        .filter(contact => 
          contact.name.toLowerCase().includes(searchQuery) ||
          contact.email.toLowerCase().includes(searchQuery)
        )
        .map(contact => ({
          id: contact.id,
          name: contact.name,
          type: 'contact' as const,
          email: contact.email,
          company: contact.company
        }));
    } else {
      searchResults = companies
        .filter(company => 
          company.name.toLowerCase().includes(searchQuery)
        )
        .map(company => ({
          id: company.id,
          name: company.name,
          type: 'company' as const
        }));
    }

    setResults(searchResults);
    setShowDropdown(true);
  }, [query, type, contacts, companies]);

  const handleSelect = (result: SearchResult) => {
    onSelect(result);
    setQuery(result.name);
    setShowDropdown(false);
  };

  const handleCreateNew = () => {
    onCreateNew(query);
    setQuery('');
    setShowDropdown(false);
    setIsCreatingNew(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-10"
          placeholder={placeholder}
          onFocus={() => setShowDropdown(true)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {showDropdown && (query.length >= 2 || results.length > 0) && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
            {results.map((result) => (
              <li
                key={result.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleSelect(result)}
              >
                <div className="flex items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{result.name}</p>
                    {result.email && (
                      <p className="text-sm text-gray-500">{result.email}</p>
                    )}
                    {result.company && (
                      <p className="text-sm text-gray-500">{result.company}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
            
            {query.length >= 2 && results.length === 0 && (
              <li
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={handleCreateNew}
              >
                <div className="flex items-center text-indigo-600">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Create new {type}: {query}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}