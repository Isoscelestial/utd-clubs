import Header from '@src/components/header/BaseHeader';
import { getServerAuthSession } from '@src/server/auth';
import { api } from '@src/trpc/server';
import { signInRoute } from '@src/utils/redirect';
import { redirect, notFound } from 'next/navigation';
import CreateEventForm from './CreateEventForm';

const Page = async ({ params }: { params: { clubId: string } }) => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect(signInRoute(`manage/${params.clubId}/create`));
  }

  const collaboratorClubs = await api.club.getCollaboratorClubs();
  const currentClub = collaboratorClubs.filter((val) => {
    return val.id == params.clubId;
  })[0];
  if (!currentClub) {
    notFound();
  }

  return (
    <main className="h-screen ">
      <Header />
      <div className="flex flex-row justify-between gap-20 px-5">
        <CreateEventForm clubId={currentClub.id} collaboratorClubs={collaboratorClubs} />
      </div>
    </main>
  );
};
export default Page;
