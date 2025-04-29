import Header from '@src/components/header/BaseHeader';
import { BlueBackButton } from '@src/components/backButton';
import EditCollaboratorForm from './EditCollaboratorForm';
import { api } from '@src/trpc/server';
import { getServerAuthSession } from '@src/server/auth';
import { redirect } from 'next/navigation';
import { signInRoute } from '@src/utils/redirect';
import EditListedOfficerForm from './EditListedOfficerForm';

export default async function Page({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const session = await getServerAuthSession();
  if (!session) redirect(signInRoute(`manage/${clubId}/edit/officers`));
  const role = await api.club.memberType({ id: clubId });
  const collaborators = await api.club.getOfficers({ id: clubId });
  const listedOfficers = await api.club.getListedOfficers({ id: clubId });

  const mapped = collaborators.map((collaborator) => ({
    userId: collaborator.userId,
    name: collaborator.userMetadata.firstName + ' ' + collaborator.userMetadata.lastName,
    locked: collaborator.memberType == 'President' || role == 'Officer',
    position: collaborator.memberType as 'President' | 'Officer',
  }));

  return (
    <main className="h-full ">
      <Header />
      <div className="flex flex-col gap-y-2 px-5">
        <BlueBackButton />
        <h1 className="text-2xl font-extrabold text-blue-primary">
          Edit club collaborators
        </h1>
        <EditCollaboratorForm clubId={clubId} collaborators={mapped} />
        <h1 className="text-2xl font-extrabold text-blue-primary">
          Edit club officers
        </h1>
        <EditListedOfficerForm clubId={clubId} officers={listedOfficers} />
      </div>
    </main>
  );
}
