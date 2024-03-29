import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, getRouteApi } from "@tanstack/react-router";
import { getGroupApi } from "../../../../api/tippingGroupApi";
import Loading from "../../../../components/Loading";
import { useErrorSnackbar } from "../../../../components/ErrorSnackbar";
import Header from "./Header";
import TippingTable from "./TippingTable";

const route = getRouteApi("/groups/$groupId/");

function SingleGroupView() {
  const { groupId } = route.useParams();
  const showError = useErrorSnackbar();

  const {
    isPending,
    data: group,
    error: groupError,
  } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroupApi(groupId),
  });

  // Display errors of querys
  useEffect(() => {
    if (groupError?.message) {
      showError(groupError.message);
    }
  }, [groupError, showError]);

  if (isPending) {
    return <Loading />;
  }

  if (groupError) {
    return <Navigate to="/groups" from="/groups/$groupId" />;
  }

  return (
    <div>
      <Header group={group} />
      <TippingTable group={group} />
    </div>
  );
}

export default SingleGroupView;
