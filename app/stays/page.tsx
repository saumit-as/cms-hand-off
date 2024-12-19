import { Stay } from "@/types";
import { getData } from "../actions";
import { ItemCard } from "@/components/ItemCard";
import NoResultFound from "@/components/NoResultFound";
import SubHeading from "@/components/SubHeading";
import PageHeader from "@/components/PageHeader";

const StaysPage = async () => {
  const vendorsData: any = await getData("Stays");
  return (
    <div>
      <div className="lg:mx-32">
        {/* <PageBanner title={"Stays"} imageUrl={"/assets/BPTV/boatHouse.jpg"} /> */}
        <PageHeader service="stays" />
      </div>
      <div className="lg:my-20 my-10 lg:px-0 px-4">
        <SubHeading page="stays" />
      </div>
      <div className="container mx-auto">
        {Object.entries(vendorsData).length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-5">
            {vendorsData.map((vendor: Stay) => (
              <ItemCard key={vendor.vendorId} item={vendor} type="stay" />
            ))}
          </div>
        ) : (
          <NoResultFound />
        )}
      </div>
    </div>
  );
};

export default StaysPage;
