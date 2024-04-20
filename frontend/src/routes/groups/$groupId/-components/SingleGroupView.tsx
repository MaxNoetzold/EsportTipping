import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, getRouteApi } from "@tanstack/react-router";
import {
  getGroupInfoApi,
  getGroupTipsApi,
} from "../../../../api/tippingGroupApi";
import Loading from "../../../../components/Loading";
import { useErrorSnackbar } from "../../../../components/ErrorSnackbar";
import Header from "./Header";
import TippingTable from "./TippingTable";
import TippingStats from "./TippingStats";

const route = getRouteApi("/groups/$groupId/");

function SingleGroupView() {
  const { groupId } = route.useParams();
  const showError = useErrorSnackbar();

  const [league, setLeague] = useState<string>();
  const [tournament, setTournament] = useState<string>();

  const {
    isPending: groupInfoIsPending,
    data: groupInfo,
    error: groupInfoError,
  } = useQuery({
    enabled: true,
    queryKey: ["group", groupId],
    queryFn: () => getGroupInfoApi(groupId),
  });

  const {
    isPending: groupTipsIsPending,
    data: groupTips,
    error: groupTipsError,
  } = useQuery({
    enabled: !!league,
    queryKey: ["grouptips", groupId, league, tournament],
    queryFn: () => getGroupTipsApi(groupId, { league, tournament }),
  });

  // Display errors of querys
  useEffect(() => {
    if (groupInfoError?.message) {
      showError(`SingleGroupView_groupInfoError: ${groupInfoError.message}`);
    }
    if (groupTipsError?.message) {
      showError(`SingleGroupView_groupTipsError: ${groupTipsError.message}`);
    }
  }, [groupInfoError, groupTipsError, showError]);

  if (groupInfoIsPending) {
    return <Loading />;
  }

  if (groupInfoError) {
    return <Navigate to="/groups" from="/groups/$groupId" />;
  }

  return (
    <div>
      <Header
        group={groupInfo}
        league={league}
        setLeague={setLeague}
        tournament={tournament}
        setTournament={setTournament}
      />
      {groupTipsIsPending && <Loading />}
      {groupTips && (
        <>
          <TippingStats
            group={groupInfo}
            tips={groupTips}
            league={league}
            tournament={tournament}
          />
          <TippingTable
            group={groupInfo}
            tips={groupTips}
            league={league}
            tournament={tournament}
          />
        </>
      )}
    </div>
  );
}

export default SingleGroupView;
