import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getGroupsApi } from "../../api/tippingGroupApi";

function TippingGroups() {
  const [showGroups, setShowGroups] = useState(false);

  const { data: groups = [] } = useQuery({
    queryKey: ["group", "all"],
    queryFn: () => getGroupsApi(),
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowGroups(!showGroups);
  };

  return (
    <div className="relative">
      <div className="flex items-center p-4 w-full text-left hover:bg-gray-700">
        <button onClick={handleClick} className="mr-2">
          {showGroups ? "<" : ">"}
        </button>
        <Link to="/groups">Tipping Groups</Link>
      </div>
      {showGroups && (
        <div className="absolute left-0 w-full bg-gray-700">
          {groups.map((group) => (
            <Link
              key={group._id}
              to="/groups/$groupId"
              params={{
                groupId: group._id,
              }}
              className="block p-4 hover:bg-gray-600"
            >
              {group.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TippingGroups;
