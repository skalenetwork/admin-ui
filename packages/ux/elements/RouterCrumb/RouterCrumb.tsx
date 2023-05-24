import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export default function RouterCrumb() {
  const breadcrumbs = useBreadcrumbs();
  let crumbs = breadcrumbs.slice(1);
  return (
    <>
      {crumbs.length > 1 ? (
        crumbs.map(({ match, breadcrumb }, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <span key={index} className="text-[var(--gray8)]">
                <ChevronRightIcon className="h-5" />
              </span>
            )}
            <NavLink
              key={index + match.pathname}
              className="text-xs text-[var(--gray10)] px-2 uppercase"
              to={match.pathname}
            >
              {breadcrumb}
            </NavLink>
          </Fragment>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
