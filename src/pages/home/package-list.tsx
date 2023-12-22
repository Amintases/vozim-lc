import { Helmet } from 'react-helmet-async';

import { PackageListView } from 'src/sections/package/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Посылки и грузы</title>
      </Helmet>

      <PackageListView />
    </>
  );
}
