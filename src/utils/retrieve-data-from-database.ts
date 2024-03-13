"use server";
import mongoose from "mongoose";

const retrieveDataFromDatabase = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(
      "mongodb+srv://ghulam:1234@cluster0.mjy4o3f.mongodb.net/CreateFeatureDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");

    // Retrieve the Creator model
    const Creator = mongoose.model("creators");

    // Find all creators in the database
    const creators = await Creator.find();

    // Log the retrieved creators
    console.log("Retrieved creators from database:");
    console.log(creators);
    return creators;

    // Close the connection
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
};

export default retrieveDataFromDatabase;
