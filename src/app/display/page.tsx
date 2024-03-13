import retrieveDataFromDatabase from "@/utils/retrieve-data-from-database";
import retrieveBucketInfo from "@/utils/retrieve-bucket-info";

export default async function Display() {
  const creators = await retrieveDataFromDatabase();
  const features = await retrieveBucketInfo();
  return (
    <>
      <div>
        <div className="text-3xl text-green-500 p-4">GHULAM-BSCS21028</div>
        <div className="w-screen text-5xl font-bold flex my-4 justify-center">
          Creators
        </div>
        <div className="flex gap-4 w-full justify-center mt-12">
          {creators?.map((creator) => (
            <div className="border flex flex-col p-8 gap-4">
              <span>name : {creator.name}</span>
              <span> profession : {creator.profession}</span>
              <span> contact info : {creator.contactInfo}</span>
            </div>
          ))}
        </div>
        <div className="w-screen text-5xl font-bold flex  justify-center my-10">
          features
        </div>
        <div className="flex justify-center flex-col gap-8 mx-8">
          {features?.map((feature) => (
            <pre className="border  flex flex-col text-2xl">
              {JSON.stringify(feature)}
            </pre>
          ))}
        </div>
      </div>
    </>
  );
}
