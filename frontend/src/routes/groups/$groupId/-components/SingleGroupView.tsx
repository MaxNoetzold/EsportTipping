import { getRouteApi } from "@tanstack/react-router";

const route = getRouteApi("/groups/$groupId/");

function SingleGroupView() {
  const { groupId } = route.useParams();
  return (
    <div>
      <h1>Single Group View for {groupId}</h1>
    </div>
  );
}

export default SingleGroupView;
