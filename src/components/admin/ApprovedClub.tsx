import { type SelectClub } from '@src/server/db/models';
import AddCollaborator from './AddCollaborator';
import CollaboratorTable from './CollaboratorTable';
import ClubDescription from './ClubDescription';
import { api } from '@src/trpc/server';
import ChangeClubStatus from './ChangeClubStatus';

type Props = { club: SelectClub };
export default async function AcceptedClub({ club: club }: Props) {
  const collaborators = await api.club.getOfficers({ id: club.id });

  return (
    <>
      <h2 className="text-center text-2xl font-bold">Collaborators</h2>
      <div className="flex items-center justify-between">
        <AddCollaborator clubId={club.id} />
        <ClubDescription club={club} />
      </div>
      <CollaboratorTable collaborators={collaborators} />
      <ChangeClubStatus status={club.approved} clubId={club.id} />
    </>
  );
}
