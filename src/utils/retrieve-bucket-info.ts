import mongoose from "mongoose";

const retrieveBucketInfo = async () => {
  let metadataArray = []; // Array to store metadata of objects in the bucket
  try {
    // Connect to the MongoDB database
    await mongoose.connect(
      "mongodb+srv://ghulam:1234@cluster0.mjy4o3f.mongodb.net/CreateFeatureDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");

    // Access the GridFS collection
    const db = mongoose.connection.db;
    const { GridFSBucket } = mongoose.mongo;
    const bucket = new GridFSBucket(db, { bucketName: "features" });

    // Retrieve information from the bucket
    const cursor = bucket.find({});
    for await (const file of cursor) {
      metadataArray.push(file.metadata); // Collect metadata of each file
    }

    // Close the connection
    await mongoose.connection.close();
    console.log(metadataArray);

    return metadataArray; // Return the array of metadata objects
  } catch (error) {
    console.error("Error retrieving data:", error);
    return metadataArray; // Return an empty array in case of error
  }
};

export default retrieveBucketInfo;
