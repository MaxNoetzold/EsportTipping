import { TippingGroup } from "../../../../types/TippingGroup";

function GroupTitle({ group }: { group: TippingGroup }) {
  return <h1 className="text-2xl font-bold mb-4">{group.name}</h1>;
}

export default GroupTitle;
