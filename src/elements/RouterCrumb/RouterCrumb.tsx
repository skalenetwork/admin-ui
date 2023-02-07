import { ChevronRightIcon } from '@radix-ui/react-icons';
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export default function RouterCrumb() {
  const breadcrumbs = useBreadcrumbs();
  let crumbs = breadcrumbs.slice(1);
  return (
    <>
      {crumbs.length > 1 ? (
        crumbs.map(({ match, breadcrumb }, index) => (
          <>
            {index > 0 && (
              <span className="text-[var(--gray8)]">
                <ChevronRightIcon className="h-5" />
              </span>
            )}
            <NavLink
              className="text-xs text-[var(--gray10)] px-2 uppercase"
              key={match.pathname}
              to={match.pathname}
            >
              {breadcrumb}
            </NavLink>
          </>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
