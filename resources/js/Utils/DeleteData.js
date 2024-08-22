import { router } from '@inertiajs/react';

export default function onDeleteData({ route, data, canDelete=true}) {
  if(!canDelete) {
    alert(`This ${data} cannot be deleted!`)
    return;
  }

  if (confirm(`Are you sure want to delete this ${data}?`)) {
    router.delete(route);
  }
}