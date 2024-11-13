import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';
import { CommandGroup, CommandItem } from '@/components/ui/command';

export function SearchBarPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [matchingCollections, setMatchingCollections] = useState<string[]>([]);
  const [matchingApps, setMatchingApps] = useState<Array<{ name: string, path: string, icon: JSX.Element }>>([
    {
      name: 'Marketplace Aggregator',
      path: '/collections',
      icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="26px" fill="#ffffff">
        <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/>
      </svg>
    },
    {
      name: 'Portfolio Tracker',
      path: '/portfolio',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256">
        <path d="M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62ZM128,24a8,8,0,0,0-8,8v91.82L41.19,169.73a8,8,0,0,0-2.87,11A104,104,0,1,0,128,24Zm0,192a88.47,88.47,0,0,1-71.49-36.68l75.52-44a8,8,0,0,0,4-6.92V40.36A88,88,0,0,1,128,216Z"/>
      </svg>
    }
  ]);

  useEffect(() => {
    if (debouncedSearch.length === 0) {
      setMatchingCollections([]);
      return;
    }

    const matches = Object.keys(collections).filter(tokenId =>
      tokenId.includes(debouncedSearch) ||
      collections[tokenId].name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setMatchingCollections(matches);

    const filteredApps = matchingApps.filter(app =>
      app.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setMatchingApps(filteredApps);
  }, [debouncedSearch]);

  return (
    <div>
      {matchingApps.length > 0 && (
        <CommandGroup heading="Apps">
          {matchingApps.map(app => (
            <CommandItem key={app.path} asChild onSelect={() => { setOpen(false) }}>
              <Link href={app.path} className="w-full">
                <span className="">{app.icon}</span>
                <span className="text-white">{app.name}</span>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      )}
    </div>
  );
} 