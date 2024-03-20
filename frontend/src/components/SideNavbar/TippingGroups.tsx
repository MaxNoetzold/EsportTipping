import { useState } from "react";
import { Link } from "@tanstack/react-router";

const groups = [
  { name: "Group 1", id: "group1" },
  { name: "Group 2", id: "group2" },
  { name: "Group 3", id: "group3" },
];

function TippingGroups() {
  const [showGroups, setShowGroups] = useState(false);

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
              key={group.id}
              to="/groups/$groupId"
              params={{
                groupId: group.id,
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
